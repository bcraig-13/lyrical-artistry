const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const apiRouter = require("./routes/api");
const multer = require("multer");

const fs = require("fs").promises;

const musixMatchRouter = require("./routes/musixMatchAPI");
const isAuthenticated = require("./config/isAuthenticated");

const PORT = process.env.PORT || 3001;

//body parser is used for parsing multipage requests


// Check if SERVER_SECRET has been set and exit with an error if an env var is
// not set.
if (!process.env.SERVER_SECRET) {
  throw new Error(
    "A SEVER_SECRET env variable must be set. Please add to .env or include in Heroku config."
  );
}

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/appDB", {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(err));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
}

app.use(apiRouter);
app.use(musixMatchRouter);

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });
// var Quote = require("./models/Quote");

// No idea if this is right. Comment out if it doesn't work
// app.get("/api/gallery", (req, res) => {
//   imgModel
//     .find({})
//     .lean()
//     .then((images) => {
//       res.json(
//         images.map((image) => {
//           image.img.data = `data:image/${image.img.contentType
//             };base64,${image.img.data.toString("base64")}`;
//           return image;
//         })
//       );
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send("An error occurred", err);
//     });
// });



const db = require("./models");


app.post("/api/user/images", isAuthenticated, upload.single("image"), (req, res, next) => {
  fs.readFile(path.join(__dirname + "/uploads/" + req.file.filename))
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

// Error handling
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    // Send the error rather than to show it on the console
    res.status(401).send(err);
  } else {
    next(err);
  }
});

// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function (req, res) {
//   res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
// });

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});