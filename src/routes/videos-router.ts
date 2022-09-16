import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";
import {body, validationResult} from "express-validator";
import {inputValidationsMiddleware} from "../middlewares/input-validations-middleware";
import TypedArray = NodeJS.TypedArray;

export const videoRouter = Router({})

const titleValidations = body('title').isString().notEmpty().isLength({max: 40 })
const authorValidations = body('author').isString().notEmpty().isLength({max:20})
const availableResolutionsValidations = body('availableResolutions').isArray().notEmpty().isLength({max: 8})

videoRouter.get('/', (req: Request, res:Response) => {
    const findVideos = videosRepository.seeVideo()
    return res.status(200).send(findVideos)
})

videoRouter.get('/:id', (req: Request, res:Response) => {
    let video = videosRepository.findVideoById(+req.params.id)
    if(video) {
        return res.send(video)
    } else {
        return res.sendStatus(404)
    }
})

// videoRouter.delete('/videos', (req: Request, res:Response) => {
//     const isAllDelete = videosRepository.deleteAllVideo(req.body)
//     res.status(204).send(isAllDelete)
//     // res.send(204)
// })
//сделал
videoRouter.delete('/:id', (req: Request, res:Response) => {
    const isDeleted =  videosRepository.deleteVideoById(+req.params.id)
    if(isDeleted) {
        return res.sendStatus(204)
    } else {
        return res.sendStatus(404)
    }
})

videoRouter.post('/',
    titleValidations,
    authorValidations,
    availableResolutionsValidations,
    //TODO: добавить валидацию для разрешений
    inputValidationsMiddleware,
    (req: Request, res:Response) => {
        const newVideo = videosRepository.createVideo(req.body.title, req.body.author, req.body.availableResolutions)
        return res.status(201).send(newVideo)
    })

videoRouter.put('/:id',
    titleValidations,
    authorValidations,
    //TODO: добавить валидацию для разрешений
    //TODO: добавить валидацию для остальных входных параметров
    inputValidationsMiddleware,
    (req: Request, res:Response) => {
        const isUpdated = videosRepository.updateVideo(+req.params.id, req.body.title, req.body.author)
        if(isUpdated) {
            const video =  videosRepository.findVideoById(+req.params.id)
            return res.status(204).send(video)
        } else {
            return res.sendStatus(404)
        }
    })