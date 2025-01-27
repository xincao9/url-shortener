const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const jwt = require('jsonwebtoken')
const { RunConfig } = require('./config/config')
const indexRouter = require('./routes/index')
const urlsRouter = require('./routes/urls')
const statisticsRouter = require('./routes/statistics')
const usersRouter = require('./routes/users')
const cors = require('cors')
const app = express()

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
}

app.use(cors(corsOptions))

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
