import Profile from '../models/Profile.js';
import User from '../models/User.model.js';
import { uploadImageToCloudinary } from '../utils/fileUpload.js';

export const updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", about = "", contactNumber = "", gender = "" } = req.body;
		const id = req.user.id;

		const userDetails = await User.findById(id);
		const profileId = userDetails.profile;
		const profileDetails = await Profile.findById(profileId);

		profileDetails.dateOfBirth = dateOfBirth;
		profileDetails.about = about;
		profileDetails.contactNumber = contactNumber;
		profileDetails.gender = gender;

		await profileDetails.save();

		res.status(200).json({
			success: true,
			message: "Profile Updated Successfully",
			profileDetails,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

export const updateDisplayPicture = async (req, res) => {
	try {
		const displayPicture = req.files.displayPicture;
		const userId = req.user.id;

		const image = await uploadImageToCloudinary(
			displayPicture,
			process.env.FOLDER_NAME,
			1000,
			1000
		);

		const updatedProfile = await User.findByIdAndUpdate(
			{ _id: userId },
			{ image: image.secure_url },
			{ new: true }
		);

		res.status(200).json({
			success: true,
			message: "Image Updated successfully",
			data: updatedProfile,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const getUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("profile")
			.exec();
		
		res.status(200).json({
			success: true,
			message: "User Data Fetched Successfully",
			data: userDetails,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
