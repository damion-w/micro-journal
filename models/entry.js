const db = require('../db/config')
const prettyLog = require('../services/log/pretty-logs')

class Entry {
    constructor({ id, user_id, entry, entryDate, tag }) {
        this.id = id || null,
        this.user_id = user_id,
        this.entry = entry,
        this.entryDate = entryDate,
        this.tag = tag
    }

    static getAllUserEntries(id) {
        return db.manyOrNone(
            `SELECT * FROM entries WHERE user_id = $1`
            , id
        )
        .then((entries) => {
            prettyLog("entries in Entry.getAllUserEntries()", entries)
            return entries.map((el) => { 
                prettyLog("el in entries.map in Entry.getAllUserEntries()", el)
                return new this(el) })
        })
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