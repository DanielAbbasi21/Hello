import express from 'express'
import tasksWebController from '../controller/TasksWebController.js'

export const router = express.Router()

router.get('/', tasksWebController.index)
router.get('/create', tasksWebController.createForm)
router.post('/create', tasksWebController.create)

router.get('/:id', tasksWebController.show)

router.get('/:id/edit', tasksWebController.editForm)
router.post('/:id/edit', tasksWebController.update)

router.post('/:id/delete', tasksWebController.delete)