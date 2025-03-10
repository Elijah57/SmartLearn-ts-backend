import multer from "multer";
import { profileImageUploader, courseThumbnailUploader} from "../services/uploadService";
import  userService  from "../services/userService";
import { Request, Response, NextFunction } from "express";


export async function uploadProfileImage(req: Request, res: Response, next: NextFunction){
    const userId = req.user._id;

    const upload = profileImageUploader.Uploader().single("image")

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
            const publicId = req.file.filename
            userService.UpdateUserProfileImage(userId, url, publicId);
            
            
            res.status(200).json({
                message: "File uploaded successfully",
                public_id: publicId,
                secure_url: req.file.path
            })
        }else{
            res.status(400).json({message: 'No file uploaded'})
        }
    });
}

export async function uploadCourseThumbnail(req: Request, res: Response, next: NextFunction){

    const upload = courseThumbnailUploader.Uploader().single("image")

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

            next()
        }
        // }else{
        //     throw new ServerError("File wasn't uplaoded");
        // }
    });

}
  