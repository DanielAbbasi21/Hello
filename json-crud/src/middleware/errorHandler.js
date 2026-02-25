import http from 'http'

export const errorHandler = {}

/**
 * Default handler for 404 routes when the resource is not found.
 */
errorHandler.notFoundDefault = (req, res, next) => {
  const err = new Error(http.STATUS_CODES[404] || 'Not Found')
  err.status = 404
  err.statusDescription = http.STATUS_CODES[404]
  return next(err)
}

/**
 * Global error handler.
 */
errorHandler.errorDefault = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err.stack)
  }

  const statusCode = err.status || 500
  const message =
    process.env.NODE_ENV === 'production'
      ? 'Something went wrong'
      : err.message

  // API -> JSON
  if (req.originalUrl.startsWith('/api/v1/')) {
    let type = 'error'
    if (statusCode === 403) type = 'forbidden'
    else if (statusCode === 404) type = 'not_found'
    else if (statusCode === 401) type = 'unauthorized'
    else if (statusCode === 429) type = 'too_many_requests'

    return res.status(statusCode).json({ type, message })
  }

  // Web -> EJS
  return res.status(statusCode).render('errors/error', { error: err })
}