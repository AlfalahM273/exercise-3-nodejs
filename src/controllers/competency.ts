import Competency from "../models/competency";
import { Request, Response } from 'express';

const index = (_: Request, res: Response) => {
    return Competency.find()
        .then((result: any) => {
            res.status(200);
            res.json(result);
        }).catch((error: any) => {
            res.status(500);
            res.json({
                errors: [error.message]
            });
        })
}

const show = (req: Request, res: Response) => {
    const id = req.params.competencyId;
    return Competency.findById(id)
        .then(competency => {
            if (competency) {
                res.status(200);
                res.json(competency);
            }
            else {
                res.status(404);
                res.json({
                    errors: ["Not Found"]
                });
            }
        })
        .catch(err => {
            res.status(500);
            res.json({
                errors: [err.message]
            });
        })
}

const create = (req: Request, res: Response) => {
    const {
        skill,
        level,
        selfClaim
    } = req.body;
    return Competency.create({
        skill,
        level,
        selfClaim
    })
        .then(competency => {
            res.status(201);
            res.json(competency);
        })
        .catch(err => {
            res.status(422);
            res.json({
                errors: [err.message]
            });
        })
}

const update = (req: Request, res: Response) => {
    const id = req.params.competencyId;
    const newdata = req.body;
    return Competency.findByIdAndUpdate(id, newdata, { runValidators: true })
        .then((result: any) => {
            if (result) {
                return Competency.findById(result._id).then(competency => {
                    res.status(200);
                    res.json(competency);
                });
            }
            else {
                res.status(404);
                res.json({
                    errors: ["Not Found"]
                });
            }
        })
        .catch(error => {
            if (error.code && error.code === 11000) {
                error.message = "";
                error.message = Object.keys(error.keyValue).join(", ")
                error.message += " already taken";
            }
            res.status(422);
            res.json({
                errors: [error.message]
            });
        })
}

const unlink = (req: Request, res: Response) => {
    const id = req.params.competencyId;
    return Competency.findByIdAndRemove(id)
        .then(_ => {
            res.status(200);
            res.json({
                message: "successfully deleted"
            });
        })
        .catch(err => {
            res.status(422);
            res.json({
                errors: [err.message]
            });
        })
}

export {
    index,
    show,
    create,
    update,
    unlink,
}