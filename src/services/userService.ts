import User from "../models/users";
import { ResourceNotFound } from "../middlewares";
import Profile from "../models/profile";
import { Types } from "mongoose";
import cloudinary from "../utils/cloudinary";



class UserService{

    public async UserProfileInit(userId:Types.ObjectId){

        try{
            const newProfile = new Profile({user:userId });
            await newProfile.save()

            console.log(newProfile)
            
            return "user profile created";

        }catch (error){

        }
        
    }

    public async UpdateUserProfileImage(userId:Types.ObjectId, url: string, publicId: string){
        try{
            const userProfile = await Profile.findOne({user: userId})

            if(!userProfile){
                throw new ResourceNotFound("User does not exists")
            }
            const oldImage = userProfile.userImage.publicId;
            cloudinary.uploader.destroy(oldImage,()=>{ console.log("Updated")} );
            

            userProfile.userImage.url = url
            userProfile.userImage.publicId = publicId;
            await userProfile.save();

        }catch(error){

        }
    }

    public async EnrollCourse(payload){
        // 

    }
}


const userService = new UserService();

export default userService;