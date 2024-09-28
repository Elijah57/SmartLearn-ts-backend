import User from "../models/users";
import { ResourceNotFound } from "../middlewares";
import Profile from "../models/profile";
import { Types } from "mongoose";
import cloudinary from "../utils/cloudinary";



export class UserService{

    public async UserProfileInit(userId:Types.ObjectId){

        try{
            const newProfile = new Profile({user:userId });
            await newProfile.save()

            console.log(newProfile)
            
            return "user profile created";

        }catch (error){

        }
        
    }

    public async UpdateUserProfileImage(userId:Types.ObjectId, url: string, public_id: string){
        try{
            const userProfile = await Profile.findOne({user: userId})

            if(!userProfile){
                throw new ResourceNotFound("User does not exists")
            }
            const old_image = userProfile.user_image.public_id;
            cloudinary.uploader.destroy(old_image,()=>{ console.log("Updated")} );
            

            userProfile.user_image.url = url
            userProfile.user_image.public_id = public_id;
            userProfile.save();

        }catch(error){

        }
    }

    public async EnrollCourse(payload){
        // 

    }
}