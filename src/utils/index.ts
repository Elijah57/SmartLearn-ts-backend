import * as bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "../configs";
import { Types } from "mongoose";
import * as crypto from "crypto"

export async function hashPassword(password: string): Promise<string>{
    return await bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean>{
    return await bcrypt.compare(password, hashedPassword)
}

export const generateNumericOTP = (length: number): string => {
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 9 + 1).toString();
    }
    return otp;
  };

export const generateAccessToken = (userId: Types.ObjectId, role: string) =>{
    return jwt.sign({userId, role}, config.JWT_SECRET, {expiresIn: "1d"})
}

export async function generateVerificationCode(){
  const activationCode = crypto.randomBytes(32).toString("hex")
  const hashedActivationCode = crypto.createHash("sha256").update(activationCode).digest("hex");
  return {activationCode, hashedActivationCode}
}

export async function generateResetToken(){
  const resetToken = crypto.randomBytes(32).toString("hex")
  const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  return {resetToken, hashedResetToken}
}