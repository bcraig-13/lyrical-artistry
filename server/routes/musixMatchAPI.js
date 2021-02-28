const { Router } = require("express");
const db = require("../models");
const isAuthenticated = require("../config/isAuthenticated");
const auth = require("../config/auth");
const musixMatchRouter = new Router();
const axios = require("axios");

// SIGNUP ROUTE
musixMatchRouter.get("/api/tracks/:trackName", (req, res) => {
    const trackName = req.params.trackName;
    axios.get(`https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackName}&f_has_lyrics=1&apikey=${process.env.MUSIXMATCH_KEY}`)
    .then((musixResponse) => {
        // console.log(data.data.message);
        // console.log(stringify(data,null,2));
        res.json(musixResponse.data);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

musixMatchRouter.get("/api/lyrics/:trackID", (req,res) => {
    const trackID = req.params.trackID;
    axios.get(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackID}&apikey=${process.env.MUSIXMATCH_KEY}`)
    .then((musixResponse) => {
        res.json(musixResponse.data);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

module.exports = musixMatchRouter;
