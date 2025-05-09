import mongoose from "mongoose";
import otpModel from "./otp.schema.js";
import userModel from "../user/user.schema.js";

export class otpRepository{
    constructor(){
        this.otpModel = otpModel;
        this.userModel = userModel;
    }

    async sendOtp(userId,otp, recipient){
        const oneTimePass = new this.otpModel({user:userId,recipient,otp});
        console.log(oneTimePass)
        return await oneTimePass.save();
    }

    async verifyOtp(otp){
        const validOtp = await this.otpModel.findOne({otp:otp})
        return validOtp._id;
    }

    async changePassword(user, hashNewPassword){
        const passwordStatus = await this.userModel.findByIdAndUpdate(
            user,
            {$set:{password: hashNewPassword}},
            {new: true}
        )
        console.log(passwordStatus)
        return passwordStatus;
    }
}