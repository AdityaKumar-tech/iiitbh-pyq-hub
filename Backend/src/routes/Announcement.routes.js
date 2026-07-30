import express from 'express';
import { getAllAnnouncements, createAnnouncement } from '../controllers/Announcement.js';
import { auth, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getAllAnnouncements);


/// creation of the route is in the hand of the admin
router.post('/create', auth, isAdmin, createAnnouncement);

export default router;
