import express from 'express'
import logger from 'morgan'
import { router } from './route/index.js'
import { errorHandler } from './middleware/errorHandler.js'
import helmet from "helmet"

export const app = express()

// Use the morgan logger
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev', { immediate: true }))
}

//use Helmet!
app.use(helmet())

//reduce fingerprinting

// Use the public folder for static resources
app.use(express.static('public'))

// Middleware to parse JSON data as part of the body
app.use(express.json())

// Mount the routes
app.use('/', router)

// Middleware för 404
app.use(errorHandler.notFoundDefault)

// Global felhanterare
app.use(errorHandler.errorDefault)
