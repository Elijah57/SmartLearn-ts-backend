import { Schema, model } from "mongoose";

const CourseSchema = new Schema({

    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
    },
    instructorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    thumbnail: {
        type: String
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