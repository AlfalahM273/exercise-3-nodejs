import express from "express";
import * as competencyController from "../controllers/competency";
import { RequestHandler } from 'express';
const router = express.Router();

import { auth as jwtAuth } from '../middlewares/auth'

router.use([
    jwtAuth as RequestHandler
]);

router.route('/')
    .get(competencyController.index)
    .post(competencyController.create);

router.route('/:competencyId')
    .get(competencyController.show)
    .patch(competencyController.update)
    .delete(competencyController.unlink);

router.route('/evidence/:competencyId')
    .post(competencyController.attachEvidence);
export { router }