import express, {Request, Response} from "express";
import {videoRouter} from "./routes/videos-router";
import {testingRouter} from "./routes/testing-router";

const app = express()

const port = process.env.PORT || 3001

const parserMiddleware = express.json()
app.use(parserMiddleware)

app.use('/videos', videoRouter)

app.use('/testing', testingRouter)

app.listen(port, () => {
    console.log(`Example app listening on port : ${port}`)
})