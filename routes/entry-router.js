const entryController = require('../controllers/entry-controller')
const authHelpers = require('../services/auth/auth-helpers')

const entryRouter = require('express').Router()


entryRouter.get('/', entryController.index)
entryRouter.post('/', authHelpers.loginRequired, entryController.create)
entryRouter.put('/:id([0-9]+)', authHelpers.loginRequired, entryController.update)
entryRouter.post('/new', authHelpers.loginRequired, (req, res) => {
  res.render("entries/new");
})

entryRouter.get('/:id([0-9]+)/edit', entryController.show, (req, res) => {
    res.render('entries/edit', {
        entry: res.locals.entry
    })
})

module.exports = entryRouter