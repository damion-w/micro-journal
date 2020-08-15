const Entry = require('../models/entry')
const prettyLog = require('../services/log/pretty-logs')

const entryController = {
    index: (req, res, next) => {
        Entry.getAllUserEntries(req.user.id)
            .then((entries) => {
            prettyLog("Entries from getAllUserEntries() in entryController.index", entries);
            res.render('entries/index', { entries })
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
                res.redirect('/entry')
                // res.json({
                //     message: 'ok',
                //     data: {
                //         entry: entry
                //     }
                // })
            })
            .catch(next)
    }
}

module.exports = entryController