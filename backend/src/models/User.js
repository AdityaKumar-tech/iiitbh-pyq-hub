const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	accountType: {
		type: String,
		enum: ["Student", "Admin"],
		required: true,
	},
	profile: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Profile",
	},
	bookmarks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Resource",
		},
	],
	downloadedResources: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Resource",
		},
	],
	image: {
		type: String,
	},
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
