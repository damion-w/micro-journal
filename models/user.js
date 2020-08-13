const db = require('../db/config')

class User {
    constructor({ id, firstName, lastName, email, username, passwordDigest }) {
        this.id = id || null,
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.username = username,
        this.passwordDigest = passwordDigest
    }

    static findByUsername(username) {
        return db.oneOrNone(
            `SELECT * FROM users WHERE username = $1`,
            username)
        .then((user => {
            if (user) return new this(user)
            else throw new Error('User not found')
        }))
    }

    save() {
        return db.one(
            `INSERT INTO users 
            (first_name, last_name, email, username, password_digest) 
            VALUES ($/firstName/, $/lastName/, $/email/, $/username/, $/passwordDigest/) 
            RETURNING *;`
            , this
        )
        .then((user) => {
            return Object.assign(this, user)
        })
    }
}

module.exports = User