import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	photo: {
		type: String,
	},
	department: {
		type: String,
		trim: true,
	},
	year: {
		type: String,
		trim: true,
	},
	specialization: {
		type: String,
		trim: true,
	},
	contactEmail: {
		type: String,
		trim: true,
	},
	linkedInUrl: {
		type: String,
		trim: true,
	},
}, { timestamps: true });

export default mongoose.model("Mentor", mentorSchema);
