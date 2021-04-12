var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var imageSchema = new mongoose.Schema({
	imageS3Url: String,
	public: {
		type: Boolean,
		default: false
	}
});

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;