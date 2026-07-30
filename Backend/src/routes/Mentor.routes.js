import express from 'express';
import { getAllMentors, createMentor } from '../controllers/Mentor.js';
import { auth, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getAllMentors);

// creation of the mentor is in the hand of the admin
router.post('/create', auth, isAdmin, createMentor);

export default router;
