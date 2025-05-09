import LikeModel from "./like.model.js";
import { customErrorHandler } from "../../middlewares/errorhandler.middleware.js";
export default class LikeController{
    static retrieveAllLikes(req,res){
        const postID=req.params.postId;
        const userID=req.user.id;
        const result=LikeModel.getAllLikes(userID,postID);
        if(!result){
            throw new customErrorHandler(400,"Failed to retrieve likes");
            // res.status(400).send({data:[],err:1,message:"Failed to retrieve likes"});
        }
        res.status(200).send({data:result,err:0,message:"Likes Retrieved Successfully"});
    }
    static toggleLikes(req,res){
        const postID=req.params.postId;
        const userID=req.user.id;
        const result=LikeModel.toggleStatus(userID,postID);
        if(!result){
            // return res.status(404).send({data:[],err:1,message:"Like status Toggle Failed"});
            throw new customErrorHandler(400,"Like status Toggle Failed");
        }
        return res.status(200).send({data:result,err:0,message:"Like status updated successfully"});
    }
}