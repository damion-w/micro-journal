const Entry = require('../models/entry')

const entryController = {
    index: (req, res, next) => {
        res.render('entries/index')
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