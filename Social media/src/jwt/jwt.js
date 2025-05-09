
import jwt from "jsonwebtoken";

export const auth = async(req,res,next)=>{

    const {jwtToken} = req.cookies;

    jwt.verify(jwtToken,"CodingNinjas",(err,data)=>{
        if(err){
            res.status(400).send("Unauthorized User")
        }else{
           req._id = data.user._id;
           req.user = data.user;
          
        }
    })
    
    next()
}