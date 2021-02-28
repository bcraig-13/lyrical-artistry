const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const apiRouter = require("./routes/api");

const bodyParser = require("body-parser");
const fs = require("fs");

const musixMatchRouter = require("./routes/musixMatchAPI");


const PORT = process.env.PORT || 3001;

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
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(err));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(apiRouter);
app.use(musixMatchRouter);

var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });
var imgModel = require("./models/imageModel");

app.get("{GALLERY-COMPONENT-HERE}", (req, res) => {
  imgModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("{IMAGE-COMPONENT-HERE}", { items: items });
    }
  });
});

app.post("{CANVAS-COMPONENT-URL-HERE?}", upload.single("image"), (req, res, next) => {
  var obj = {
    name: req.body.name,
    img: {
      data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)), //May need to change /uploads/
      contentType: "image/png",
    },
  };
  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.redirect("{REDIRECT-TO-SEARCH?}");
    }
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
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
