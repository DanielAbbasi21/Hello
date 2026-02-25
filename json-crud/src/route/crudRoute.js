import express from 'express'
import controller from '../controller/UsersController.js'

export const router = express.Router()

/*
router.get('/', controller.list)
router.get('/id/:itemId', controller.show)

// C create new item into the database
router.get('/create', controller.createForm)
router.post('/create', controller.createSave)

// U update an existing item in the database
router.get('/update/:itemId', controller.updateForm)
router.post('/update', controller.updateSave)

// D delete item from database
router.get('/delete', controller.deleteFormSelect)
router.get('/delete/:itemId', controller.deleteForm)
router.post('/delete', controller.deleteSave)
*/

// Verify the parameter
router.param('id', controller.verifyUserId)

// C to create a new user in the database
router.get('/users/create', controller.createUser)
router.post('/users/create', controller.createUserPost)

// Search users in the database
router.get('/users/search', controller.searchUser)

// R read from database, list all/one item(s)
router.get('/users', controller.getAllUsers)
router.get('/users/:id',  controller.getUser)

// U update details of the user
router.get('/users/:id/update', controller.updateUser)
router.post('/users/:id/update', controller.updateUserPost)

// D delete users from database
router.get('/users/:id/delete', controller.deleteUser)
router.post('/users/:id/delete', controller.deleteUserPost)

