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
        type:String
    },
    image:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    }
})

//converting schema to model
export const ProfileModel = mongoose.model('Profile',Profile);

//actions
export const saveProfile = (body:Request, resume:string, image:string) => ProfileModel.create({...body, resume, image});
export const allProfiles = () => ProfileModel.find();