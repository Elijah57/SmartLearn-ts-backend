import { NextFunction, Request, Response } from "express";
import User from "../models/users";
import * as jwt from "jsonwebtoken";
import config from "../configs";

export async function isLoggedIn(req:Request, res:Response, next:NextFunction){

    const token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "Unauthorized, please login to continue"})
    }

    try{
        const decode: any = jwt.verify(token, config.JWT_SECRET);
        const user = await User.findById(decode?.userId).select("-password")

        if(!user){
            return res.status(401).json({message: "Invalid Token"})
        }

        // i had error here with ts and had to modify the type of express Request to accomodate user
        req.user = user;
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

export async function isInstructor(req:Request, res:Response, next: NextFunction){
    if(!req.user || req.user.roles !== "instructor"){
        return res.status(401).json({message: "Not Authorized"})
    }

    next()
}


export async function isAdmin(req:Request, res:Response, next: NextFunction){
    if(!req.user || req.user.roles !== "admin"){
        return res.status(401).json({message: "Not Authorized"})
    }

    next()
}

export async function isStudent(req:Request, res:Response, next: NextFunction){
    if(!req.user || req.user.roles !== "student"){
        return res.status(401).json({message: "Not Authorized"})
    }

    next()
}