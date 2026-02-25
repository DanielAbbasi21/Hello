import http from 'http'
import { apikey } from '../model/apikey.js'

export const controller = {}

/**
 * List all the API keys.
 */
controller.list = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(apikey.get(), null, 2))
}

/**
 * Verify that the API key exists in the query string.
 */
controller.verifyQueryString = (req, res, next) => {
  const aKey = req.query.API_KEY || null

  if (!apikey.verifyKey(aKey)) {
    const err = new Error('You have not supplied a valid API key!')
    err.status = 403
    err.statusDescription = http.STATUS_CODES[err.status]
    return next(err)
  }

  if (!apikey.verifyRate(aKey)) {
    const err = new Error('You have reached your usage rate!')
    err.status = 429
    err.statusDescription = http.STATUS_CODES[err.status]
    return next(err)
  }

  return res.status(200).json({
    message: 'YES. You supplied a valid key through the query string!'
  })
}

/**
 * Verify that the API key exists in the header.
 */
controller.verifyHeader = (req, res, next) => {
  const aKey = req.header('Authorization') || null

  if (!apikey.verifyKey(aKey)) {
    const err = new Error('You have not supplied a valid API key!')
    err.status = 403
    err.statusDescription = http.STATUS_CODES[err.status]
    return next(err)
  }

  if (!apikey.verifyRate(aKey)) {
    const err = new Error('You have reached your usage rate!')
    err.status = 429
    err.statusDescription = http.STATUS_CODES[err.status]
    return next(err)
  }

  return res.json({
    message: 'YES. You supplied a valid key through the header!'
  })
}

/**
 * Verify that the API key exists in the body.
 */
controller.verifyBody = (req, res, next) => {
  const aKey = req.body?.authorization || null

  if (!apikey.verifyKey(aKey)) {
    const err = new Error('You have not supplied a valid API key!')
    err.status = 403
    err.statusDescription = http.STATUS_CODES[err.status]
    return next(err)
  }

  if (!apikey.verifyRate(aKey)) {
    const err = new Error('You have reached your usage rate!')
    err.status = 429
    err.statusDescription = http.STATUS_CODES[err.status]
    return next(err)
  }

  return res.json({
    message: 'YES. You supplied a valid key through the body!'
  })
}

/**
 * Provide a magic answer.
 */
controller.magicAnswer = (req, res) => {
  return res.json({
    message: 'YES. The magic answer is 42!'
  })
}