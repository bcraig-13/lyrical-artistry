const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new mongoose.Schema({
    title: String,
    artist: String,
    quote: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Quote = mongoose.model("Quote", quoteSchema)
module.exports = Quote;