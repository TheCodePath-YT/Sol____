import winston from "winston";
export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or higher to `error.log`
      //   (i.e., error, fatal, but not other levels)
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      //
      // - Write all logs with importance level of `info` or higher to `combined.log`
      //   (i.e., fatal, error, warn, and info, but not trace)
      //
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  export default function logInfo(req,res,next){
    let logData=new Date().toString()+" req URL:"+req.url+" req Method:"+req.method+" req Body:"+JSON.stringify(req.body);
    if(req.url!=="/api/signin" && req.url!=="/api/signup"){

      logger.info(logData);
    }
    next();
  }