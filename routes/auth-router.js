const authRouter = require('express').Router()

authRouter.post('/register', (req, res) => {
    res.render('auth/register')
})

module.exports = authRouter