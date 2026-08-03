import Resource from "../models/Resource.js";
import Subject from "../models/Subject.js";
import { uploadImageToCloudinary } from "../utils/fileUpload.js";

export const uploadResource = async (req, res) => {
	try {
		let { title, description, resourceType, fileUrl, subjectId } = req.body;
		const userId = req.user.id;

		if (!title || !subjectId) {
			return res.status(400).json({ success: false, message: "Missing required fields: title, subjectId" });
		}

		if (!resourceType) resourceType = "PYQ";

		if (!fileUrl && req.files && req.files.file) {
			const uploadedResource = await uploadImageToCloudinary(req.files.file, process.env.FOLDER_NAME || "resources");
			fileUrl = uploadedResource.secure_url;
		}

		if (!fileUrl) {
			return res.status(400).json({ success: false, message: "Missing fileUrl or physical file upload" });
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
export const incrementDownload = async (req, res) => {
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
export const searchResources = async (req, res) => {
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

export const deleteResource = async (req, res) => {
	try {
		const { id } = req.body;
		if (!id) return res.status(400).json({ success: false, message: "Resource ID is required" });

		const deletedResource = await Resource.findByIdAndDelete(id);
		if (!deletedResource) return res.status(404).json({ success: false, message: "Resource not found" });

		if (deletedResource.subject) {
			await Subject.findByIdAndUpdate(deletedResource.subject, {
				$pull: { resources: deletedResource._id }
			});
		}

		res.status(200).json({ success: true, message: "Resource deleted" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Failed to delete resource", error: error.message });
	}
};
