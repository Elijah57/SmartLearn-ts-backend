import { BadRequest, Conflict, ResourceNotFound, Unauthorized, } from "../middlewares";
import User from "../models/users"
import { IAuthLogin, IAuthSignup, IEmailService } from "../types";
import { comparePassword, generateAccessToken, generateVerificationCode, generateResetToken, hashPassword } from "../utils";
import config from "../configs";
import * as crypto from "crypto"
import emailQueue from "../queues/emailQueue";
import { EmailQueueService } from "./emailQueueService";


class AuthService{
    private readonly emailService: IEmailService
    constructor(emailService: IEmailService){
        this.emailService = emailService
    }

    public async signup(payload:IAuthSignup){
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
        
        const emailData = {
            task: "activate",
            to: user.email,
            subject: "Activate your account",
            emailTemplate: "activation.ejs",
            user: createUser.firstname,
            otp: `${config.HOST}/api/auth/verify-email/?token=${activationCode}`, 
        }
        
        this.emailService.sendVerificationEmail(emailData)
        
        // return rest
        return {message: "user created", user: createUser._id}
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

        await emailQueue.add("verification", {
            task: "activate",
            to: user.email,
            subject: "Activate your account",
            emailTemplate: "activation.ejs",
            user: user.firstname,
            otp: `${config.HOST}/api/auth/verify-email/?token=${activationCode}`,
        })
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
            task: "activate",
            to: user.email,
            subject: "Password Reset Request",
            emailTemplate: "reset-password.ejs",
            user: user.firstname,
            link: `${config.HOST}/api/auth/verify-email/?token=${resetToken}`,
        }
        this.emailService.passwordResetEmail(emailData)
    } 
}

const mailService = new EmailQueueService(emailQueue)
const authService = new AuthService(mailService);

export default authService;
