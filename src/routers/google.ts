import { Router } from "express";
import passport from "passport";
import asyncWrapper from "../utils/asyncWrapper";
import User from "../models/users";
import { generateAccessToken } from "../utils";



const googleOauthRouter = Router();

// Authentication routes

// initiate google authentication
googleOauthRouter.get("/auth/google", passport.authenticate("google", {
    scope: ["email", "profile"],
    // session: false
}))

// route to handle successful or failed authentication
googleOauthRouter.get("/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/login/success",
        failureRedirect: "/login/failed",
        // session: false
    })
);

// Routes to handle successful/ failed authentication

googleOauthRouter.get("/login/success", asyncWrapper(async (req, res) => {
    if (req.user) {
        const accessToken = generateAccessToken(req.user._id, req.user.role)
        
        res.status(200).json({
            status: true,
            message: "Login Successful",
            token: accessToken  
        })     
    } 
}));

googleOauthRouter.get("/login/failed", asyncWrapper(async (req, res) => {
    res.status(401).json({
        status: false,
        message: "Login failed"
    })
}));


export default googleOauthRouter;