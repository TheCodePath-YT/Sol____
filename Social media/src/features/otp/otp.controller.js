import mongoose from "mongoose";
import nodemailer from "nodemailer"
import { otpRepository } from "./otp.repository.js";
import dotenv from 'dotenv';
import { hashpassword } from "../../hashpassword/hassPassword.js";
dotenv.config();

export class otpController{
    constructor(){
        this.otpRepository = new otpRepository();
    }

    sendOtp = async(req, res) => {

        const {recipient} = req.body;
        const userId = req._id;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        const randomNum = Math.floor((Math.random()*100000)) + 1;

        const mailOptions = {
            from: 'vairamuthudg@gmail.com',
            to: recipient,
            subject:'Please enter this OTP to change password',
            text: `The OTP is ${randomNum}`
        }

        try{
            const result = await transporter.sendMail(mailOptions);
            
            if(result){
                const oneTimePass = await this.otpRepository.sendOtp(userId,randomNum, recipient);
            
                if(oneTimePass){
                    res.status(200).json("Otp sent successfully")
                }else{
                    res.status(500).json("Otp not sent successfully")
                }
            }
        }catch(err){
            
            res.status(500).json("Mail not sent")
        }
    }

    verifyOtp = async(req,res) => {
        const {inputOtp} = req.body;
        const validOtp = await this.otpRepository.verifyOtp(inputOtp);

        if(validOtp){
            res.status(200).json("Otp is verified successfully")
        }else{
            res.status(500).json("Otp is not verified successfully")
        }
    }

    changePassword = async(req,res) => {
        const {newPassword} = req.body;
        console.log(newPassword)

        const userId = req._id;
        console.log(userId)

        const hashNewPassword = await hashpassword(newPassword);
        console.log(hashNewPassword)
        const passwordStatus = await this.otpRepository.changePassword(userId, hashNewPassword);
        console.log(passwordStatus)
        
        if(passwordStatus){
            res.status(200).json("Password is changed successfully")
        }else{
            res.status(500).json("Password is not changed successfully")
        }

    }
}