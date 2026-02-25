const middleware = {}
export { middleware as auth }

/**
 * Check if user is authenticated or redirect to login.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {object} next Express next object.
 */
middleware.isAuthenticatedOrRedirectLogin = (req, res, next) => {
  const username = req.session?.authenticated?.username

  if (!username) {
    req.session.flashMessage = 'You need to authenticate to  access the resource!'
    return res.redirect('./login')
  }
  next()
}

/**
 * Check if user is authenticated and role is admin.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {object} next Express next object.
 */
middleware.hasRoleAdminOrForbidden = (req, res, next) => {
  const role = req.session?.authenticated?.role

  if (role !== 'admin') {
    const error = new Error('You need to have role=admin to access this resource!')
    error.status = 403
    throw error
  }
  next()
}

