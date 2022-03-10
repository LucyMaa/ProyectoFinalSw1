import express from 'express'
import routes from './routes';
import {PrismaClient} from '@prisma/client'
import bodyParser from 'body-parser';
import cors from 'cors'

const init = () => {
    const app = express()
    app.use(cors({origin: '*'}))
    app.use(bodyParser.json());
    app.use(bodyParser.raw());
    app.use(bodyParser.urlencoded({extended: true}));
    const prisma = new PrismaClient()
    const PORT = 4000;
    app.use('/v1', routes(prisma))
    app.listen(PORT, () => console.log("server running on port " + PORT))
}

(() => init())()





