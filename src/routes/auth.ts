import express from "express";
import * as authController from "../controllers/auth";
const router = express.Router();

router.route('/signup')
    .post(authController.signUp);

router.route('/signin')
    .post(authController.signIn);

export {router}