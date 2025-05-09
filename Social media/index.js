import express from "express";
import cookieParser from "cookie-parser";

import userRouter from './src/features/user/user.router.js'
import postsRouter from "./src/features/posts/posts.router.js";
import commentsRouter from "./src/features/comments/comments.router.js";
import likeRouter from "./src/features/like/like.router.js";
import friendRouter from "./src/features/friends/friends.router.js";
import otpRouter from "./src/features/otp/otp.router.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json())
app.use(cookieParser())

app.use('/api/users', userRouter)
app.use('/api/posts', postsRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/likes', likeRouter)
app.use('/api/friends', friendRouter)
app.use('/api/otp', otpRouter)

export default app;
