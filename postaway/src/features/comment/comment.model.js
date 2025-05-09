import PostModel from "../post/post.model.js";
export default class CommentModel{
    constructor(userID,postID,content){
        this.id=comments.length+1;
        this.userID=userID;
        this.postID=postID;
        this.content=content;
    }
    static getAllCommentsByPostID(postID,userID){
        if(!postID || !userID){
            return false;
        }
        const result=PostModel.getPostByID(postID,userID);
        if(result){
            return comments.find(c=>c.postID==postID&&c.userID==userID);
        }
        return false;
    }
    static addComments(data){
        if(!data ){
            return false
        }
        const newComment=new CommentModel(data.userID,data.postID,data.content);
        comments.push(newComment);
        return comments[comments.length-1];
    }
    static deleteComment(id,userID){
        if(!id){
            return false;
        }
        const index=comments.findIndex(c=>c.id==id && c.userID==userID);
        if(index>-1){
            const deletedComment=comments[index];
            comments.splice(index,1);
            return deletedComment;
        }
        return false;
    }
    static updateComment(id,data){
        if(!id || !data){
            return false;
        }
        const index=comments.findIndex(c=>c.id==id&&c.userID==data.userID);
        if(index>-1){
            comments[index]=new CommentModel(data.userID,comments[index].postID,data.content);
            comments[index].id=parseInt(id);
            return comments[index];
        }
        return false;
    }
}
const comments=[];
CommentModel.addComments({userID:1,postID:1,content:"YES!!!"});
CommentModel.addComments({userID:1,postID:4,content:"this is awesome"});
CommentModel.addComments({userID:2,postID:2,content:"No!!!"});
CommentModel.addComments({userID:2,postID:3,content:"not ok!!!"});