import { Router } from "express";
import { uploadProfileImage } from "../controllers/uploadController";
import { isLoggedIn } from "../middlewares";


const userRouter = Router();

userRouter.post("/upload-image", isLoggedIn, uploadProfileImage)


export default userRouter;