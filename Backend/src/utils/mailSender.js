import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// 1. Initialize the transporter ONCE outside the function to reuse connections
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const mailSender = async (email, title, body) => {
    try {
        let info = await transporter.sendMail({
            // 2. Use a valid RFC 5322 From address
            from: `"Adhyaay" <${process.env.MAIL_USER}>`,
            // 3. Remove redundant template literals
            to: email,
            subject: title,
            html: body
        });

        return { success: true, data: info };
    } catch (error) {
        // 4. Handle errors properly by returning state or throwing
        console.error("Email dispatch failed:", error.message);
        return { success: false, error: error.message };
        // Alternatively: throw new Error(`Email failed: ${error.message}`);
    }
};

export default mailSender;