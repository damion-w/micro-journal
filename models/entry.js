const db = require('../db/config')
const prettyLog = require('../services/log/pretty-logs')

const moment = require('moment')
moment().format()

class Entry {
    constructor({ id, user_id, keep, throwaway, entryDate, tag }) {
        this.id = id || null,
        this.user_id = user_id,
        this.keep = keep,
        this.throwaway = throwaway,
        this.entryDate = entryDate,
        this.tag = tag
    }

    static getAllUserEntries(id) {
        return db.manyOrNone(
            `SELECT * FROM entries WHERE user_id = $1 ORDER BY entry_date DESC`
            , id
        )
        .then((entries) => {
            prettyLog("DB object returned from getAllUserEntries(id) in entry.js", entries)

            return entries.map((entry) => { 
                const userEntry = new this(entry)
                prettyLog("userEntry before moment manipulation in getAllUserEntries(id) in entry.js", userEntry)

                const entryDate = moment(entry.entry_date)
                const readableEntryDate = entryDate.format("dddd, MMMM Do, YYYY")
                userEntry.entryDate = readableEntryDate
                prettyLog("DB -> Entry object in getAllUserEntries(id) in entry.js", userEntry)

                return userEntry 
            })
        })
    }

    static getById(id) {
        return db.oneOrNone(
            `SELECT * FROM entries WHERE id = $1`
            , id
        )
        .then((entry) => {
            prettyLog("DB object returned from getById(id) in entry.js", entry)


            if (entry) {
                const foundEntry = new this (entry)
                prettyLog("entry before moment manipulation in getById(id) in entry.js", foundEntry)

                const entryDate = moment(entry.entry_date)
                const readableEntryDate = entryDate.format("YYYY-MM-DD")
                foundEntry.entryDate = readableEntryDate;
                prettyLog("DB -> Entry object in getById(id) in entry.js", foundEntry)

                return foundEntry
            }
            else {
                throw new Error('No entry found')
            }
        })
    }

    save() {
        return db.one(
            `INSERT INTO entries 
            (user_id, keep, throwaway, entry_date, tag)
            VALUES
            ($/user_id/, $/keep/, $/throwaway/, $/entryDate/, $/tag/)
            RETURNING *`
            , this
        )
        .then((entry) => {
            prettyLog("DB object returned from save() in entry.js", entry);
            return Object.assign(this, entry)
        })
    }

    delete() {
        return db.none(
            `DELETE FROM entries WHERE id = $1`, 
            this.id
        )
    }

    update(changes) {
        Object.assign(this, changes)

        return db.one(
            `UPDATE entries SET
            keep = $/keep/, 
            throwaway = $/throwaway/,
            entry_date = $/entryDate/,
            tag = $/tag/
            WHERE id = $/id/
            RETURNING *`
            , this
        )
        .then((entry) => {
            return Object.assign(this, entry)
        })
    }    
}

module.exports = Entry