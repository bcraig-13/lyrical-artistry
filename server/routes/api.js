const { Router } = require("express");
const db = require("../models");
const isAuthenticated = require("../config/isAuthenticated");
const auth = require("../config/auth");
const apiRouter = new Router();

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const multer = require("multer");
const fs = require("fs").promises;
var multerS3 = require('multer-s3');
const AWS = require("aws-sdk");
// const BUCKET_NAME = "lyrical-artistry-s3";
const BUCKET_NAME = process.env.AWSBucket;
const USER_KEY = process.env.AWSAccessKeyId;
const USER_SECRET = process.env.AWSSecretKey
const s3 = new AWS.S3({
  accessKeyId: USER_KEY,
  secretAccessKey: USER_SECRET,
});

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
    }).catch(err => {
      res.json(err);
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


// =====================================================================================================================================================

// Updated code that uploads to S3 (able to get the saved work onto S3)



var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString()+".png")
    },
    // ^^^ this is what controls the name in the 

    // destination: (req, file, cb) => {
    //   cb(null, path.join(__dirname, "../uploads"));
    // },
    // filename: (req, file, cb) => {
    //   cb(null, file.fieldname + "-" + Date.now());
    // },
  })
});



// sends to S3
apiRouter.post("/api/user/files", upload.single("image"), isAuthenticated, (req, res) => {
  // fs.readFile(path.join(__dirname, "../uploads", req.file.filename), (err, data) => {
  // fs.readFileSync(path.join(__dirname, "../uploads/LedZeppelin.jpg"), (err, data) => {
  //   if (err) throw err;
  //   const params = {
  //     Bucket: BUCKET_NAME, // pass your bucket name
  //     // Key: 'contacts.png', // file will be saved as testBucket/contacts.csv
  //     Key: "LedZeppelin.jpg",
  //     // Body: JSON.stringify(data, null, 2)
  //     Body: data
  //   };

  //   s3.putObject(params, function (s3Err, data) {
  //   // s3.upload(params, function (s3Err, data) {
  //     if (s3Err) throw s3Err
  //     console.log(`File uploaded successfully at ${data.Location}`)
  //   });
    

  // });
  console.log("success");
});


// =====================================================================================================================================================



// sends to MongoDB (will be using the URLs eventually, instead of actual picture)
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
