const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	content: {
		type: String,
		required: true,
	},
	isPinned: {
		type: Boolean,
		default: false,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
}, { timestamps: true });

module.exports = mongoose.model("Announcement", announcementSchema);
