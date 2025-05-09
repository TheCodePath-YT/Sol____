import CommentModel from "./comment.model.js";
import { customErrorHandler } from "../../middlewares/errorhandler.middleware.js";
export default class CommentController{
    static getComments(req,res){
        const postID=req.params.id;
        const userID=req.user.id;
        const content=req.body.content;
        const result=CommentModel.getAllCommentsByPostID(postID,userID);
        if(!result){
            // res.status(404).send({data:[],message:"No Comments Found",err:1});
            throw new customErrorHandler(400,"No Comments Found");
        }
        res.status(200).send({data:result,message:"Comments Retrieved Successfully",err:0})
    }
    static addComment(req,res){
        const postID=req.params.id;
        const userID=req.user.id;
        const content=req.body.content;
        const result=CommentModel.addComments({postID:postID,userID:userID,content:content});
        if(!result){
            throw new customErrorHandler(400,"Comment was not added");
            // res.status(404).send({data:[],err:1,message:"Comment was not added"});
        }
        res.status(201).send({data:result,err:0,message:"Comment added Successfully"});
    }
    static deleteComment(req,res){
        const commentID=req.params.id;
        const userID=req.user.id;
        const result=CommentModel.deleteComment(commentID,userID);
        if(!result){
            throw new customErrorHandler(400,"Comment was not deleted");
            // res.status(404).send({data:[],err:1,message:"Comment was not deleted"});
        }else{
            res.status(200).send({data:result,err:0,message:"Comment deleted Successfully"});
        }
    }
    static updateComment(req,res){
        const commentID=req.params.id;
        const userID=req.user.id;
        const content=req.body.content;
        const result=CommentModel.updateComment(commentID,{userID:userID,content:content});
        if(!result){
            throw new customErrorHandler(400,"Comment update failed");
            // res.status(404).send({data:[],err:1,message:"Comment update failed"});
        }
        res.status(200).send({data:result,err:0,message:"Comment Updated Successfully"});
    }
}