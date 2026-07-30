import Subject from "../models/Subject.js";
import Semester from "../models/Semester.js";

export const getSubjectDetails = async (req, res) => {
	try {
		const { subjectId } = req.body;

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
export const createSubject = async (req, res) => {
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

export const updateSubject = async (req, res) => {
	try {
		const { id, name, code, description } = req.body;
		if (!id) return res.status(400).json({ success: false, message: "Subject ID is required" });

		const updatedSubject = await Subject.findByIdAndUpdate(
			id,
			{ name, code, description },
			{ new: true }
		);

		if (!updatedSubject) return res.status(404).json({ success: false, message: "Subject not found" });

		res.status(200).json({ success: true, message: "Subject updated", data: updatedSubject });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Failed to update subject", error: error.message });
	}
};

export const deleteSubject = async (req, res) => {
	try {
		const { id } = req.body;
		if (!id) return res.status(400).json({ success: false, message: "Subject ID is required" });

		const deletedSubject = await Subject.findByIdAndDelete(id);
		if (!deletedSubject) return res.status(404).json({ success: false, message: "Subject not found" });

		// Remove from Semester if necessary (depending on schema logic)
		if (deletedSubject.semester) {
			await Semester.findByIdAndUpdate(deletedSubject.semester, {
				$pull: { subjects: deletedSubject._id }
			});
		}

		res.status(200).json({ success: true, message: "Subject deleted" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Failed to delete subject", error: error.message });
	}
};
