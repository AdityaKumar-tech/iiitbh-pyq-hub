import Semester from "../models/Semester.js";

export const getAllSemesters = async (req, res) => {
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

export const createSemester = async (req, res) => {
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

export const initializeSemesters = async (req, res) => {
	try {
		const count = await Semester.countDocuments();
		if (count > 0) {
			return res.status(400).json({ success: false, message: "Semesters already initialized" });
		}
		
		const semesters = [];
		for (let i = 1; i <= 8; i++) {
			semesters.push({ name: `Semester ${i}` });
		}
		
		await Semester.insertMany(semesters);
		
		res.status(201).json({
			success: true,
			message: "8 default semesters successfully initialized",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to initialize semesters",
			error: error.message,
		});
	}
};

export const updateSemester = async (req, res) => {
	try {
		const { id, name } = req.body;
		if (!id) return res.status(400).json({ success: false, message: "Semester ID is required" });

		const updatedSemester = await Semester.findByIdAndUpdate(id, { name }, { new: true });
		if (!updatedSemester) return res.status(404).json({ success: false, message: "Semester not found" });

		res.status(200).json({ success: true, message: "Semester updated", data: updatedSemester });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Failed to update semester", error: error.message });
	}
};

export const deleteSemester = async (req, res) => {
	try {
		const { id } = req.body;
		if (!id) return res.status(400).json({ success: false, message: "Semester ID is required" });

		const deletedSemester = await Semester.findByIdAndDelete(id);
		if (!deletedSemester) return res.status(404).json({ success: false, message: "Semester not found" });

		res.status(200).json({ success: true, message: "Semester deleted" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Failed to delete semester", error: error.message });
	}
};
