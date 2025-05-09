import mongoose from "mongoose";
import userModel from "./user.schema.js";
import { compareHashedpassword } from "../../hashpassword/hassPassword.js";

export class userRepo{

    constructor(){
      this.userModel = userModel
    }

    async newUser(name,email,hashPassword,gender){

        const checkRegisteredUser = await this.userModel.findOne({email})

        if(!checkRegisteredUser){
            const newuser = new this.userModel({
                name,
                email,
                password: hashPassword,
                gender,
            })

            const newUser = await newuser.save()

            return {user: newUser, error: null}
        }else{
            return {user: null, error: "User already Registered"}
        }  
    }

    async login(email, password){
        const user = await this.userModel.findOne({email})

        if(!user){
            return {success: false,res:null,error: "User not found"}
        }else{
            const comparePassword = await compareHashedpassword(password, user.password);
            if(!comparePassword){
                return {error: "Password doesn't match"}
            }else{
                return{success: true,res: user, error: null}
            }
        }
    }

    async getAllUsers(){
        const users = await this.userModel.find().select('-password');

        return users;
    }

    async getSingleUser(id){
        const user = await this.userModel.findOne(id).select('-password');
        return user;
    }

    async updateUser(id,updatedFields){
        const updatedUser = await this.userModel.findByIdAndUpdate(
            id,
            updatedFields,
            {new: true}
        )
        return updatedUser;
    }

}