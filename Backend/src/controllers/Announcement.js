const Announcement = require("../models/Announcement");

// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
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
exports.createAnnouncement = async (req, res) => {
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
