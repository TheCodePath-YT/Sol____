import PostModel from "./post.model.js";
import { customErrorHandler } from "../../middlewares/errorhandler.middleware.js";
export default class PostController {
    static createPost(req, res) {
        const {caption } = req.body;
        const image=`${req.headers.host}/uploads/${req.file.filename}`;
        const userID = req.user.id;
        if (!userID || !caption || !image) {
            // return res.status(400).json({
            //     message: "All fields are required",
            //     err:1,
            //     data:[]
            // });
            throw new customErrorHandler(400,"All fields are required");

        }
        const post = {userID, caption, image};
        const newPost=PostModel.addPost(post);
        res.status(201).json({
            message: "Post created successfully",
            data:newPost,
            err:0
        });
    }

    static getAllPosts(req, res) {
        const posts = PostModel.getEveryPosts();
        res.status(200).json({
            message: "Posts retrieved successfully",
            data:posts,
            err:0
        });
    }
    static getPostByUserID(req,res){
        const userID=req.user.id;
        const result=PostModel.getPostsByUserID(userID);
        res.status(200).send({
            message: "Posts retrieved successfully",
            data:result,
            err:0
        });
    }
    static getSpecificPosts(req, res) {
        const postID=req.params.id;
        const userID=req.user.id;
        const post = PostModel.getPostByID(postID,userID);
        if(!post){
            // return res.status(404).json({
            //     message: "Post not found",
            //     data:[],
            //     err:1
            // });
            throw new customErrorHandler(400,"Post not found");
        }else{
            res.status(200).json({
                message: "Post retrieved successfully",
                data:post,
                err:0
            });
        }
    }
    static deletePost(req,res){
        const postID=req.params.id;
        const result=PostModel.deletePost(postID);
        if(!result){
            // return res.status(404).json({
            //     message: "Post not found",
            //     data:[],
            //     err:1
            // });
            throw new customErrorHandler(400,"Post not found");
        }else{
            res.status(200).json({
                message: "Post deleted successfully",
                data:result,
                err:0
            });
        }
    }
    static updatePosts(req,res){
        const postID=req.params.id;
        const userID=req.user.id;
        const caption=req.body.caption;
        const image=`${req.headers.host}/uploads/${req.file.filename}`;
        const result=PostModel.updatePostByID(postID,{userID,caption,image});
        if(!result){
            // res.status(404).send({
            //     message: "Post not found",
            //     data:[],
            //     err:1
            // });
            throw new customErrorHandler(400,"Post not found");
        }else{
            res.status(200).send({
                message: "Post updated successfully",
                data:result,
                err:0
            });
        }
    }
}
