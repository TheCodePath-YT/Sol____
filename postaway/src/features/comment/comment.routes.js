import express from "express";
import CommentController from "./comment.controller.js";
const CommentRouter=express.Router();
CommentRouter.get("/:id",CommentController.getComments);
CommentRouter.post("/:id",CommentController.addComment);
CommentRouter.delete("/:id",CommentController.deleteComment);
CommentRouter.put("/:id",CommentController.updateComment);
export default CommentRouter;