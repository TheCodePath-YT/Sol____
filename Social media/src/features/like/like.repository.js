import mongoose from "mongoose";
import likeModel from "./like.schema.js";
import commentModel from "../comments/comments.schema.js";
import postModel from "../posts/posts.schema.js";

export class likeRepository{
    constructor(){
        this.likeModel = likeModel;
        this.commentModel = commentModel;
        this.postModel = postModel;
    }

    async toggleLike(like,likeable, category, userId){
        const checkLike = await this.likeModel.findOne({likeable:likeable,user: userId});
        let likeId = null;
        if(!checkLike){
            const likedCategory = new this.likeModel(like,likeable, category,userId)
            await likedCategory.save()
            likeId = likedCategory;
        }else{
            const toggleLike = await this.likeModel.findOneAndUpdate(
                {likeable: likeable, user: userId},
                {$set:{like: !checkLike.like}},
                {new: true}
            )
            likeId = toggleLike;
        }

        if(category == 'Comment'){
            await this.commentModel.findOneAndUpdate(
                {_id: likeable},
                {$addToSet:{like:likeId._id}},
                {new: true}
            );
        }

        if(category == 'Post'){
            await this.postModel.findOneAndUpdate(
                {_id: likeable},
                {$addToSet:{like:likeId._id}},
                {new: true}
            );
        }

        return likeId;
        
    }

    async getLikes(likeable){
        const likesList = await this.likeModel.find({likeable:likeable,like: true});

        return likesList;
    }

}