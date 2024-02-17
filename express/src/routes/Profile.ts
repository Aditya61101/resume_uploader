import express from 'express';
import { createProfile, getProfiles } from '../controllers/Profile';
import { uploads } from '../middlewares/multer';

const router = express.Router();

router.get("/resumes", getProfiles);
router.post("/resume-upload", uploads, createProfile);

export default router;