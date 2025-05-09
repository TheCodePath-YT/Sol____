export default class PostModel {
    constructor(userID,caption, image) {
        this.userID = userID;
        this.caption = caption;
        this.image = image;
        this.id=posts.length+1;
    }
    static addPost(post) {
        post = new PostModel(post.userID, post.caption, post.image);
        posts.push(post);
        return post;
    }
    static getEveryPosts(){
        return posts;
    }
    static getPostsByUserID(userID) {
        return posts.filter(post => post.userID === userID);
    }
    static getPostByID(id,userID) {
        return posts.find(post => post.id == id && post.userID == userID);
    }
    static deletePost(id){
        const index=posts.findIndex(post=>post.id==id);
        const deletedPost=posts[index];
        if(index>-1){
            posts.splice(index,1);
            return deletedPost;
        }else{
            return false;
        }
    }
    static updatePostByID(id,data){
        const index=posts.findIndex(post=>post.id==id);
        if(index>-1 && data){
            posts[index]=new PostModel(data.userID,data.caption,data.image);
            posts[index].id=parseInt(id);
            return posts[index];
        }else{
            return false;
        }
    }
}
const posts=[];
PostModel.addPost(new PostModel(1,"Hello World","https://picsum.photos/200/300"));
PostModel.addPost(new PostModel(2,"this is Hello World","https://picsum.photos/200/300"));
PostModel.addPost(new PostModel(2,"cheers Hello World","https://picsum.photos/200"));
PostModel.addPost(new PostModel(1,"Lets Hello World","https://picsum.photos/200"));