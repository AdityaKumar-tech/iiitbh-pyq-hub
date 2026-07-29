const Resource = require("../models/Resource");
const Subject = require("../models/Subject");

// Upload a new resource
exports.uploadResource = async (req, res) => {
	try {
		const { title, description, resourceType, fileUrl, subjectId } = req.body;
		const userId = req.user.id; // Assumes auth middleware sets req.user

		if (!title || !resourceType || !fileUrl || !subjectId) {
			return res.status(400).json({ success: false, message: "Missing required fields" });
		}

		const newResource = await Resource.create({
			title,
			description,
			resourceType,
			fileUrl,
			subject: subjectId,
			uploadedBy: userId,
		});

		// Add resource to subject's resources array
		await Subject.findByIdAndUpdate(
			subjectId,
			{ $push: { resources: newResource._id } },
			{ new: true }
		);

		res.status(201).json({
			success: true,
			message: "Resource uploaded successfully",
			data: newResource,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to upload resource",
			error: error.message,
		});
	}
};

// Increment download count
exports.incrementDownload = async (req, res) => {
	try {
		const { resourceId } = req.body;

		const resource = await Resource.findByIdAndUpdate(
			resourceId,
			{ $inc: { downloads: 1 } },
			{ new: true }
		);

		if (!resource) {
			return res.status(404).json({ success: false, message: "Resource not found" });
		}

		res.status(200).json({
			success: true,
			message: "Download count incremented",
			data: resource,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to increment download count",
			error: error.message,
		});
	}
};

// Search resources
exports.searchResources = async (req, res) => {
	try {
		const { query } = req.body;

		if (!query) {
			return res.status(400).json({ success: false, message: "Search query is required" });
		}

		// Simple regex search on title and description
		const resources = await Resource.find({
			$or: [
				{ title: { $regex: query, $options: "i" } },
				{ description: { $regex: query, $options: "i" } }
			]
		}).populate("subject");

		res.status(200).json({
			success: true,
			data: resources,
			message: "Search completed",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to search resources",
			error: error.message,
		});
	}
};
