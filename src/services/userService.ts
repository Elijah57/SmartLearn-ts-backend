import User from "../models/users";
import Profile from "../models/profile";
import { Types } from "mongoose";



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
}