
import { userRepo } from "./user.repositry.js";
import jwt from "jsonwebtoken"
import { compareHashedpassword, hashpassword } from "../../hashpassword/hassPassword.js";


export class userController{

    constructor(){
        this.userRepo = new userRepo()
    }

    signUp = async(req,res)=>{

        const {name,email,password,gender} = req.body;
        
        const hashedPassword = await hashpassword(password)

        const{user, error} = await this.userRepo.newUser(name,email,hashedPassword,gender);

        if(error){
            res.status(400).json({success: false, message: error})
        }

        if(user){
            res.status(200).json({success: true,message:"User is registered", user: user})
        }
    }

    login = async(req,res)=>{

        const {email, password} = req.body;

        const user = await this.userRepo.login(email,password)

        if(user.success){
            const token = jwt.sign(
                {_id:user.res._id, user: user.res},
                "CodingNinjas",
                {expiresIn: '1hr'}
            )

            res.
            cookie("jwtToken", token,{maxAge: 1*60*60*3000, httpOnly: true}).
            json({success: true, message: "User logged in Successfully", token})
        }else{
            res.status(500).json({message: user.error})
        }

    }

    getAllUsers = async(req,res) => {
        const users = await this.userRepo.getAllUsers();

        if(users){
            res.status(200).json({users})
        }else{
            res.status(500).json("Users data not available")
        }
    }

    getSingleUser = async(req,res) => {
        const {id} = req.params;
        const user = await this.userRepo.getSingleUser(id);

        if(user){
            res.status(200).json(user)
        }else{
            res.status(500).json("User not found")
        }
    }

    updateUser = async(req,res) => {
        const id = req.params.userId;

        const {password} = req.body;
        const hashedPassword = await hashpassword(password)

        const updatedFields = {
            ...req.body,
            password: hashedPassword
        }

        const updatedUser = await this.userRepo.updateUser(id,updatedFields)
        if(updatedUser){
        res.status(200).json(updatedUser)
        }else{
        res.status(500).json("User not found")
        }
    }

}