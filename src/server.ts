import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Note } from './models/Note';



dotenv.config()

const server = express()

server.use(express.urlencoded({ extended: false }))
server.use(express.json())


server.post('/api-update-notepad', async (req: Request, res: Response)=> {
    const { noteName, noteContent } = req.body
    
    try {
        let newNote = await Note.create({ noteName, noteContent })
        return res.status(201).json('Nota criada com sucesso.')
    } catch(error) {
         return res.status(404).json(error)
    }
})

server.get('/api/get-notepad/:noteName', async (req: Request, res: Response) => {
    const { noteName } = req.params
    const note = await Note.findOne({
        where: {
            noteName
        }
    })

    if(note) {
        return res.status(200).json(note)
    }
   
    return res.status(404).json("Nota não encontrada")
})


server.listen(process.env.PORT, ()=> {
    console.log(`Server rodando na porta ${process.env.PORT}`)
})

