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
const USER_SECRET = process.env.AWSSecretKey;
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


apiRouter.get("/api/user/images", isAuthenticated, (req, res) => {
  db.User.findById(req.user.id).populate("images").then(dbUser => {
    res.json(
      dbUser.images.map((imageDoc) => {
        //Convert mongoose Document class to JS object
        const image = imageDoc.toObject();
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
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + ".png")
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: `public-read`,
  })
});



// sends to S3
apiRouter.post("/api/user/files", upload.single("image"), isAuthenticated, (req, res) => {
  const image = {
    imageS3Url: req.file.location,
    // public: req.publicStatus
  }
  db.Image.create(image)
    .then(({ _id }) => db.User.findOneAndUpdate({ _id: req.user.id }, { $push: { images: _id } }, { new: true }))
    .catch((err) => {
      console.log(err);
    })
});

// apiRouter.get("/api/user/s3images") 
// =====================================================================================================================================================

apiRouter.delete("/api/user/images/:imageID", isAuthenticated, (req, res) => {
  db.Image.findById({ _id: req.params.imageID }).then(dbModel => {
    console.log(dbModel);
    const s3Key = dbModel.imageS3Url.replace("https://lyrical-artistry-s3.s3.amazonaws.com/","");
    var params = { Bucket: BUCKET_NAME, Key: s3Key };
    s3.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack);  // error
      else console.log();                 // deleted
    });
    dbModel.remove()
  }).catch(err => {
    res.json(err);
  })
});


module.exports = apiRouter;
