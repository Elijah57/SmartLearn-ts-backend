import { Schema, model } from "mongoose";

const EnrollmentSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    completionStatus: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})