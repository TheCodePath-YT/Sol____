import express from 'express';
import UserController from './user.controller.js';
const UserRouter = express.Router();
UserRouter.post("/signup",UserController.SignUp);
UserRouter.post("/signin",UserController.SignIn);
export default UserRouter;