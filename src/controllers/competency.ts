import Competency, { ICompetency } from "../models/competency";
import { Request, Response } from 'express';
import fsPromises from 'fs/promises';

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

const attachEvidence = async (req: any, res: Response) => {
    try {
        if (!(req.files && req.files.image)) {
            res.status(422).json({
                errors: ["No Image File"]
            });
            return;
        } else {
            const id = req.params.competencyId;
            return Competency.findById(id)
                .then(competency => {
                    if (competency) {
                        const oldImageUrl = competency?.evidenceImgUrl;
                        const allowedFileNames = ['jpg', 'png', 'JPG', 'PNG', 'JPEG', 'jpeg']
                        const fileExt = req.files.image.name.split('.')[1];
                        if (!allowedFileNames.includes(fileExt)) {
                            res.status(422);
                            res.json({
                                errors: ["This Filetype is Not Allowed"]
                            });
                            return;
                        }
                        // Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
                        const image = req.files.image;
                        const filedir = './public';
                        const filepath = '/images/';
                        const filename = filepath + Date.now() + "." + image.name.split('.')[1];
                        // Use the mv() method to place the file in upload directory (i.e. "uploads")
                        image.mv(filedir + filename);
                        fsPromises.unlink(filedir + oldImageUrl)
                            .then()
                            .catch(error => {
                                console.log(error.message)
                            });

                        return Competency.findOneAndUpdate({ _id: req.params.competencyId }, { evidenceImgUrl: filename }, { runValidators: true })
                            .then((_) => {
                                res.status(201);
                                res.json({
                                    message: 'successfully upload evidence'
                                })
                            })
                            .catch(error => {
                                res.status(422);
                                res.json({
                                    errors: [error.message]
                                });
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
                    res.status(500);
                    res.json({
                        errors: [error.message]
                    });
                })
        }
    } catch (error: any) {
        res.status(500).json({
            errors: [error.message]
        });
        return;
    }
}

export {
    index,
    show,
    create,
    update,
    unlink,
    attachEvidence
}