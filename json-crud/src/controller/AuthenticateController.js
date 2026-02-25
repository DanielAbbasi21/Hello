import usersModel from '../model/UsersModel.js'

/**
 * Controller to perform authentication.
 *
 * @class
 */
class AuthenticateController {
  /**
   * Show the login form.
   *
   * @param req
   * @param res
   * @async
   */
  login (req, res) {
    res.render('authenticate/login')
  }

  /**
   * Perform a login and save user in session.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   */
  async loginPost (req, res) {
    const username = req.body.username
    const password = req.body.password
    let user

    try {
      user = await usersModel.checkUserAndPassword(username, password)
    } catch (err) {
      req.session.flashMessage = 'Wrong user or password!'
      return res.redirect('./login')
    }

    req.session.flashMessage = `Welcome '${user.username}'`
    req.session.authenticated = user
    res.redirect('./profile')
  }

  /**
   * Logout the user.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   */
  async logout (req, res) {
    delete req.session.authenticated
    req.session.flashMessage = 'User is logged out!'
    res.redirect('./login')
  }

  /**
   * Show details on the authenticated user.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   */
  async profile (req, res) {
    const username = res.locals?.authenticated?.username
    let user

    try {
      user = await usersModel.getUser(username)
    } catch (err) {
      req.session.flashMessage = 'Error! This user does not exists!'
    }

      console.log(user)
    res.render('authenticate/profile', {
      user
    })
  }

  register (req, res) {
  res.render('authenticate/create')
}

  async registerPost (req, res) {
    const { username, email, password, passwordAgain } = req.body

    // ✅ KRAVET: verifiera innan skapande
    if (password !== passwordAgain) {
      req.session.flashMessage = 'Passwords did not match!'
      return res.redirect('/user/register') // eller '/register' beroende på din mount
    }

    // ✅ Skapa användaren först NÄR de matchar
    try {
      await usersModel.addUser(username, password, email)
      req.session.flashMessage = 'User created!'
      return res.redirect('/user/login') // eller '/login'
    } catch (err) {
      console.error(err)
      req.session.flashMessage = 'Could not create user.'
      return res.redirect('/user/register') // eller '/register'
    }
  }
}

export default new AuthenticateController()
