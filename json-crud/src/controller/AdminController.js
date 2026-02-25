import usersModel from '../model/UsersModel.js'

/**
 * Controller to perform administrative tasks.
 *
 * @class
 */
class AdminController {
  /**
   * Show all the users.
   *
   * @param req
   * @param res
   * @async
   */
  async viewAllUsers (req, res) {
    const data = {
      'users': await usersModel.getAllUsers()
    }
    res.render('admin/view_all', data)
  }
}

export default new AdminController()

