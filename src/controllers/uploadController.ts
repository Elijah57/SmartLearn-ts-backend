import multer from "multer";
import UploaderService from "../services/uploadService";
import { UserService } from "../services/userService";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../utils/cloudinary";


export async function uploadProfileImage(req: Request, res: Response, next: NextFunction){
    const userId = req.user._id;
    
    const profileService = new UserService();

    const uploader = new UploaderService({
        folder: "profile_images",
        allowedTypes: ["image/jpg", "image/png", "image/jpeg"],
        fileSizeLimit: 2 * 1024 * 1024,
        format: "jpg",
        transformation: [{ width: 300, height: 200, crop: "fill"}]
    })

    const upload = uploader.getUploader().single("image")

    upload(req, res, (err: any)=>{
        if(err){
            if(err instanceof multer.MulterError){
                if (err.code === "LIMIT_FILE_SIZE"){
                    return res.status(400).json({message: "File size exceeds the limits of 2MB"});     
                }
                else if (err){
                    res.status(400).json({message: err.message})
                }
            }
        }

        if(req.file){

            const url = req.file.path;
            const public_id = req.file.filename
            profileService.UpdateUserProfileImage(userId, url, public_id);
            
            
            res.status(200).json({
                message: "File uploaded successfully",
                public_id: public_id,
                secure_url: req.file.path
            })
        }else{
            res.status(400).json({message: 'No file uploaded'})
        }
    });
}
  