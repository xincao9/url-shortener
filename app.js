var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var urlsRouter = require('./routes/urls')
var statisticsRouter = require('./routes/statistics')

const cors = require('cors')

var app = express()

const corsOptions = {
  origin: 'http://127.0.0.1:5173',
}
app.use(cors(corsOptions))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/md', express.static(path.join(__dirname, 'docs/md')))
app.use(express.static(path.join(__dirname, 'front/dist')))

app.use('/s', indexRouter)
app.use('/users', usersRouter)
app.use('/urls', urlsRouter)
app.use('/statistics', statisticsRouter)

module.exports = app
