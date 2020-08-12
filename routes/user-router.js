const userController = require('../controllers/user-controller')

const userRouter = require('express').Router()

userRouter.post('/', userController.create)

module.exports = userRouter
