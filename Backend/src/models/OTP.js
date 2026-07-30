import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";
import otpTemplate from "../mail/templates/emailVerificationTemplate.js";

const otpSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        otp: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 5 * 60
        }
    }
)

// send the verification email
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification email from Adhyaay", otpTemplate(otp));
        console.log("email sent successfully");
    } catch (error) {
        console.log("error occured at", error);
        throw error;
    }
}

otpSchema.pre("save", async function () {
    await sendVerificationEmail(this.email, this.otp);
})

export default mongoose.model("OTP", otpSchema);
