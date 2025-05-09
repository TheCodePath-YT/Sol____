import {customErrorHandler} from "./errorhandler.middleware.js";
export const invalidRoutesHandlerMiddleware=(req,res,next)=>{
    throw new customErrorHandler(404,"invalid path "+req.originalUrl);
    next();
}