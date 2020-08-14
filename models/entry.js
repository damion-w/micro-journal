const db = require('../db/config')
const { use } = require('passport')

class Entry {
    constructor({ id, user_id, entry, entryDate, tag }) {
        this.id = id || null,
        this.user_id = user_id,
        this.entry = entry,
        this.entryDate = entryDate,
        this.tag = tag
    }

    save() {
        return db.one(
            `INSERT INTO entries 
            (user_id, entry, entry_date, tag)
            VALUES
            ($/user_id/, $/entry/, $/entryDate/, $/tag/)
            RETURNING *`
            , this
        )
        .then((user) => {
            return Object.assign(this, user)
        })
    }
}

module.exports = Entry