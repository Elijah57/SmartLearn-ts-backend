import { NextFunction, Request, Response } from "express";
import User from "../models/users";
import * as jwt from "jsonwebtoken";
import config from "../configs";
import { AuthenticatedRequest } from "../types";

export async function isLoggedIn(req:AuthenticatedRequest, res:Response, next:NextFunction){
    
    const token = req.headers.authorization.split(" ")[1];
    if(!token) return res.status(401).json({message: "Unauthorized, please login to continue"})

    try{
        const decode= jwt.verify(token, config.JWT_SECRET) as {userId, role};
        req.userId = decode.userId;
        req.role = decode.role
        next()
    }catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired, please login again" });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token, please login again" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

}

export async function isInstructor(req:AuthenticatedRequest, res:Response, next: NextFunction){
    if(req.role !== "instructor"){
        return res.status(401).json({message: "Not Authorized"})
    }

    next()
}



export async function isAdmin(req:AuthenticatedRequest, res:Response, next: NextFunction){
    if(req.role !== "admin"){
        return res.status(401).json({message: "Not Authorized"})
    }

    next()
}

export async function isStudent(req:AuthenticatedRequest, res:Response, next: NextFunction){
    if(req.role !== "student"){
        return res.status(401).json({message: "Not Authorized"})
    }

    next()
}


export const performanceLogger = (req: Request, res: Response, next: NextFunction)=>{
    const start = Date.now();
    res.on("finish", ()=>{
        const duration = Date.now() - start;
        console.log(`Request to ${req.path} took ${duration} ms`)
    })

    next()
}
    // export async function isLoggedIn(req:AuthenticatedRequest, res:Response, next:NextFunction){
    
    //     const token = req.headers.authorization.split(" ")[1];
    
    //     if(!token){
    //         return res.status(401).json({message: "Unauthorized, please login to continue"})
    //     }
    
    //     try{
    //         const decode: any = jwt.verify(token, config.JWT_SECRET);
    //         const user = await User.findById(decode?.userId).select("-password")
    
    //         if(!user){
    //             return res.status(401).json({message: "Invalid Token"})
    //         }
    
    //         // i had error here with ts and had to modify the type of express Request to accomodate user
    //         req.user = user;
    //         next()
    
    //     }catch (error) {
    //         if (error.name === 'TokenExpiredError') {
    //             return res.status(401).json({ message: "Token has expired, please login again" });
    //         } else if (error.name === 'JsonWebTokenError') {
    //             return res.status(401).json({ message: "Invalid token, please login again" });
    //         } else {
    //             return res.status(500).json({ message: "Internal server error" });
    //         }
    //     }
    
    // }