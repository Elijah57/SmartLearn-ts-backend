import User from "../models/users";
// import { Schema} from "mongoose";
import { Types } from "mongoose";
export interface IAuthSignup {
    firstname: string,
    lastname: string,
    gender: string,
    role?: any ,
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

export interface IuploadOptions {
    folder: string,
    fileSizeLimit: number,
    transformation?: object[] | object,
    allowedTypes: string[],
    format: string
}

export interface IcreateCourse {
    title: string,
    courseCode: string,
    description: string,
    secureUrl: string,
    publicId: string,
    instructorId?: Types.ObjectId,
}

export interface IupdateCourse {
    title?: string,
    // courseCode: string,
    description?: string,
    secureUrl?: string,
    publicId?: string,
    courseId?: String,
}