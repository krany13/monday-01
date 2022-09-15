import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";
import {body, validationResult} from "express-validator";
import {inputValidationsMiddleware} from "../middlewares/input-validations-middleware";
import TypedArray = NodeJS.TypedArray;

export const videoRouter = Router({})

const titleValidations = body('title').isLength({max: 40 })
const authorValidations = body('author').isLength({max:20})

videoRouter.get('/', (req: Request, res:Response) => {
    const findVideos = videosRepository.seeVideo()
    res.status(200).send(findVideos)
})

videoRouter.get('/:id', (req: Request, res:Response) => {
    let video = videosRepository.findVideoById(+req.params.id)
    if(video) {
        res.status(201).send(video["id"])
    } else {
        res.send(404)
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
        res.send(204)
    } else {
        res.send(404)
    }
})

videoRouter.post('/',
    titleValidations,
    authorValidations,
    inputValidationsMiddleware,
    (req: Request, res:Response) => {
        const newVideo = videosRepository.createVideo(req.body.title, req.body.author, req.body.availableResolutions)
        res.status(201).send(newVideo)
    })

videoRouter.put('/:id',
    titleValidations,
    authorValidations,
    inputValidationsMiddleware,
    (req: Request, res:Response) => {
        const isUpdated = videosRepository.updateVideo(+req.params.id, req.body.title, req.body.author)
        if(isUpdated) {
            const video =  videosRepository.findVideoById(+req.params.id)
            res.send(video)
        } else {
            res.send(404)
        }
    })