const entryController = require('../controllers/entry-controller')
const authHelpers = require('../services/auth/auth-helpers')

const entryRouter = require('express').Router()

entryRouter.get('/', entryController.index)
entryRouter.post('/', authHelpers.loginRequired, entryController.create)

module.exports = entryRouter