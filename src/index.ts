import express, {Request, Response} from "express";
import bodyParser from 'body-parser'
import {videoRouter} from "./routes/videos-router";

const app = express()

const port = process.env.PORT || 3001

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/videos', videoRouter)

app.listen(port, () => {
    console.log(`Example app listening on port : ${port}`)
})