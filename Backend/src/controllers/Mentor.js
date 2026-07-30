import Mentor from "../models/Mentor.js";

// Get all mentors
export const getAllMentors = async (req, res) => {
	try {
		const mentors = await Mentor.find({});

		res.status(200).json({
			success: true,
			data: mentors,
			message: "Mentors fetched successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch mentors",
			error: error.message,
		});
	}
};

// Create a new mentor (Admin)
export const createMentor = async (req, res) => {
	try {
		const { name, photo, department, year, specialization, contactEmail, linkedInUrl } = req.body;

		if (!name) {
			return res.status(400).json({ success: false, message: "Mentor name is required" });
		}

		const newMentor = await Mentor.create({
			name,
			photo,
			department,
			year,
			specialization,
			contactEmail,
			linkedInUrl,
		});

		res.status(201).json({
			success: true,
			message: "Mentor created successfully",
			data: newMentor,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create mentor",
			error: error.message,
		});
	}
};

export const updateMentor = async (req, res) => {
	try {
		const { id, ...updates } = req.body;
		if (!id) return res.status(400).json({ success: false, message: "Mentor ID is required" });

		const updatedMentor = await Mentor.findByIdAndUpdate(id, updates, { new: true });
		if (!updatedMentor) return res.status(404).json({ success: false, message: "Mentor not found" });

		res.status(200).json({ success: true, message: "Mentor updated", data: updatedMentor });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Failed to update mentor", error: error.message });
	}
};

export const deleteMentor = async (req, res) => {
	try {
		const { id } = req.body;
		if (!id) return res.status(400).json({ success: false, message: "Mentor ID is required" });

		const deletedMentor = await Mentor.findByIdAndDelete(id);
		if (!deletedMentor) return res.status(404).json({ success: false, message: "Mentor not found" });

		res.status(200).json({ success: true, message: "Mentor deleted" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Failed to delete mentor", error: error.message });
	}
};
