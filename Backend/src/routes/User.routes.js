import express from 'express';
import { signup, login, logout, otpSender, changePassword, promoteToAdmin } from '../controllers/User.controller.js';
import { resetPasswordToken, resetPassword } from '../controllers/ResetPassword.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', auth, logout);
router.post('/sendotp', otpSender);

// Reset Password Routes
router.post('/reset-password-token', resetPasswordToken);
router.post('/reset-password', resetPassword);

// Add change-password route (requires user to be logged in)
router.post('/change-password', auth, changePassword);

// Secret route to manually promote an existing user to Admin
router.post('/promote-admin', promoteToAdmin);

export default router;
