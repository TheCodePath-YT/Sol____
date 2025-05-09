import express from "express"
import {upload} from "../../../public/uploads/upload.js"
import { postsController } from "./posts.controller.js";
import { auth } from "../../jwt/jwt.js";

const posts = new postsController()

const postsRouter = express.Router();

postsRouter.get('/all',auth, posts.getAllPosts)
postsRouter.post('/',auth, upload.single('image') ,posts.createPosts)
postsRouter.get('/',auth, upload.single('image') ,posts.getAllPostsOfUser)

postsRouter.get('/:postId',auth, posts.getSpecificPost)
postsRouter.delete('/:postId',auth, posts.deleteSpecificPost)
postsRouter.put('/:postId',auth, posts.updateSpecificPost)



export default postsRouter