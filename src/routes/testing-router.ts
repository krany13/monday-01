import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";
import {body, validationResult} from "express-validator";
import {inputValidationsMiddleware} from "../middlewares/input-validations-middleware";
import TypedArray = NodeJS.TypedArray;

export const testingRouter = Router({})


testingRouter.delete('/all-data', (req: Request, res:Response) => {
    const isAllDelete = videosRepository.deleteAllVideo()
    res.sendStatus(204)
})
