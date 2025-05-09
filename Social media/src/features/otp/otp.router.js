import express from "express";
import { otpController } from "./otp.controller.js";
import { auth } from "../../jwt/jwt.js";

const otpRouter = express.Router();

const otp = new otpController();

otpRouter.post('/send',auth,otp.sendOtp)
otpRouter.post('/verify',otp.verifyOtp)
otpRouter.post('/reset-password',auth,otp.changePassword)

export default otpRouter