import UserModel from './user.model.js';
import jwt from 'jsonwebtoken';
import { customErrorHandler } from '../../middlewares/errorhandler.middleware.js';
export default class UserController{
    static SignUp(req, res){
        const {name,email,password}=req.body;
        if(!name||!email||!password){
            // return res.status(400).send({"data":[],"err":1,"msg":"Invalid data"});
            throw new customErrorHandler(400,"Invalid data");
        }
        let user=UserModel.createUser(name,email,password);
        if(!user){
            throw new customErrorHandler(400,"Invalid data");
            // return res.status(400).send({"data":[],"err":1,"msg":"Invalid data"});
        }else{
            return res.status(201).send({"data":user,"err":0,"msg":"User created successfully"});
        }
    }
    static SignIn(req,res){
        const {email,password}=req.body;
        if(!email||!password){
            throw new customErrorHandler(400,"Invalid data");
            // return res.status(400).send({"data":[],"err":1,"msg":"Invalid data"});
        }
        let user=UserModel.checkUser(email,password);
        if(!user){
            throw new customErrorHandler(400,"Invalid data");
            // return res.status(400).send({"data":[],"err":1,"msg":"Invalid data"});
        }else{
            let userEmail=user.email;
            let userName=user.name;
            let userID=user.id;
            const token=jwt.sign({id:userID,name:userName,email:userEmail},"secretkey");
            return res.status(200).send({"data":token,"err":0,"msg":"User logged in successfully"});
    }
}
}