export type Profile = {
    name: string;
    email: string;
    gender:string;
    dob: string;
    state: string;
    location: string[];
    id: number|string;
    image_cloudinary_url: string;
    resume_cloudinary_url: string;
    uploaded_at:Date;
}