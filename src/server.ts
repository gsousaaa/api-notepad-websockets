import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Note } from './models/Note';
import pusher from './pusher';

dotenv.config()

const server = express()

server.use(cors())

server.use(express.urlencoded({ extended: false }))
server.use(express.json())

server.post
server.post('/api-update-notepad', async (req: Request, res: Response)=> {
    const { noteName, noteContent, userID } = req.body
    
    const noteObj = {
        content: noteContent,
        userID
    }
    
    pusher.trigger(noteName, 'updated-note', noteObj)

    // Verifica se já existe uma nota com o nome fornecido
    const existingNote = await Note.findOne({ where: { noteName } })

    if(existingNote) {
        // Se a nota já existir, atualiza o conteúdo
        await Note.update(
             { noteContent, userID } , // Novo conteúdo da nota
            { where: { noteName } } // Condição para selecionar a nota a ser atualizada
        )
        return res.status(200).json('Nota alterada com sucesso.')
    } else {
        // Se a nota não existir, cria uma nova nota
        await Note.create({ noteName, noteContent, userID })
        return res.status(201).json('Nota criada com sucesso.')
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

