var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	name: String,
	img:
	{
		data: Buffer,
		contentType: String
	}
	// user: String
});

module.exports = new mongoose.model('ImageTest', imageSchema);