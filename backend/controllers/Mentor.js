const Mentor = require("../models/Mentor");

// Get all mentors
exports.getAllMentors = async (req, res) => {
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
exports.createMentor = async (req, res) => {
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
