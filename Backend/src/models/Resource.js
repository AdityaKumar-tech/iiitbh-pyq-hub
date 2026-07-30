const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	resourceType: {
		type: String,
		enum: ['Note', 'PYQ', 'Assignment', 'Lab Manual', 'Reference Book', 'Syllabus'],
		required: true,
	},
	fileUrl: {
		type: String,
		required: true,
	},
	subject: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Subject",
		required: true,
	},
	uploadedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	downloads: {
		type: Number,
		default: 0,
	},
}, { timestamps: true });

module.exports = mongoose.model("Resource", resourceSchema);
