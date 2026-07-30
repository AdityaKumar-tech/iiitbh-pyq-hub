import Announcement from "../models/Announcement.js";

// Get all announcements
export const getAllAnnouncements = async (req, res) => {
	try {
		// Sort by pinned first, then by most recent
		const announcements = await Announcement.find({})
			.sort({ isPinned: -1, createdAt: -1 })
			.populate("author", "firstName lastName");

		res.status(200).json({
			success: true,
			data: announcements,
			message: "Announcements fetched successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch announcements",
			error: error.message,
		});
	}
};

// Create a new announcement (Admin)
export const createAnnouncement = async (req, res) => {
	try {
		const { title, content, isPinned } = req.body;
		const userId = req.user.id; // Assumes auth middleware sets req.user

		if (!title || !content) {
			return res.status(400).json({ success: false, message: "Title and content are required" });
		}

		const newAnnouncement = await Announcement.create({
			title,
			content,
			isPinned,
			author: userId,
		});

		res.status(201).json({
			success: true,
			message: "Announcement created successfully",
			data: newAnnouncement,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create announcement",
			error: error.message,
		});
	}
};

// Update announcement
export const updateAnnouncement = async (req, res) => {
	try {
		const { id, title, content, isPinned } = req.body;
		if (!id) return res.status(400).json({ success: false, message: "Announcement ID is required" });

		const updatedAnnouncement = await Announcement.findByIdAndUpdate(
			id,
			{ title, content, isPinned },
			{ new: true }
		);

		if (!updatedAnnouncement) {
			return res.status(404).json({ success: false, message: "Announcement not found" });
		}

		res.status(200).json({
			success: true,
			message: "Announcement updated successfully",
			data: updatedAnnouncement,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to update announcement",
			error: error.message,
		});
	}
};

// Delete announcement
export const deleteAnnouncement = async (req, res) => {
	try {
		const { id } = req.body;
		if (!id) return res.status(400).json({ success: false, message: "Announcement ID is required" });

		const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

		if (!deletedAnnouncement) {
			return res.status(404).json({ success: false, message: "Announcement not found" });
		}

		res.status(200).json({
			success: true,
			message: "Announcement deleted successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to delete announcement",
			error: error.message,
		});
	}
};
