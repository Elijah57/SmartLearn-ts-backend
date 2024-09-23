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

    constructor(options: IuploadOptions){
        this.fileSizeLimit = options.fileSizeLimit;
        this.folder = options.folder;
        this.allowedTypes = options.allowedTypes,
        this.format = options.format;
        this.transformation = options.transformation;

        this.cloudStorage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: async (req, file)=>{
                return {
                    folder: this.folder,
                    format: this.format || "",
                    transformation: this.transformation || ""
                }
            }
        })
    }

    public getUploader(){
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

export default UploaderService;