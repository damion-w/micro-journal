const db = require('../db/config')

class User {
    constructor({ id, firstName, lastName, email, username, password_digest }) {
        this.id = id || null,
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.username = username,
        this.password_digest = password_digest
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
            VALUES ($/firstName/, $/lastName/, $/email/, $/username/, $/password_digest/) 
            RETURNING *;`
            , this
        )
        .then((user) => {
            return Object.assign(this, user)
        })
    }
}

module.exports = User