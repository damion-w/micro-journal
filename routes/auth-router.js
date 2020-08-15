const authRouter = require('express').Router()
const authHelpers = require('../services/auth/auth-helpers')
const passport = require('../services/auth/local')

authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
    res.render('index')
})

authRouter.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/entry',
        failureRedirect: '/auth/login',
        failureFlash: true
    })
)

authRouter.post('/register', (req, res) => {
    res.render("auth/registration");
})

authRouter.get('/logout', (req, res) => {
    req.logout()
    res.redirect('back')
})


module.exports = authRouter