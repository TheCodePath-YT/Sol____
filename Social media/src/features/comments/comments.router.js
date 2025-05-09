import mongoose from "mongoose";
import express from "express"
import { commentsController } from "./comments.controller.js";
import {auth} from "../../jwt/jwt.js"

const commentController = new commentsController()

const commentsRouter = express.Router();

commentsRouter.post("/:postId",auth,commentController.addComment)
commentsRouter.get("/:postId",commentController.getComments)
commentsRouter.delete("/:commentId",auth,commentController.deleteComment)
commentsRouter.put("/:commentId",auth,commentController.updateComment)





export default commentsRouter;