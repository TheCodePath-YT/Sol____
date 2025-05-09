import express from 'express';
import bodyParser from 'body-parser';
import path from "path";
import jwtMiddleware from './src/middlewares/jwt.middleware.js';
import {errorHandlerMiddleware} from "./src/middlewares/errorhandler.middleware.js";
import {invalidRoutesHandlerMiddleware} from "./src/middlewares/invalidpath.middleware.js";
import logInfo from "./src/middlewares/logger.middlware.js";
import UserRouter from './src/features/user/user.routes.js';
import PostRouter from './src/features/post/post.routes.js';
import CommentRouter from './src/features/comment/comment.routes.js';
import LikeRouter from './src/features/like/like.routes.js';
const app = express();
app.use(bodyParser.json());
app.use(logInfo);


app.get('/', (req, res) => {
    res.send('Hello World');
    }
);
app.use('/uploads', express.static(path.resolve('uploads')));
app.use("/api",UserRouter);
app.use("/api/posts",jwtMiddleware,PostRouter);
app.use("/api/comments",jwtMiddleware,CommentRouter);
app.use("/api/likes",jwtMiddleware,LikeRouter);
// Catch-all route for handling "API Not Found"
app.use(invalidRoutesHandlerMiddleware);
app.use(errorHandlerMiddleware);
export default app;