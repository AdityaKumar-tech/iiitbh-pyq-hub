const Subject = require("../models/Subject");
const Semester = require("../models/Semester");

// Get a specific subject with its resources
exports.getSubjectDetails = async (req, res) => {
	try {
		const { subjectId } = req.body; // or req.params depending on route setup

		const subjectDetails = await Subject.findById(subjectId)
			.populate("resources")
			.exec();

		if (!subjectDetails) {
			return res.status(404).json({ success: false, message: "Subject not found" });
		}

		res.status(200).json({
			success: true,
			data: subjectDetails,
			message: "Subject details fetched successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch subject details",
			error: error.message,
		});
	}
};

// Create a new subject (Admin)
exports.createSubject = async (req, res) => {
	try {
		const { name, code, description, semesterId } = req.body;

		if (!name || !code || !semesterId) {
			return res.status(400).json({ success: false, message: "Missing required fields" });
		}

		const newSubject = await Subject.create({
			name,
			code,
			description,
			semester: semesterId,
		});

		// Add subject to the semester's subjects array
		await Semester.findByIdAndUpdate(
			semesterId,
			{ $push: { subjects: newSubject._id } },
			{ new: true }
		);

		res.status(201).json({
			success: true,
			message: "Subject created successfully",
			data: newSubject,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create subject",
			error: error.message,
		});
	}
};
