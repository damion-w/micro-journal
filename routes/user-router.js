const userController = require('../controllers/user-controller')
const authHelpers = require('../services/auth/auth-helpers')

const userRouter = require('express').Router()

userRouter.get('/', authHelpers.loginRequired, userController.index)
userRouter.post('/', userController.create)
userRouter.get('/new', authHelpers.loginRedirect, (res, req) => {
    res.render('auth/register')
})

module.exports = userRouter
