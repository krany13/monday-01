import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidationsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errorsMessages: [{"message":"error", "field":"error"}] });
    }
}