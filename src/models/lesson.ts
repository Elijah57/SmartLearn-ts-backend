import { Schema, model } from "mongoose";

const LessonSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    content: {
        type: String
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