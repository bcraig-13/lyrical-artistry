var mongoose = require('mongoose');

var quoteSchema = new mongoose.Schema({
    title: String,
    artist: String,
    quote: String,
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = new mongoose.model('Quote', quoteSchema);