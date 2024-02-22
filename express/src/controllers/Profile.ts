import { Request, Response } from 'express';
import { allProfiles, saveProfile } from '../models/Profile';
import cloudinary from '../config/cloudinary';

type CustomRequest = Request & {
    files: { [fieldname: string]: Express.Multer.File[] };
}
export const createProfile = async (req: Request, res: Response) => {
    try {
        const customReq= req as CustomRequest;

        const resume=customReq.files?.resume[0].path;
        const resume_cloudinary_url = (await cloudinary.uploader.upload(resume)).secure_url;
        
        const image=customReq.files?.image[0].path;
        const image_cloudinary_url = (await cloudinary.uploader.upload(image)).secure_url;

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