import { Schema, model } from "mongoose";

const CourseSchema = new Schema({

    title: {
        type: String,
        trim: true
    },
    courseCode:{
        type: String,
        trim: true,
        unique: true
    },
    description: {
        type: String,
    },
    instructorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    thumbnail: {
        public_id: String,
        url: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPKf7bdPa_aOiwGzeNO4YY4YwvAya-Hy8vOUtOFkfi1SD3HDDhjCz7Ux6OqLKNiD3SIxM&usqp=CAU"
        }
    },
    lesson: [{
        type: Schema.Types.ObjectId,
        ref: "Lesson"
    }]
},
{
    timestamps: true
})

const Course = model("Course", CourseSchema)
export default Course