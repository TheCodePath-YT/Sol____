import {logger} from "./logger.middlware.js";
export class customErrorHandler{
    constructor(statusCode,message){
        this.message=message;
        this.statusCode=statusCode;
    }
}
export const errorHandlerMiddleware=(err,req,res,next)=>{
    let message=`TimeStamp: ${new Date().toString()} req URL: ${req.url} error msg: ${(!err.message)?"Oops! Something went wrong... Please try again later!":err.message}`;
    logger.error(message);
    
    if (err instanceof customErrorHandler) {
        res.status(err.statusCode).send({data:[],err:1,message:err.message});
      }
      if (err) {
        res.status(500).send({data:[],err:1,message:"Oops! Something went wrong... Please try again later!"});
      }
      next();
}