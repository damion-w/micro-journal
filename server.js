const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

const userRouter = require('./routes/user-router')
const authRouter = require('./routes/auth-router')
const entryRouter = require('./routes/entry-router')

const app = express()
require('dotenv').config();

app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static('public'));
app.use(cookieParser())
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true
    })
)
app.use(passport.initialize())
app.use(passport.session())


app.set('views, views')
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/entry', entryRouter)

app.use('*', (req, res) => {
    res.status(404).send('Not found!!')
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})