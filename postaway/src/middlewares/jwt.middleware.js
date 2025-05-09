import jwt from 'jsonwebtoken';
import { customErrorHandler } from './errorhandler.middleware.js';
export default function jwtMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        throw new customErrorHandler(401,"Unauthorized");
        // return res.status(401).send({ "data": [], "err": 1, "msg": "Unauthorized" });
    }
    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) {
        throw new customErrorHandler(403,"Forbidden");
            // return res.status(403).send({ "data": [], "err": 1, "msg": "Forbidden" });
        }
        req.user = user;
        next();
    });
}