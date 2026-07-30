import express from 'express';
import { getAllSemesters, createSemester, initializeSemesters, updateSemester, deleteSemester } from '../controllers/Semester.js';
import { auth, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getAllSemesters);
router.post('/create', auth, isAdmin, createSemester);
router.post('/init', auth, isAdmin, initializeSemesters);
router.put('/update', auth, isAdmin, updateSemester);
router.delete('/delete', auth, isAdmin, deleteSemester);

export default router;
