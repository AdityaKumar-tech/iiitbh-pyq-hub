import express from 'express';
import { uploadResource, incrementDownload, searchResources, deleteResource } from '../controllers/Resource.js';
import { auth, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Uploading resources is restricted to admins
router.post('/upload', auth, isAdmin, uploadResource);

// Anyone can search and download
router.post('/increment-download', incrementDownload);
router.post('/search', searchResources);
router.delete('/delete', auth, isAdmin, deleteResource);

export default router;
