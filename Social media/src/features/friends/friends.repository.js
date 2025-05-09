import mongoose from "mongoose";
import userModel from "../user/user.schema.js";

export class friendRepository{
    constructor(){
        this.userModel = userModel;
    }

    async toggleFriendship(userId,friendId){
        const checkFriend = await this.userModel.findOne({friends: friendId});
        let togglefriend = null;
        if(checkFriend){
            togglefriend = await this.userModel.findOneAndUpdate(
                {_id: userId},
                {
                    $pull:{friends: friendId}
                },
                {new: true}
            )
        }else{
            togglefriend = await this.userModel.findOneAndUpdate(
                {_id: userId},
                {
                    $addToSet: {requests: friendId}
                },
                {new: true}
            )
        }
    
        return togglefriend;
    }

    async decideOnPendingRequests(userId, friendId, intrests){

        let pendingRequestsStatus = null;

        let checkPendingStatus = await this.userModel.findOne({_id: userId, requests: friendId})

        if(intrests === true && checkPendingStatus){
            pendingRequestsStatus = await this.userModel.findOneAndUpdate(
                {_id: userId},
                {
                    $pull:{requests: friendId},
                    $addToSet:{friends: friendId}
                },
                {new: true}
            )
        }else{
            pendingRequestsStatus = await this.userModel.findOneAndUpdate(
                {_id: userId},
                {
                    $pull:{requests: friendId}
                },
                {new: true}
            )
        }

        return pendingRequestsStatus
    }

    async getPendingRequest(userId){
        const getPendingDetails = await this.userModel.findById(userId).populate({
            path: 'requests'})
        return getPendingDetails.requests;
    }

    async getFriendsList(userId){
        const lists = await this.userModel.findById(userId).populate({path: 'friends'})

        return lists;
    }
} 