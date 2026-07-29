const Semester = require("../models/Semester");

// Get all semesters with their subjects
exports.getAllSemesters = async (req, res) => {
	try {
		const allSemesters = await Semester.find({})
			.populate("subjects")
			.exec();

		res.status(200).json({
			success: true,
			data: allSemesters,
			message: "Semesters fetched successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch semesters",
			error: error.message,
		});
	}
};

// Create a new semester (Admin)
exports.createSemester = async (req, res) => {
	try {
		const { name } = req.body;

		if (!name) {
			return res.status(400).json({ success: false, message: "Semester name is required" });
		}

		const newSemester = await Semester.create({ name });

		res.status(201).json({
			success: true,
			message: "Semester created successfully",
			data: newSemester,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create semester",
			error: error.message,
		});
	}
};
