const { Router } = require("express");
const db = require("../models");
const isAuthenticated = require("../config/isAuthenticated");
const auth = require("../config/auth");
const apiRouter = new Router();

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

module.exports = apiRouter;
