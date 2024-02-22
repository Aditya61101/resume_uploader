import { Request, Response } from 'express';
import { allProfiles, saveProfile } from '../models/Profile';
import cloudinary from '../config/cloudinary';

const uploadToCloudinary = async (file: Express.Multer.File) => {
    try {
        const result: any = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
            uploadStream.end(file.buffer);
        });
        return result.secure_url;
    } catch (err) {
        console.log(err);
        throw new Error('Error uploading file to Cloudinary.');
    }
};

export const createProfile = async (req: Request, res: Response) => {
    try {
        if (!req.files || !req.body.name || !req.body.email) {
            return res.status(400).json({ message: 'No files uploaded.' });
        }
        const imageFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['image'][0];
        const resumeFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['resume'][0];

        const image_cloudinary_url = await uploadToCloudinary(imageFile) as string;
        const resume_cloudinary_url = await uploadToCloudinary(resumeFile) as string;

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