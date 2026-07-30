import express from 'express';
import { updateProfile, getUserDetails, updateDisplayPicture } from '../controllers/Profile.controller.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.put('/updateProfile', auth, updateProfile);
router.get('/getUserDetails', auth, getUserDetails);
router.put('/updateDisplayPicture', auth, updateDisplayPicture);

export default router;
