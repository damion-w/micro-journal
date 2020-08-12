const db = require('../db/config')

class User {
    constructor({ id, firstName, lastName, email, username }) {
        this.id = id || null,
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.username = username
    }

    save() {
        return db.one(
            `INSERT INTO users 
            (first_name, last_name, email, username) 
            VALUES ($/firstName/, $/lastName/, $/email/, $/username/) 
            RETURNING *`
            , this)
        .then((user) => {
            return Object.assign(this, user)
        })
    }
}

module.exports = User