import express from 'express';
import { getSubjectDetails, createSubject, updateSubject, deleteSubject } from '../controllers/Subject.js';
import { auth, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Fetch subject details via POST (expects subjectId in body)
router.post('/details', getSubjectDetails);

// Create subject is restricted to admins
router.post('/create', auth, isAdmin, createSubject);
router.put('/update', auth, isAdmin, updateSubject);
router.delete('/delete', auth, isAdmin, deleteSubject);

export default router;
