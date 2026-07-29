const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	code: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	semester: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Semester",
		required: true,
	},
	resources: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Resource",
		},
	],
});

module.exports = mongoose.model("Subject", subjectSchema);
