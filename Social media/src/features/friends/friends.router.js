import express from "express";
import { friendsController } from "./friends.controller.js";
import { auth } from "../../jwt/jwt.js";

const friendRouter = express.Router();

const friends = new friendsController()


friendRouter.post('/toggle-friendship/:friendId',auth, friends.toggleFriendship)
friendRouter.post('/response-to-request/:friendId', auth, friends.decideOnPendingRequests)
friendRouter.get('/get-pending-requests', auth, friends.getPendingRequest)
friendRouter.get('/get-friends/:userId', auth, friends.getFriendsList)


export default friendRouter;