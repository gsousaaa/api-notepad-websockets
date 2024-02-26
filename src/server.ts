import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/apiRoutes';

dotenv.config()

const server = express()

server.use(cors())

server.use(express.urlencoded({ extended: false }))
server.use(express.json())

server.use(routes)

server.listen(process.env.PORT, ()=> {
    console.log(`Server rodando na porta ${process.env.PORT}`)
})

