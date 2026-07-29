const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const { sendWelcomeEmail } = require("../mail/templates/confirmationRegistrationMail");
require("dotenv").config();

// Signup Controller
exports.signup = async (req, res) => {
	try {
		const { firstName, lastName, email, password, accountType } = req.body;

		// Validation
		if (!firstName || !lastName || !email || !password) {
			return res.status(403).send({
				success: false,
				message: "All fields are required",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User is already registered",
			});
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a blank profile
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});

		// Create user entry
		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			accountType: accountType || "Student",
			profile: profileDetails._id,
			image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}%20${lastName}`,
		});

		// Send welcome email
		await sendWelcomeEmail(email, firstName);

		return res.status(200).json({
			success: true,
			message: "User is registered successfully",
			user,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};

// Login Controller
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Validation
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Please fill up all the data.",
			});
		}

		// Find user
		const user = await User.findOne({ email }).populate("profile");
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "User is not registered with us Please signup to continue",
			});
		}

		// Check password & generate JWT
		if (await bcrypt.compare(password, user.password)) {
			const payload = {
				email: user.email,
				id: user._id,
				accountType: user.accountType,
			};

			const token = jwt.sign(payload, process.env.JWT_SECRET || "fallback_secret", {
				expiresIn: "24h",
			});

			// Save token to user object for response
			user.token = token;
			user.password = undefined;

			// Create cookie and send response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: "User Login Success",
			});
		} else {
			return res.status(401).json({
				success: false,
				message: "Password is incorrect",
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Login Failure. Please try again.",
		});
	}
};
