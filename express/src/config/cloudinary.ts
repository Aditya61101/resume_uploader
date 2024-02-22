import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (file: Express.Multer.File) => {
    try {
        const result = await cloudinary.uploader.upload(file.buffer.toString('base64'));
        return result.secure_url;
    } catch (err) {
        throw new Error('Error uploading file to Cloudinary.');
    }
};
export default uploadToCloudinary;