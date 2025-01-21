import { course, createCourse, updateCourse } from "../controllers/courseController";
import { Router } from "express";
import { isInstructor, isLoggedIn } from "../middlewares";
import { uploadCourseThumbnail } from "../controllers/uploadController";

const courseRouter = Router();


courseRouter.post("/create", isLoggedIn, isInstructor, createCourse)
// courseRouter.post("/create", isLoggedIn, isInstructor, uploadCourseThumbnail, createCourse)
courseRouter.put("/update/:courseId", isLoggedIn, isInstructor, updateCourse);
courseRouter.get("/:id", isLoggedIn, course)

export default courseRouter