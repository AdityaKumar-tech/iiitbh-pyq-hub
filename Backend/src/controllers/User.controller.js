import User from '../models/User.model.js';
import OTP from '../models/OTP.js';
import Profile from '../models/Profile.js';
import { generateToken } from '../utils/jwt.util.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password, rollNumber, otp } = req.body;

    if (!name || !email || !password || !rollNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, password, rollNumber, otp) are required'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN || 'college.edu';
    if (!normalizedEmail.endsWith(`@${allowedDomain}`)) {
      return res.status(400).json({ success: false, message: `Must end with @${allowedDomain}` });
    }

    if (await User.findOne({ email: normalizedEmail })) {
      return res.status(400).json({ success: false, message: 'Email registered' });
    }

    const trimmedRoll = rollNumber.trim();
    if (await User.findOne({ rollNumber: trimmedRoll })) {
      return res.status(400).json({ success: false, message: 'Roll registered' });
    }

    const recentOtp = await OTP.findOne({ email: normalizedEmail }).sort({ createdAt: -1 });
    if (!recentOtp) {
      return res.status(400).json({ success: false, message: 'OTP not found or expired' });
    } else if (otp !== recentOtp.otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const newUser = new User({
      name: name.trim(),
      email: normalizedEmail,
      password,
      rollNumber: trimmedRoll,
      accountType: "Student",
      profile: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${name.trim().replace(" ", "%20")}`
    });

    await newUser.save();

    const token = generateToken({
      id: newUser._id.toString(),
      rollNo: newUser.rollNumber,
      email: newUser.email,
      accountType: newUser.accountType
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        rollNumber: newUser.rollNumber,
        accountType: newUser.accountType
      },
      token
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'An internal error occurred', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Empty fields" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ success: false, message: "User does not exist" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid Password" });

    const token = generateToken({
      id: user._id.toString(),
      rollNo: user.rollNumber,
      email: user.email,
      accountType: user.accountType
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        rollNumber: user.rollNumber,
        accountType: user.accountType
      },
      token
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error occurring while login", error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const otpSender = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    const normalizedEmail = email.toLowerCase().trim();
    const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN || 'iiitbh.ac.in';

    if (!normalizedEmail.endsWith(`@${allowedDomain}`)) {
      return res.status(400).json({ success: false, message: `OTP can only be sent to @${allowedDomain} emails` });
    }

    // Adding the rate-limiting in the otp sender request(to prevent otp booming bug)
    // Check if an OTP was recently sent ( within the last 60 seconds)
    // find the lastest otp sent for the user
    const recentOtp = await OTP.findOne({ email: normalizedEmail }).sort({ createdAt: -1 });
    if (recentOtp) {
      const oneMinuteAgo = Date.now() - (60 * 1000);
      if (recentOtp.createdAt.getTime() > oneMinuteAgo) {
        return res.status(429).json({
          success: false,
          message: "Please wait a minute before requesting another OTP."
        });
      }
    }

    // end of the rate limiting
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const newOTP = new OTP({ email: normalizedEmail, otp });
    await newOTP.save();
    return res.status(200).json({ success: true, message: "OTP sent" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};


export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    if (!oldPassword || !newPassword) return res.status(400).json({ success: false, message: "Required" });
    const user = await User.findById(userId);
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return res.status(401).json({ success: false, message: "Incorrect password" });
    user.password = newPassword;
    await user.save();
    return res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const promoteToAdmin = async (req, res) => {
  try {
    const { email, adminSecret } = req.body;
    if (!email || !adminSecret) return res.status(400).json({ success: false, message: "Email and Admin Secret required" });
    if (adminSecret !== process.env.ADMIN_SECRET_KEY) return res.status(403).json({ success: false, message: "Invalid Admin Secret Key" });
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.accountType === "Admin") return res.status(400).json({ success: false, message: "User is already an Admin" });
    user.accountType = "Admin";
    await user.save();
    return res.status(200).json({ success: true, message: "User successfully promoted to Admin", user: { id: user._id, email: user.email, accountType: user.accountType } });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
