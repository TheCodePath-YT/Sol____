
import { postsRepository } from "./posts.repository.js";

export class postsController{

        constructor(){
            this.posts = new postsRepository()
        }

        createPosts = async(req,res) =>{
            const {title, text} = req.body;
            const image = req.file ? req.file.path : null;
            const userId = req.user._id;

            const newPostDetails = {title, text,image:image,user:userId}
            const newPost = await this.posts.createPosts(newPostDetails)

            if(newPost){
                res.status(200).json(newPost)
            }

        }
    
        getAllPosts = async(req, res) => {
            const posts = await this.posts.getAllPosts()

            if(posts){
                res.status(200).json(posts)
            }else{
                res.status(500).json("Posts not found")
            }
        }

        getSpecificPost = async(req,res) => {
            const postId = req.params.postId;
           
            const specificPost = await this.posts.getSpecificPost(postId)

            if(specificPost){
                res.status(200).json(specificPost)
            }else{
                res.status(500).json("Post not found")
            }
        }

        getAllPostsOfUser = async(req,res) => {
            const id = req._id;

            const usersPosts = await this.posts.getAllUserPosts(id);

            if(usersPosts){
                res.status(200).json(usersPosts)
            }else{
                res.status(500).json("Post not found")
            }
        }

        deleteSpecificPost = async(req,res) => {
            const id = req.params.postId;
            const deletedPost = await this.posts.deleteSpecificPost(id)

            if(deletedPost){
                res.status(200).json(deletedPost)
            }else{
                res.status(500).json("Post not found")
            }
        }

        updateSpecificPost = async(req,res) => {
            const id = req.params.postId;
            const updatedFields = req.body;

           

            const updatedPost = await this.posts.updateSpecificPost(id,updatedFields);

            if(updatedPost){
                res.status(200).json(updatedPost)
            }else{
                res.status(500).json("Post not found")
            }
        }
}