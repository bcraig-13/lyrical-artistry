const { Router } = require("express");
const db = require("../models");
const isAuthenticated = require("../config/isAuthenticated");
const auth = require("../config/auth");
const apiRouter = new Router();

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const multer = require("multer");
const fs = require("fs").promises;

// LOGIN ROUTE
apiRouter.post("/api/login", (req, res) => {
  auth
    .logUserIn(req.body.username, req.body.password)
    .then((dbUser) => res.json(dbUser))
    .catch((err) => res.status(400).json(err));
});

// SIGNUP ROUTE
apiRouter.post("/api/signup", (req, res) => {
  db.User.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});


// Any route with isAuthenticated is protected and you need a valid token
// to access
apiRouter.get("/api/user", isAuthenticated, (req, res) => {
  db.User.findById(req.user.id)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({ success: false, message: "No user found" });
      }
    })
    .catch((err) => res.status(400).send(err));
});

apiRouter.post("/api/user/quotes", isAuthenticated, (req, res) => {
  db.Quote.create(req.body)
    .then(({ _id }) => db.User.findOneAndUpdate({ _id: req.user.id }, { $push: { quotes: _id } }, { new: true }))
    .then(dbUser => {
      res.json(dbUser);
    })
});

apiRouter.delete("/api/user/quotes/:quoteID", isAuthenticated, (req, res) => {
  db.Quote.findById({ _id: req.params.quoteID }).then(dbModel => dbModel.remove()).catch(err => {
    res.json(err);
  })
})

apiRouter.get("/api/user/quotes", isAuthenticated, (req, res) => {
  db.User.findById(req.user.id).populate("quotes").then(dbUser => {
    res.json(dbUser.quotes);
  }).catch(err => {
    res.json(err);
  })
})

apiRouter.get("api/gallery", isAuthenticated, (req, res) => {
  db.User.findById(req.user.id)
    .populate("images")
    .then((userDoc) => {
      res.render("gallery", {
        username: req.user.username,
        images: userDoc.images,
      });
    });
});


apiRouter.get("/api/user/images", isAuthenticated, (req, res) => {
  db.User.findById(req.user.id).populate("images").then(dbUser => {
    res.json(
      dbUser.images.map((imageDoc) => {
        //Convert mongoose Document class to JS object
        const image = imageDoc.toObject();
        image.img.data = `data:image/${image.img.contentType};base64,${image.img.data.toString("base64")}`;
        return image;
      })
    );
  }).catch(err => {
    res.json(err);
  })
})

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({
  storage: storage,
  // limits: {fileSize: 500000}
});


apiRouter.post("/api/user/images", isAuthenticated, upload.single("image"), (req, res, next) => {
  fs.readFile(path.join(__dirname, "../uploads", req.file.filename))
    .then((data) => {
      var imageObject = {
        name: req.body.name,
        img: {
          data,
          contentType: "image/png",
        },
      };
      return imageObject;
    })
    .then((image) => {
      db.Image.create(image)
        .then(({ _id }) => db.User.findOneAndUpdate({ _id: req.user.id }, { $push: { images: _id } }, { new: true }))
        .then(() => {
          res.redirect("/gallery")
        })
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

apiRouter.delete("/api/user/images/:imageID", isAuthenticated, (req, res) => {
  db.Image.findById({ _id: req.params.imageID }).then(dbModel => dbModel.remove()).catch(err => {
    res.json(err);
  })
});


module.exports = apiRouter;
