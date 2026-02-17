import express from 'express'
import { router as usersRoute } from './usersRoute.js'
import { router as apikeyRoute } from './apikeyRoute.js'
import { router as jwtRoute } from './jwtRoute.js'


export const router = express.Router()

router.use('/api/v1', usersRoute)
router.use('/api/v1', apikeyRoute)
router.use('/api/v1', jwtRoute)

