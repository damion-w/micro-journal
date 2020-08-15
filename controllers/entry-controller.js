const Entry = require('../models/entry')
const prettyLog = require('../services/log/pretty-logs')

const entryController = {
    index: (req, res, next) => {
        Entry.getAllUserEntries(req.user.id)
            .then((entries) => {
            prettyLog("Entries from getAllUserEntries() in entryController.index", entries)
            res.render('entries/index', { entries })
            })
            .catch(next)
    },
    
    create: (req, res, next) => {
        const newEntry = new Entry({
            user_id: req.user.id,
            entry: req.body.entry,
            entryDate: req.body.entryDate,
            tag: req.body.tag
        })

        prettyLog("newEntry in entryController.create", newEntry);

        newEntry.save()
            .then((entry) => {
                res.redirect('/entry')
            })
            .catch(next)
    },

    show: (req, res, next) => {
        Entry.getById(req.params.id)
            .then((entry) => {
                prettyLog("entry from getById() in entryController.show", entry)
                res.locals.entry = entry
                next()
            })
            .catch(next)
    },

    update: (req, res, next) => {
        Entry.getById(req.params.id)
            .then((foundEntry) => {
                return foundEntry.update({
                    entry: req.body.entry,
                    entryDate: req.body.entryDate,
                    tag: req.body.tag
                })
            })
            .then((updatedEntry) => {
                res.redirect('/entry')
            })
            .catch(next)
    }
}

module.exports = entryController