import authService from "../services/authService";
import userService  from "../services/userService";
import {NextFunction, Request, Response} from "express"
import asyncWrapper from "../utils/asyncWrapper";


// it signup the user
export const register = asyncWrapper(async  (req:Request, res: Response, next: NextFunction)=>{

    const {mailSent, newUser} = await authService.signup(req.body)
    await userService.UserProfileInit(newUser._id)
    res.status(201).json({status: true, message: {mailSent, newUser}})
    // console.log(`${newUser.firstname} has been added to the database`)
    
})

// it logs in the user
export const login = asyncWrapper(async (req: Request, res: Response, next: NextFunction)=>{
    const { user, accessToken } = await authService.login(req.body);
    res.status(200).json({status:true, data: {accessToken, user}})
   
})

// it process user email validation, from verification mail sent
export const verifyEmail = asyncWrapper(async (req:Request, res:Response, next:NextFunction)=>{

    const token = req.query.token as string;
    const {status, message} = await authService.verify(token)
    res.status(200).json({status: status, message: message})

})

export const sendVerificationMail = asyncWrapper(async (req: Request, res: Response, next: NextFunction)=>{

    const email = req.user.email;
    const send = await authService.sendVerificationMail(email);
    res.status(200).json({message: "Verification Mail Sent"})

})

export const fogotPassword = asyncWrapper(async (req: Request, res: Response, next: NextFunction)=>{

    const email = req.body.email;
    const send = await authService.fogotPassword(email);
    res.status(200).json({message: "password reset link sent"})

})

export const resetPassword = asyncWrapper(async(req: Request, res:Response, next: NextFunction)=>{

        const token = req.query.token as string;
        const {password} = req.body;

        const payload = {resetToken: token, newPassword: password}
        const resetMsg = await authService.resetPassword(payload);

        res.status(200).json({status: true, message: resetMsg})

})