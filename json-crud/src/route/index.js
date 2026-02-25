import express from 'express'
import { router as adminRoute } from './adminRoute.js'
import { router as apikeyRoute } from './apikeyRoute.js'
import { router as authenticateRoute } from './authenticateRoute.js'
import { router as crudRoute } from './crudRoute.js'
import { router as guessRoute } from './guessRoute.js'
import { router as jwtRoute } from './jwtRoute.js'
import { router as usersRoute } from './usersRoute.js'
import { router as utilsRoute } from './utilsRoute.js'
import { router as tasksRoute } from './tasks.js'
import { router as fridayRouter } from './fridayRoute.js'
import { router as tasksCrudRouter } from './tasksCrudRoute.js'


export const router = express.Router()

router.use('/admin', adminRoute)
router.use('/user', authenticateRoute)
router.use('/crud', crudRoute)
router.use('/guess', guessRoute)
router.use('/utils', utilsRoute)

router.use('/api/v1', apikeyRoute)
router.use('/api/v1', jwtRoute)
router.use('/api/v1', usersRoute)
router.use('/api/v1', tasksRoute)

router.use('/friday', fridayRouter)

router.use('/crud/tasks', tasksCrudRouter)

