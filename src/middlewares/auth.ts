import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

const getToken = (authorization?: string) => {
    const toRemove = 'bearer ';
    if (!authorization) return null;
    return authorization.slice(toRemove.length);
}

interface JwtReq extends Request {
    user: any
}

const auth = (req: JwtReq, res: Response, next: NextFunction) => {
    const token = getToken(req.get('authorization'));

    if (!token) {
        return res.status(403).json({
            errors: ["A token is required for authentication"]
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY || '');
        req.user = decoded;
        next();
    } catch (err) {
        if (err) {
            res.status(401);
            res.json({
                errors: ['please re-login']
            });
            return;
        }
    }
}

export { auth };
