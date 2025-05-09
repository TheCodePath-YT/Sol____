import PostModel from "../post/post.model.js";
export default class LikeModel{
    constructor(userID,postID){
        this.id=likes.length+1;
        this.userID=userID;
        this.postID=postID;
        this.status=1;
    }
    static getAllLikes(userID,postID){
        if(!userID || !postID){
            return false;
        }
        const like=likes.find(l=>l.userID==userID&&l.postID==postID);
        if(!like){
            return false;
        }
        return like;
    }
    static addLikes(userID,postID){
        if(!userID || !postID){
            return false;
        }
        const newLike=new LikeModel(userID,postID);
        likes.push(newLike);
        return newLike;
    }
    static toggleStatus(userID,postID){
        if(!userID || !postID){
            return false;
        }
        const index=likes.findIndex(l=>l.userID==userID&&l.postID==postID);
        if(index>-1){
            likes[index].status=(likes[index].status==1)?0:1;
            return likes[index];
        }else{
            const result=PostModel.getEveryPosts().find(l=>l.userID==userID&&l.postID==postID);
            if(!result){
                return false;
            }
            const newResult=LikeModel.addLikes(userID,postID);
            if(!newResult){
                return false;
            }
            return newResult;
        }
        return false;
    }
}
const likes=[];
LikeModel.addLikes(1,4);
LikeModel.addLikes(1,1);
LikeModel.addLikes(2,2);
LikeModel.addLikes(2,3);