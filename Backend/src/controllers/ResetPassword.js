import User from '../models/User.model.js';
import mailSender from '../utils/mailSender.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { passwordUpdated } from '../mail/templates/passwordUpdate.js';

// resetPasswordToken
export const resetPasswordToken = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email: email });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `The email ${email} is not registered with us. Please enter a valid email.`,
            });
        }
        
        const token = crypto.randomBytes(20).toString("hex");

        await User.findOneAndUpdate(
            { email: email },
            {
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000, // 5 minutes
            },
            { new: true }
        );
        
        const url = `${process.env.FRONTEND_URL}/update-password/${token}`;
        
        await mailSender(
            email,
            "Password Reset Link | Adhyaay",
            `Your password reset link is: ${url}\n\nPlease click this link to reset your password. The link will expire in 5 minutes.`
        );
        
        return res.status(200).json({
            success: true,
            message: "Email sent successfully, please check your inbox to continue.",
        });
    } catch (error) {
        console.error("Error in resetPasswordToken:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while sending the reset password email.",
            error: error.message,
        });
    }
};

// resetPassword
export const resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match.",
            });
        }
        
        const userDetails = await User.findOne({ resetPasswordToken: token });
        
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Token is invalid.",
            });
        }
        
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(403).json({
                success: false,
                message: "Token has expired, please regenerate your reset link.",
            });
        }
        
        const encryptedPassword = await bcrypt.hash(password, 10);
        
        await User.findOneAndUpdate(
            { resetPasswordToken: token },
            {
                password: encryptedPassword,
                $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 }
            },
            { new: true }
        );
        
        // Send email confirming password updated
        await mailSender(
            userDetails.email,
            "Password Updated Successfully | Adhyaay",
            passwordUpdated(userDetails.email, userDetails.name)
        );

        return res.status(200).json({
            success: true,
            message: "Password reset successful.",
        });
    } catch (error) {
        console.error("Error in resetPassword:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the password.",
            error: error.message,
        });
    }
};
