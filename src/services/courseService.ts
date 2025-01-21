import { IcreateCourse, IupdateCourse } from "../types";
import Course from "../models/course";
import { HttpError, ResourceNotFound } from "../middlewares";
import { Types } from "mongoose";
import cloudinary from "../utils/cloudinary";

class CourseService{

    public async createCourse(payload:IcreateCourse){
        try{
            const {courseCode, title, description, instructorId} = payload;
            // const {courseCode, title, description, instructorId, secureUrl, publicId} = payload;
    
            const newCourse  = new Course();
            newCourse.title = title;
            newCourse.courseCode = courseCode;
            newCourse.description = description;
            newCourse.instructorId = instructorId;
            newCourse.thumbnail.url = null;
            // newCourse.thumbnail.url = secureUrl;
            newCourse.thumbnail.publicId = null;
            // newCourse.thumbnail.publicId = publicId;
    
            let course = await newCourse.save();
            const courseData = course.toObject()
            return courseData ;

        }catch(error){
            if(error instanceof HttpError){
                throw error;
            }
            else{
                throw new HttpError(error.statusCode || 500, error.message || error)
            }
        }

    }

    public async updateCourse(payload: IupdateCourse){

        const courseId = payload.courseId;
        const updateFields = {}

        try{
            const course = await Course.findById(courseId);

            if(!course){
                throw new ResourceNotFound("Course not Found");
            }

            course.title = payload.title !== undefined ? payload.title : course.title;
            course.description = payload.description !== undefined ? payload.description : course.description;

            let updatedCourse = await course.save();
            const courseData = updatedCourse.toObject();
            return courseData ;

        }catch(error){
            if(error instanceof HttpError){
                throw error
            }else{
                throw new HttpError(error.statusCode || 500, error.message || error)
            }
        }

    }

    
    public async updateCourseThumbnail(courseId: Types.ObjectId, url: string, publicId: string){

        try{
            const course = await Course.findById(courseId);

            if(!course){
                throw new ResourceNotFound("Course not Found");
            }

            const old_image = course.thumbnail.publicId;
            cloudinary.uploader.destroy(old_image,()=>{ console.log("Updated")} );
            

            course.thumbnail.url = url
            course.thumbnail.publicId = publicId;
            await course.save();
        }catch(error){

        }
    }

    public async deleteCourse(payload){
        
    }
}

const courseService = new CourseService();
export default courseService;