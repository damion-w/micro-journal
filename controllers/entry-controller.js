const Entry = require('../models/entry')
const prettyLog = require('../services/log/pretty-logs')

const entryController = {
    index: (req, res, next) => {
        prettyLog("req.user.id in entryController.index", req.user.id)
        Entry.getAllUserEntries(req.user.id)
            .then((entries) => {
                //res.render('entries/show', { entries })
                prettyLog("entries in entryController.index", entries)
                res.json({
                    message: 'ok',
                    data: {
                        entries: entries
                    }
                })
            })
            .catch(next)
    },
    
    create: (req, res, next) => {
        console.log()
        const newEntry = new Entry({
            user_id: req.user.id,
            entry: req.body.entry,
            entryDate: req.body.entryDate,
            tag: req.body.tag
        })

        newEntry.save()
            .then((entry) => {
                res.json({
                    message: 'ok',
                    data: {
                        entry: entry
                    }
                })
            })
            .catch(next)
    }
}

module.exports = entryController