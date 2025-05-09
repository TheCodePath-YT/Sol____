
import mongoose from "mongoose";
import postModel from "./posts.schema.js";

export class postsRepository{
    constructor(){
        this.postModel = postModel;
    }

    async createPosts(newPostDetails){
        const newPost = new this.postModel(newPostDetails);
        return await newPost.save()
    }

    async getAllPosts(){
        const getPosts = await this.postModel.find();
        return getPosts
    }

    async getSpecificPost(id){
        const specificPost = await this.postModel.findById(id);
        return specificPost;
    }

    async getAllUserPosts(user){
        const userPosts = await this.postModel.find({user});
        return userPosts;
    }

    async deleteSpecificPost(id){
        const deletedPost = await this.postModel.findByIdAndDelete(id);
        return deletedPost._id;
    }

    async updateSpecificPost(id,updatedFields){
        const updatedPost = await this.postModel.findByIdAndUpdate(
            id,
            {$set: updatedFields},
            {new: true}
        )
        
        return updatedPost
    }
}