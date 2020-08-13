const passport = require('passport')
const User = require('../../models/user')

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.username)
    })

    passport.deserializeUser((username, done) => {
        User.findByUsername(username)
            .then((user) => {
                done(null, user)
            })
            .catch((err) => {
                done(err, null)
            })
    })
}