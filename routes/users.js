var express = require('express')
var router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { RunConfig } = require('../config/config')

router.post('/login', async (req, res) => {
  const { cellphone, verificationCode } = req.body
  if (!cellphone || !verificationCode) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }
  try {
    let user = await User.findOne({ where: { cellphone } })
    if (!user) {
      user = await User.create({ cellphone })
    }
    const token = jwt.sign({ user }, RunConfig.jwtSecret, { expiresIn: '7d' })
    res.json({ token: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
