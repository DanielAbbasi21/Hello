import express from 'express'
import { router as usersRoute } from './usersRoute.js'
import { router as apikeyRoute } from './apikeyRoute.js'


export const router = express.Router()

router.use('/api/v1', usersRoute)
router.use('/api/v1', apikeyRoute)

