import mongoose from "mongoose"
import { likeRepository } from "./like.repository.js"

export class likeController{
    constructor(){
        this.likeRepo = new likeRepository()
    }

    toggleLike = async(req, res) => {
        const userId = req._id;
        const {likeable} = req.params;
        const {like, category} = req.body;
        const likedCategory = await this.likeRepo.toggleLike(like,likeable, category, userId);

        if(likedCategory){
            res.status(200).json(likedCategory)
        }else{
            res.status(500).json("Not found")
        }
    }

    getLikes = async(req,res) => {
        const {likeable} = req.params;
        const getLikes = await this.likeRepo.getLikes(likeable)
        if(getLikes){
            res.status(200).json({getLikes, likesCount:getLikes.length})
        }else{
            res.status(500).json("Not found")
        }
    }
}