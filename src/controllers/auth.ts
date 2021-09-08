import { Request, Response } from 'express';
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signUp = (req: Request, res: Response) => {
    const {
        userName,
        password,
    } = req.body;
    return User.create({
        userName,
        password
    })
        .then((user: any) => {
            const token = jwt.sign(
                {
                    id: user._id,
                    userName: user.userName
                },
                process.env.TOKEN_KEY || '',
                {
                    expiresIn: process.env.TOKEN_EXPIRY,
                }
            );
            res.status(201);
            res.json({
                token
            })
        })
        .catch(err => {
            res.status(422);
            res.json({
                errors: [err.message]
            });
        })
}

const signIn = async (req: Request, res: Response) => {
    try {
        const {
            userName,
            password,
        } = req.body;

        if (!(userName && password)) {
            res.status(400);
            res.json({
                errors: ["All input is required"]
            })
            return
        }
        const user: any = await User.findOne({ userName });

        if (user && (await bcrypt.compare(password, user.password as string))) {
            const token = jwt.sign(
                {
                    id: user._id,
                    userName: user.userName,
                    emailAddress: user.emailAddress,
                    identityNumber: user.identityNumber
                },
                process.env.TOKEN_KEY || '',
                {
                    expiresIn: process.env.TOKEN_EXPIRY,
                }
            );
            res.status(200);
            res.json({
                token
            })
            return;
        }
        res.status(400);
        res.json({
            errors: ["Invalid Credentials"]
        })
        return;
    } catch (error: any) {
        res.status(500);
        res.json({
            errors: [error.message]
        });
        return;
    }
}
export {
    signUp,
    signIn
}