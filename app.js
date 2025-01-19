var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const jwt = require('jsonwebtoken')
const { RunConfig } = require('./config/config')

var indexRouter = require('./routes/index')
var urlsRouter = require('./routes/urls')
var statisticsRouter = require('./routes/statistics')
var usersRouter = require('./routes/users')

const cors = require('cors')

var app = express()

// const corsOptions = {
//   origin: 'http://127.0.0.1:5173',
// }

app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use((req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]
  if (!token) {
    next()
    return
  }
  jwt.verify(token, RunConfig.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    req.user = decoded
  })
  next()
})

app.use('/md', express.static(path.join(__dirname, 'docs/md')))
app.use(express.static(path.join(__dirname, 'front/dist')))
app.get('/f/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'front/dist/index.html'))
})

app.use('/s', indexRouter)
app.use('/urls', urlsRouter)
app.use('/statistics', statisticsRouter)
app.use('/users', usersRouter)

module.exports = app
