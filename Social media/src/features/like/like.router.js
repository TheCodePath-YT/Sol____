import express from "express";
import { likeController } from "./like.controller.js";

const likeRouter  = express.Router()

const likes = new likeController()

likeRouter.use("/:id", likes.toggleLike)



export default likeRouter