import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadImageToCloudinary = async (file, folder, height, quality) => {
    try {
        const options = { folder };
        if (height) {
            options.height = height;
        }
        if (quality) {
            options.quality = quality;
        }
        options.resource_type = "auto";
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (file && file.tempFilePath) {
            try {
                fs.unlinkSync(file.tempFilePath);
            } catch (err) {
                console.error("Failed to delete temp file:", err);
            }
        }
    }
}
