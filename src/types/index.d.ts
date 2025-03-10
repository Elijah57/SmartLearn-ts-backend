import User from "../models/users";
import { Request } from "express";
import { Types } from "mongoose";

export interface AuthenticatedRequest extends Request{
    userId: Types.ObjectId,
    role: string
}

export interface IAuthSignup {
    firstname: string,
    lastname: string,
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
    format: string,
    resourceType: string
}

export interface IcreateCourse {
    title: string,
    courseCode: string,
    description: string,
    instructorId?: Types.ObjectId,
}
// export interface IcreateCourse {
//     title: string,
//     courseCode: string,
//     description: string,
//     secureUrl: string,
//     publicId: string,
//     instructorId?: Types.ObjectId,
// }

export interface IupdateCourse {
    title?: string,
    // courseCode: string,
    description?: string,
    secureUrl?: string,
    publicId?: string,
    courseId?: String,
}


export interface Ilogs {
    level: string,
    message: string,
    timestamps?: string,
    error?: string,
    endpoint?: string
}

export interface IEmailService {
    sendWelcomeEmail(data: {}): Promise<void>,
    sendVerificationEmail(data: {}): Promise<void>,
    passwordResetEmail(data: {}): Promise<void>,
    // loginNotificationEmail(data: {}): Promise<void>,
}