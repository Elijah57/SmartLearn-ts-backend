import { Router } from "express";
import { fogotPassword, login, register, resetPassword, sendVerificationMail, verifyEmail } from "../controllers/authController";
import { isLoggedIn } from "../middlewares";



const authRouter = Router();

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("/verify-email", verifyEmail); // query token
authRouter.get("/send-verification-link", isLoggedIn, sendVerificationMail)
authRouter.get("/forgot-password", fogotPassword)
authRouter.post("/reset-password", resetPassword); // query token

export default authRouter