import mongoose from "mongoose";
import { friendRepository } from "./friends.repository.js";

export class friendsController{
    constructor(){
        this.friendRepo = new friendRepository()
    }

    toggleFriendship = async(req,res) =>{
        const userId = req._id;
        const {friendId} = req.params;

        const togglefriend = await this.friendRepo.toggleFriendship(userId,friendId);

        if(togglefriend){
            res.status(200).json({togglefriend})
        }else{
            res.status(500).json("Not found")
        }
    }

    decideOnPendingRequests = async(req,res) =>{
        const userId = req._id;
        const {friendId} = req.params;
        const {intrests} = req.body;
        const decideOnRequests = await this.friendRepo.decideOnPendingRequests(userId,friendId, intrests)
        if(decideOnRequests){
            res.status(200).json({decideOnRequests})
        }else{
            res.status(500).json("Not found")
        }
    }

    getPendingRequest = async(req,res) => {
        const userId = req._id;
        const pendingDetails = await this.friendRepo.getPendingRequest(userId);
        if(pendingDetails){
            res.status(200).json({pendingDetails})
        }else{
            res.status(500).json("Not found")
        }
    }

    getFriendsList = async(req,res) => {
        const userId = req._id;
        const getFriendsList = await this.friendRepo.getFriendsList(userId);
        if(getFriendsList){
            res.status(200).json({getFriendsList})
        }else{
            res.status(500).json("Not found")
        }
    }
}