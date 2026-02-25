import express from 'express'
import controller from '../controller/AuthenticateController.js'
import { auth } from '../middleware/authenticationMiddleware.js'

export const router = express.Router()

router.get('/login', controller.login)
router.post('/login', controller.loginPost)
router.get('/profile', auth.isAuthenticatedOrRedirectLogin, controller.profile)

router.get('/logout', controller.logout)

router.get('/register', controller.register)
router.post('/register', controller.registerPost)
// router.get('/', controller.XXX)
