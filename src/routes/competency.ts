import express from "express";
import * as competencyController from "../controllers/competency";
const router = express.Router();

router.route('/')
    .get(competencyController.index)
    .post(competencyController.create);

router.route('/:competencyId')
    .get(competencyController.show)
    .patch(competencyController.update)
    .delete(competencyController.unlink);
export {router}