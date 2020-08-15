const entryController = require('../controllers/entry-controller')
const authHelpers = require('../services/auth/auth-helpers')

const entryRouter = require('express').Router()

entryRouter.get('/', entryController.index)
entryRouter.post('/', authHelpers.loginRequired, entryController.create)
entryRouter.post("/new", authHelpers.loginRequired, (req, res) => {
  res.render("entries/new");
})
module.exports = entryRouter