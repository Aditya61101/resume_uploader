import { Request, Response } from 'express';
import { allProfiles, saveProfile } from '../models/Profile';
import uploadToCloudinary from '../config/cloudinary';

type CustomRequest = Request & {
    files: { [fieldname: string]: Express.Multer.File[] };
}
export const createProfile = async (req: Request, res: Response) => {
    try {
        if (!req.file || !req.files || !req.body.name || !req.body.email) {
            return res.status(400).json({ message: 'No files uploaded.' });
        }
        const imageFile = req.file;
        const resumeFile = (req.files as Express.Multer.File[])[0];

        const image_cloudinary_url = await uploadToCloudinary(imageFile);
        const resume_cloudinary_url = await uploadToCloudinary(resumeFile);
        
        const profile = await saveProfile(req.body, resume_cloudinary_url, image_cloudinary_url);
        res.status(201).json({ profile });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getProfiles = async (_: Request, res: Response) => {
    try {
        const profiles = await allProfiles();
        res.status(200).json({ profiles });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}