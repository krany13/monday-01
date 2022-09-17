import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";
import {body, validationResult} from "express-validator";
import {inputValidationsMiddleware} from "../middlewares/input-validations-middleware";

export const videoRouter = Router({})

const stdResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']

const titleValidations = body('title').isString().notEmpty().isLength({max: 40})
const authorValidations = body('author').isString().notEmpty().isLength({max: 20})
const availableResolutionsValidations = body('availableResolutions').isArray().isLength({max: 8}).custom((array) => {
    for (let i=0; i< array.length; i++) {
        const value = array[i]
        const isIn = stdResolutions.includes(value)
        if (!isIn) return false
    }
    return true
})
const canBeDownloadedValidations = body('canBeDownloaded').isBoolean()
const minAgeRestrictionValidations = body('minAgeRestriction').isInt({min: 1, max:18})
const publicationDateValidations = body('publicationDate').isString().notEmpty()

videoRouter.get('/', (req: Request, res: Response) => {
    const findVideos = videosRepository.seeVideo()
    return res.status(200).send(findVideos)
})

videoRouter.get('/:id', (req: Request, res: Response) => {
    let video = videosRepository.findVideoById(+req.params.id)
    if (video) {
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
videoRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = videosRepository.deleteVideoById(+req.params.id)
    if (isDeleted) {
        return res.sendStatus(204)
    } else {
        return res.sendStatus(404)
    }
})

videoRouter.post('/',
    titleValidations,
    authorValidations,
    availableResolutionsValidations,
    inputValidationsMiddleware,
    (req: Request, res: Response) => {
        const newVideo = videosRepository.createVideo(req.body.title, req.body.author, req.body.availableResolutions)
        return res.status(201).send(newVideo)
    })

videoRouter.put('/:id',
    titleValidations,
    authorValidations,
    availableResolutionsValidations,
    canBeDownloadedValidations,
    minAgeRestrictionValidations,
    publicationDateValidations,
    inputValidationsMiddleware,
    (req: Request, res: Response) => {
        const isUpdated = videosRepository.updateVideo(+req.params.id, req.body.title, req.body.author)
        if (isUpdated) {
            const video = videosRepository.findVideoById(+req.params.id)
            return res.status(204).send(video)
        } else {
            return res.sendStatus(404)
        }
    })