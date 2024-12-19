import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary";
import { InvalidInput } from "../middlewares";
import { IuploadOptions } from "../types";


class UploaderService{

    private cloudStorage: CloudinaryStorage;
    public fileSizeLimit: number;
    public folder: string;
    public transformation: object[] | object;
    public allowedTypes: string[];
    public format: string;
    public resourceType: string

    constructor(options: IuploadOptions){
        this.fileSizeLimit = options.fileSizeLimit;
        this.folder = options.folder;
        this.allowedTypes = options.allowedTypes,
        this.format = options.format;
        this.transformation = options.transformation;
        this.resourceType = options.resourceType

        this.cloudStorage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: async (req, file)=>{
                return {
                    resourceType: this.resourceType,
                    folder: this.folder,
                    format: this.format || "",
                    transformation: this.transformation || ""
                }
            }
        })
    }

    public Uploader(){
        return multer({
            storage: this.cloudStorage,
            limits: {
                fileSize: this.fileSizeLimit
            },
            fileFilter: async (req, file, cb)=> {  // handle file formats
                const allowedFileTypes = this.allowedTypes || []
                if (allowedFileTypes.includes(file.mimetype)){
                    cb(null, true)
                }
                else{
                    cb(new InvalidInput(`Invalid file type. Only ${allowedFileTypes.join(", ")}are allowed.`))
                }
                
            }
        })
    }
}




class CourseThumbnailUploader extends UploaderService{
    constructor(){

        const options: IuploadOptions = {
            resourceType: "image",
            fileSizeLimit: 2 * 1024 * 1024, // 5 MB
            folder: "course-thumbnails",
            allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/jpg"],
            format: "webp",
            transformation: { width: 400, height: 300, crop: "fill" },
        }
        super(options);
        
    }
}

class LessonVideoUploader extends UploaderService{
    constructor(){

        const options: IuploadOptions = {
            resourceType: "video",
            fileSizeLimit: 2 * 1024 * 1024, // 5 MB
            folder: "lessons-video",
            allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/jpg"],
            format: "webp",
            transformation: { width: 400, height: 300, crop: "fill" },
        }
        super(options);
        
    }
}

class ProfileImageUploader extends UploaderService{
    constructor(){

        const options: IuploadOptions = {
            resourceType: "image",
            fileSizeLimit: 2 * 1024 * 1024, // 5 MB
            folder: "profile-images",
            allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
            format: "jpg",
            transformation: { width: 200, height: 200, crop: "fill" },
        }
        super(options);
        
    }
}


export const profileImageUploader = new ProfileImageUploader();
export const courseThumbnailUploader = new CourseThumbnailUploader();
