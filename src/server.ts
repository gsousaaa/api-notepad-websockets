import express, { Request, Response } from 'express';
import dotenv from 'dotenv';


dotenv.config()

const server = express()

server.use(express.urlencoded({ extended: false }))
server.use(express.json())

server.post('/api-update-notepad', (req: Request, res: Response)=> {})

server.listen(process.env.PORT, ()=> {
    console.log(`Server rodando na porta ${process.env.PORT}`)
})

