import User from "../models/users";
import { Document } from "mongoose";

export interface IAuthSignup {
    firstname: string,
    lastname: string,
    gender: string,
    email: string,
    password: string,
    phone: string
}

export interface IAuthLogin {
    email: string,
    password: string
}

export interface IMail {
    subject: string,
    to: string,
    data: object,
    template: string
}

declare module "express-serve-static-core" {
    interface Request {
      user?: InstanceType<typeof User>;
    }
  }