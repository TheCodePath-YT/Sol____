import mongoose from "mongoose";
import commentModel from "./comments.schema.js";
import {postSchema} from '../posts/posts.schema.js'

export class commentsRepo{
    constructor(){
        this.commentModel = commentModel;
        this.postModel = mongoose.model('posts', postSchema)
    }

    async addComment(postId,userId,comment){

        const newComment = new this.commentModel({comment,postId,userId})
        await newComment.save();

        const postComment = await this.postModel.findByIdAndUpdate(
            postId,
            {$addToSet:{comments: newComment._id}},
            {new: true}
        )
        
        return {postComment, newComment}
    }

    async getComments(postId){
        const getComments = await this.postModel.findById(postId).select('comments').populate('comments');
        console.log(getComments)
        return getComments.comments;
    }

    async deleteComment(userId,commentId){
        const deletedComment = await this.commentModel.findOneAndDelete(
            {
                _id:commentId,
                userId:userId
            }
        );

        return deletedComment._id;
    }

    async updateComment(userId,commentId,comment){
        const updatedComment = await this.commentModel.findOneAndUpdate(
            {_id:commentId, userId:userId},
            {$set: comment},
            {new: true}
        )
        return updatedComment;
    }
}
