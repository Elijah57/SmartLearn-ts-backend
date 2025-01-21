import { BadRequest, Conflict, HttpError, ResourceNotFound, Unauthorized, } from "../middlewares";
import User from "../models/users"
import { IAuthLogin, IAuthSignup } from "../types";
import { comparePassword, generateAccessToken, generateVerificationCode, generateResetToken, hashPassword } from "../utils";
import sendMail  from "../utils/mail";
import config from "../configs";
import * as crypto from "crypto"
import handleServiceError from "../utils/handleServiceErrors";
import emailQueue from "../jobs/emailQueue";



class AuthService{

    public async signup(payload:IAuthSignup){

        let start = Date.now()
        const {firstname, lastname, role, email, password} = payload;

        
        const userExist = await User.findOne({email})
        if(userExist){
            throw new Conflict("User already exists") 
        }

        const hashedPassword = await hashPassword(password);
        const {activationCode, hashedActivationCode} = await generateVerificationCode();
        const otp_expires = new Date(Date.now() + 10 * 60 * 1000)

        const user = new User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.role = role;
        user.password = hashedPassword;
        user.otp_code = hashedActivationCode;
        user.otpExpires = otp_expires

        const createUser = await user.save()
        console.log(`User created in ${Date.now() - start} ms`)
        const {password: _, ...rest} = createUser.toObject();
        // console.log(createUser)

        const emailData = {
            user: createUser.firstname,
            otp: `${config.HOST}/api/auth/verify-email/?token=${activationCode}`
        }
        
        start = Date.now()
        const mailSent = await sendMail({
            subject: "Activate your account",
            to: user.email,
            data: emailData,
            template: "activation.ejs"
        });
        console.log(`signup mail sent in ${Date.now() - start} ms`)
        return { mailSent, newUser: rest}
    
    }

    public async login(payload: IAuthLogin){
        const { email, password} = payload;

        const user = await User.findOne({email})

        if(!user){
            throw new ResourceNotFound("Invalid credentials")
        }

        const  isValidPasswd = await comparePassword(password, user.password);

        if (!isValidPasswd){
            throw new BadRequest("Invalid email or password")

        }

        const user_ = user.toObject()
        const accessToken = generateAccessToken(user_._id, user.role)
        const {password: _, ...userDetails } = user_;
        // console.log(accessToken, userDetails)
        return {user: userDetails, accessToken}

    }

    public async verify(payload: string){
        const token = payload;

        const hashedActivationCode = crypto.createHash("sha256").update(token).digest("hex")
        const user = await User.findOne({otp_code: hashedActivationCode})

        if(!user){
            throw new ResourceNotFound("User does not exist or has been purged. please signup to use smartLearn")
        }

        if(user.otpExpires < (new Date(Date.now()))){
            throw new Unauthorized("Verification code Expired")
        }

        if(user.emailVerified){
            throw new Conflict("Email already verified");
        }

        user.emailVerified = true;
        user.otp_code = null;
        user.otpExpires = null
        await user.save()

        return {status:true, message: "verification successful"}
    }

    public async resetPassword(payload){
        const {resetToken, newPassword} = payload;
        const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        
        const user = await User.findOne({ passwordResetToken: hashedResetToken})

        if(!user){
            throw new ResourceNotFound("User not found")
        }

        if(user.passwordResetExpires < (new Date(Date.now()))){
            throw new Unauthorized("Password Reset link Expired")
        }

        const hashedpassword = await hashPassword(newPassword)
        user.password = hashedpassword;
        user.passwordResetExpires = null;
        user.passwordResetToken = null;
        await user.save()

        return {message: "Password successfully reseted"}
    }

    public async sendVerificationMail(payload: string){

        const email = payload;
        let user = await User.findOne({email: email})

        if(!user){
            throw new ResourceNotFound("User does not exist")
        }

        const {activationCode, hashedActivationCode} = await generateVerificationCode();
        const otp_expires = new Date(Date.now() + 10 * 60 * 1000)

        user.otp_code = hashedActivationCode;
        user.otpExpires = otp_expires

        await user.save();

        const emailData = {
            user: user.firstname,
            otp: `${config.HOST}/api/auth/verify-email/?token=${activationCode}`
        }

        const mailSent = await sendMail({
            subject: "Activate your account",
            to: user.email,
            data: emailData,
            template: "activation.ejs"
        });

        if(!mailSent){
            throw new HttpError(500, "Failed to send verification link")
        }
    }

    public async fogotPassword(payload: string){

        const email = payload;
        const user = await User.findOne({email: email})

        if(!user){
            throw new ResourceNotFound("Email not registered")
        }

        const {resetToken, hashedResetToken} = await generateResetToken();
        const tokenExpires = new Date(Date.now() + 10 * 60 * 1000)

        user.passwordResetToken = hashedResetToken;
        user.passwordResetExpires = tokenExpires;
        user.save();

        const emailData = {
            user: user.firstname,
            resetlink: `${config.HOST}/api/auth/reset-password/?token=${resetToken}`
        }

        const mailSent = await sendMail({
            subject: "Password Reset Request",
            to: user.email,
            data: emailData,
            template: "reset-password.ejs"
        });

        if(!mailSent){
            throw new HttpError(500, "Failed to send password reset link")
        }
    }
    
}


const authService = new AuthService();

export default authService;
