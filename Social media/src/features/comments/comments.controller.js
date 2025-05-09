import mongoose from "mongoose";
import { commentsRepo } from "./comments.repository.js";

export class commentsController{

    constructor(){
        this.comments = new commentsRepo()
    }

    addComment = async(req, res) => {
        const postId = req.params.postId;
        const {comments} = req.body;
        const userId = req._id;
        const {postComment, newComment} = await this.comments.addComment(postId,userId, comments)

        if(postComment && newComment){
            res.status(200).json({postComment,newComment})
        }else{
            res.status(500).json("Comment is not added")
        }
    }

    getComments = async(req,res) => {
        const postId = req.params.postId;

        const getComments = await this.comments.getComments(postId);

        if(getComments){
            res.status(200).json(getComments)
        }else{
            res.status(500).json("Comment aren't found")
        }
    }

    deleteComment = async(req,res) => {
        const {commentId} = req.params;

        const userId = req._id;

        const deletedComment = await this.comments.deleteComment(userId,commentId);

        if(deletedComment){
            res.status(200).json(deletedComment)
        }else{
            res.status(500).json("Comment aren't found")
        }
    }

    updateComment = async(req,res) => {
        const {commentId} = req.params;
        const comment = req.body;
        const userId = req._id;
        const updatedComment = await this.comments.updateComment(userId,commentId, comment);

        if(updatedComment){
            res.status(200).json(updatedComment)
        }else{
            res.status(500).json("Comment aren't found")
        }
    }

}