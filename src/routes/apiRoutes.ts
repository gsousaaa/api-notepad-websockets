import { Router } from "express";
import * as apiController from '../controllers/apiController'

const router = Router()

router.post('/api-update-notepad', apiController.updateNotepad)

router.get('/api/get-notepad/:noteName', apiController.getNotepadByName)

router.post('/pusher/authorize', apiController.pusherAuthorize)

router.post('/pusher/authenticate', apiController.pusherAuthenticate)

// rota para selecionar todas as notas(Extra)
router.get('/api/get-allnotes', apiController.getAllNotes)

export default router
