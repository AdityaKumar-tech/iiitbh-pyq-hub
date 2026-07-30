import User from '../models/User.model.js';
import { generateToken } from '../utils/jwt.util.js';

/**
 * Controller for user signup.
 * Accepts name, email, password, and rollNumber.
 * Validates college email domain, checks for duplicates, hashes password, and saves to MongoDB.
 */
export const signup = async (req, res) => {
  try {
    const { name, email, password, rollNumber } = req.body;

    if (!name || !email || !password || !rollNumber) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, password, rollNumber) are required'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address format'
      });
    }

    const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN || 'college.edu';
    if (!normalizedEmail.endsWith(`@${allowedDomain}`)) {
      return res.status(400).json({
        success: false,
        message: `Registration is restricted to college email addresses ending with @${allowedDomain}`
      });
    }

    const existingEmailUser = await User.findOne({ email: normalizedEmail });
    if (existingEmailUser) {
      return res.status(400).json({
        success: false,
        message: 'Email address is already registered'
      });
    }

    const trimmedRoll = rollNumber.trim();
    const existingRollUser = await User.findOne({ rollNumber: trimmedRoll });
    if (existingRollUser) {
      return res.status(400).json({
        success: false,
        message: 'Roll number is already registered'
      });
    }

    const newUser = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: password,
      rollNumber: trimmedRoll
    });

    await newUser.save();

    const token = generateToken({
      mongo_id: newUser._id.toString(),
      rollNo: newUser.rollNumber,
      email: newUser.email
    });

    // setting the cookie (access) for the next 7 days
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
        rollNumber: newUser.rollNumber
      },
      token
    });

  } catch (error) {
    console.error('Signup controller error:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal error occurred during signup registration',
      error: error.message
    });
  }
};

/// Adding the login controller to the folder

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Empty Password or Email field"
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Matching the password entered by the user
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password"
      })
    }

    const token = generateToken({
      mongo_id: user._id.toString(),
      rollNo: user.rollNumber,
      email: user.email,
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
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurring while login / INTERNAL SERVER ERROR",
      error: error.message
    });
  }
}

// Logout controller (clears the cookie)
export const logout = (req, res) => {

  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};



