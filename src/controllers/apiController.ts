
import { Request, Response } from 'express';
import { Note } from '../models/Note';
import pusher from '../pusher';

export const updateNotepad = async (req: Request, res: Response)=> {
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
}

export const getNotepadByName = async (req: Request, res: Response) => {
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
}

export const pusherAuthorize = async (req: Request, res: Response) => {
    const socketId = req.body.socket_id
    const user_id = req.body.user_id
    const username = req.body.username
    const channelName = req.body.channel_name

    const data = {
        user_id,
        user_info: {
            id: user_id,
            username
        }
    }

    const authorizedUser = pusher.authorizeChannel(socketId, channelName, data)
   
    res.status(200).send(authorizedUser)
}

export const pusherAuthenticate = async (req: Request, res: Response)=> {
    const socketId = req.body.socket_id
    const user_id = req.body.user_id
    const username = req.body.username

    const user: any = {
        id: user_id,
        name: username,
    }

   const pusherUser = pusher.authenticateUser(socketId, user)

   return res.status(200).send(pusherUser)
}

export const getAllNotes = async (req: Request, res: Response) => {
    const notes = await Note.findAll()

    if(notes.length > 0) {
       return res.status(200).json(notes)
    }
   
    return res.status(404).json("Nenhuma nota encontrada")
}

