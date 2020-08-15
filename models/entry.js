const db = require('../db/config')
const prettyLog = require('../services/log/pretty-logs')

const moment = require('moment')
moment().format()

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
            prettyLog("DB object returned from getAllUserEntries(id) in entry.js", entries)

            return entries.map((entry) => { 
                const userEntry = new this(entry)
                const entryDate = moment(userEntry.entryDate)
                const readableEntryDate = entryDate.format("dddd, MMMM Do, YYYY")
                userEntry.entryDate = readableEntryDate
                prettyLog("DB -> Entry object in getAllUserEntries(id) in entry.js", userEntry)

                return userEntry 
            })
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
        .then((entry) => {
            prettyLog("DB object returned from save() in entry.js", entry);
            return Object.assign(this, entry)
        })
    }
}

module.exports = Entry