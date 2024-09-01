import { AuthService } from "../services/authService";
import { UserService } from "../services/userService";
import {NextFunction, Request, Response} from "express"


const authService = new AuthService();
const profileService = new UserService();

// it signup the user
export const register = async  (req:Request, res: Response, next: NextFunction)=>{

    try{
        const {mailSent, newUser} = await authService.signup(req.body)
        await profileService.UserProfileInit(newUser._id)
        res.status(201).json({status: true, message: {mailSent, newUser}})
        console.log(`${newUser.firstname} has been added to the database`)
    }catch(error){
        next(error)
    }
}

// it logs in the user
export const login = async (req: Request, res: Response, next: NextFunction)=>{

    try{
        const { user, accessToken } = await authService.login(req.body);
        res.status(200).json({status:true, accessToken, user})
    }catch(error){
        next(error)
    }

}

// it process user email validation, from verification mail sent
export const verifyEmail = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const token = req.query.token as string;
        const {status, message} = await authService.verify(token)
        res.status(200).json({status: status, message: message})
    }catch(error){
        next(error)
    }
}
