import express from "express";
import LikeController from "./like.controller.js";
const LikeRouter=express.Router();
LikeRouter.get("/:postId",LikeController.retrieveAllLikes);
LikeRouter.get("/toggle/:postId",LikeController.toggleLikes);
export default LikeRouter;