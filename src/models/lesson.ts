import { Schema, model } from "mongoose";

const LessonSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    content: {
        text: {type: String},
        video: {
            publicId: String,
            url: {
                type: String,
                default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPKf7bdPa_aOiwGzeNO4YY4YwvAya-Hy8vOUtOFkfi1SD3HDDhjCz7Ux6OqLKNiD3SIxM&usqp=CAU"
            }
        }
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    }
},
{
    timestamps: true
})

const Lesson = model("Lesson", LessonSchema)