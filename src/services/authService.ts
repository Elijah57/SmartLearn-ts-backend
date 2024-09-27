import { BadRequest, Conflict, HttpError, ResourceNotFound, Unauthorized, } from "../middlewares";
import User from "../models/users"
import { IAuthLogin, IAuthSignup } from "../types";
import { comparePassword, generateAccessToken, generateVerificationCode, generateResetToken, hashPassword } from "../utils";
import sendMail  from "../utils/mail";
import config from "../configs";
import * as crypto from "crypto"



export class AuthService{

    public async signup(payload:IAuthSignup){

        const {firstname, lastname, gender, email, password} = payload;

        try{
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
            user.gender = gender;
            user.email = email;
            user.password = hashedPassword;
            user.otp_code = hashedActivationCode;
            user.otpExpires = otp_expires

            const createUser = await user.save()

            const {password: _, ...rest} = createUser.toObject();
            console.log(createUser)

            const emailData = {
                user: createUser.firstname,
                otp: `${config.HOST}/api/auth/verify-email/?token=${activationCode}`
            }

            const mailSent = await sendMail({
                subject: "Activate your account",
                to: user.email,
                data: emailData,
                template: "activation.ejs"
            });

            return { mailSent, newUser: rest}
        }
        catch (error){
            console.error('Error during registration:', error);
            if (error instanceof HttpError) {
                throw error;
              }else{
                  throw new HttpError(error.statusCode || 500, error.message || error);
              }
            }
        }

    public async login(payload: IAuthLogin){
        const { email, password} = payload;

        try{
            const user = await User.findOne({email})

            if(!user){
                throw new ResourceNotFound("User does not exists")
            }

            const  isValidPasswd = await comparePassword(password, user.password);

            if (!isValidPasswd){
                throw new BadRequest("Invalid email or password")

            }

            // if (!user.emailVerified){
            //     throw new HttpError(403, "Email not verified")
            // }

            const user_ = user.toObject()
            const accessToken = generateAccessToken(user_._id)
            const {password: _, ...userDetails } = user_;
            console.log(accessToken, userDetails)
            return {user: userDetails, accessToken}

            
        }catch(error){
            console.log(error)
            if (error instanceof HttpError) {
                throw error;
            }
            else{

                throw new HttpError(error.statusCode || 500, error.message || error);
            }
            
        }
    }

    public async verify(payload: string){
        const token = payload;

        const hashedActivationCode = crypto.createHash("sha256").update(token).digest("hex")

        try{
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

        }catch(error){
            // console.error('Error during registration:', error);
            if (error instanceof HttpError) {
                throw error;
            }else{

                throw new HttpError(error.statusCode || 500, error.message || error);
            }
            
        }

    }

    public async resetPassword(payload){
        const {resetToken, newPassword} = payload;
        const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        try{
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



        }catch(error){
            if (error instanceof HttpError) {
                throw error;
            }
            else{

                throw new HttpError(error.statusCode || 500, error.message || error);
            }
            
        }
    }

    public async sendVerificationMail(payload: string){

        const email = payload;

        try{
            let user = await User.findOne({email: email})

            if(!user){
                throw new ResourceNotFound("User does not exist")
            }

            const {activationCode, hashedActivationCode} = await generateVerificationCode();
            const otp_expires = new Date(Date.now() + 10 * 60 * 1000)

            user.otp_code = hashedActivationCode;
            user.otpExpires = otp_expires

            await user.save()

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
        }catch(error){
            console.error('Error sending verification link:', error);
            if (error instanceof HttpError) {
                throw error;
              }
              else{

                  throw new HttpError(error.status || 500, error.message || error);
              }
            
        }

    }

    public async fogotPassword(payload: string){

        const email = payload;

        try{
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

        }catch(error){
            if(error instanceof HttpError){
                throw error;
            }else{

                throw new HttpError(error.status || 500, error.message || error)
            }
        }
    }
    
}