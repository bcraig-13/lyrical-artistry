const { Router } = require("express");
const apiImageRouter = new Router();

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const db = require("../models");

const multer = require("multer");
var upload = multer({ storage: storage });
const fs = require("fs").promises;
const isAuthenticated = require("../config/isAuthenticated");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    },
});


apiImageRouter.post("/protected", [upload.single("image"), isAuthenticated], (req, res, next) => {
    fs.readFile(path.join(__dirname + "/uploads/" + req.file.filename))
        .then((data) => {
            var obj = {
                name: req.body.name,
                img: {
                    data, //May need to change /uploads/
                    contentType: "image/png",
                },
            };
            return obj;
        })
        .then(() => {
            return db.Image.create(obj);
        }).then(() => {
            res.redirect("/gallery");
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});