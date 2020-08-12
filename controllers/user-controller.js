const User = require('../models/user')

const userController = {
    create: (req, res, next) => {
        const newUser = new User({ 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username
        })

        newUser.save()
            .then((user) => {
                res.json({
                    message: 'ok',
                    data: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        username: user.username
                    }
                })
            })
            .catch(next)
    }
}

module.exports = userController