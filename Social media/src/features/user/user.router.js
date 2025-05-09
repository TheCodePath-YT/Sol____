import express from "express"
import { Router } from "express";
import { userController } from "./user.controller.js";

const user = new userController()


const userRouter = express.Router();


userRouter.post('/signup',user.signUp)
userRouter.post('/signin',user.login)
userRouter.get('/get-all-details', user.getAllUsers)
userRouter.get('/get-details/:userId', user.getSingleUser)
userRouter.post('/update-details/:userId', user.updateUser)



export default userRouter