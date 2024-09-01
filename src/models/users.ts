import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstname : {
        type: String,
        required: false,
        trim: true

    },
    lastname : {
        type: String,
        required: true,
        trim: true,
    },
    phone:{
        type: String,
        MaxLength: 15,

    },
    gender: {
        type: String,
        // enum: ["male", "female"],
        required: true
    },
    email : {
        type: String,
        required: true,
        unique : true,
        index: true,
        trim: true
    },
   
    password:{
        type: String,
        required: false
    },
    roles: {
        type: String,
        enum: ["student", "instructor", "admin"],
        default: "student"
    },
    isBlocked :{
        type: Boolean,
        default: false,
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    otp_code: String,
    otpExpires: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    stripe_account_id: String,
    stripe_seller: {},
    stripeSession: {},
},
{
    timestamps: true,
}
);




const User = model("User", userSchema);

export default User