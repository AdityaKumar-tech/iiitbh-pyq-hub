import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import os from 'os';
import authRoutes from './routes/User.routes.js';
import announcementRoutes from './routes/Announcement.routes.js';
import mentorRoutes from './routes/Mentor.routes.js';
import resourceRoutes from './routes/Resource.routes.js';
import semesterRoutes from './routes/Semester.routes.js';
import subjectRoutes from './routes/Subject.routes.js';
import profileRoutes from './routes/Profile.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: os.tmpdir() }));

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/semesters', semesterRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/profile', profileRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Auth service is healthy' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

export default app;
