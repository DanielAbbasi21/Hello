import express from 'express'
import { fridayController } from '../controller/FridayController.js'

export const router = express.Router()

// GET /friday
router.get('/', fridayController.show)