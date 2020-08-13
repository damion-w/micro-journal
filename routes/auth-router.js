const authRouter = require('express').Router()
const authHelpers = require('../services/auth/auth-helpers')
const passport = require('../services/auth/local')

authRouter.post('/register', (req, res) => {
    res.render('auth/register')
})

authRouter.post(
    '/login', 
    passport.authenticate('local', {
        successRedirect: '/user',
        failureRedirect: '/auth/login',
        failureFlash: true
    })
)

authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
    res.render('auth/login')
})

authRouter.get('/logout', (req, res) => {
    req.logout()
    res.redirect('back')
})


module.exports = authRouter