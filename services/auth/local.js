const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const init = require('./passport')
const User = require('../../models/user')
const authHelpers = require('./auth-helpers')
const prettylog = require('../../services/log/pretty-logs')

const options = {}

init();

passport.use(
    new LocalStrategy(options, (username, password, done) => {
        prettylog(`Authenticating ${username} in local.js`, null);
        User.findByUsername(username)
            .then((user) => {
                if (!user) {
                    prettylog(`${username} not found in local.js`, null);

                    return done(null, false)
                }
                if (!authHelpers.comparePass(password, user.password_digest)) {
                    prettylog("Wrong password detected in local.js", null);
                    return done(null, false);
                }
                else {
                    prettylog("Local.js: User authenticated in passport.use", user)
                    return done(null, user)
                }
            })
            .catch(err => {
                console.log(err)
                return done(err)
            })
    })
)

module.exports = passport