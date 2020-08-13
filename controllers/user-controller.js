const bcrypt = require('bcryptjs')
const User = require('../models/user')

const userController = {
    index: (req, res, next) => {
        res.json({
            message: 'User Profile page here',
            data: {
                user: req.user
            }
        })
    },
    
    create: (req, res, next) => {
        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(req.body.password, salt)
        
        const newUser = new User({ 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            passwordDigest: hash
        })

        newUser.save()
            .then((user) => {
                req.login(user, (err) => {
                    if (err) return next(err)
                    else res.redirect('/user')
                })
            })
            .catch(next)
    }
}

module.exports = userController