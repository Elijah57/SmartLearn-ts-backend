import courseService from "../services/courseService";
import { Request, Response, NextFunction } from "express";
import asyncWrapper from "../utils/asyncWrapper";
import cloudinary from "../utils/cloudinary";
import { HttpError } from "../middlewares";
import { Types } from "mongoose";
import Course from "../models/course";
import { AuthenticatedRequest } from "../types";


// export const course = asyncWrapper(async (req: Request, res: Response, next: NextFunction)=>{

//     const page =  Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;

//     //extract filter queries
//     const title = req.query.title;
//     const description = req.query.description
//     const search = req.query.search;

//     const offset = (page - 1) * limit;
//     const endIndex = page * limit;

//     const filterQuery: { [key: string]: any} = {};

//     if(search) { filterQuery.title = {$regex: search, $options: "i"}}
//     // if (title) { filterQuery.descrip = title}

//     const courses = await Course.find(filterQuery).skip(offset).limit(limit)


// //  total document retreive for the query
//     const totalItems = await Course.countDocuments(filterQuery)

//     return res.status(200).json({
//         status: true,
//         courses,
//         totalItems
//     })
// })

export const course = asyncWrapper(async (req: Request, res: Response, next: NextFunction)=>{

    const {id} = req.params;
    const course = await Course.findById(id)

//  total document retreive for the query
    // const totalItems = await Course.countDocuments(filterQue

    return res.status(200).json({
        status: true,
        course
    })
})


export const createCourse = asyncWrapper(async(req: AuthenticatedRequest, res: Response, next: NextFunction)=>{

    // const secureUrl = req.file.path;
    // const publicId = req.file.filename;
    const instructorId = req.userId;
    const {courseCode , title, description}= req.body as {courseCode: string, title: string, description: string}
    const payload = {courseCode, title, description, instructorId }
    // const payload = {courseCode, title, description, instructorId, secureUrl, publicId }

    const course = await courseService.createCourse(payload);

    return res.status(201).json({status: true, message: "course created successfully ", course});

})


export const updateCourse = asyncWrapper(async (req: Request, res: Response, next: NextFunction)=>{
  
    const {title, description} = req.body
    const {courseId} = req.params;

    const payload = {title, description, courseId}

    const updatedCourse = await courseService.updateCourse(payload)
    return res.status(201).json({status: true, message: "course updated successfully ", updatedCourse});

})

