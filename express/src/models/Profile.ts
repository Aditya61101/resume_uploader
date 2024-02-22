import mongoose from "mongoose";

const Profile = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    dob:{
        type:Date
    },
    state:{
        type:String
    },
    gender:{
        type:String
    },
    location:{
        type:[String]
    },
    image_cloudinary_url:{
        type:String,
        required:true
    },
    resume_cloudinary_url:{
        type:String,
        required:true
    }
})

//converting schema to model
export const ProfileModel = mongoose.model('Profile',Profile);

//actions
export const saveProfile = (body:Request, resume_cloudinary_url:string, image_cloudinary_url:string) => ProfileModel.create({...body, resume_cloudinary_url, image_cloudinary_url});

export const allProfiles = () => ProfileModel.find();