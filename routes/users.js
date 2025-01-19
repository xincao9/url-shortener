var express = require('express')
var router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { RunConfig } = require('../config/config')
const redis = require('../plugins/redis')

router.post('/login', async (req, res) => {
  const { cellphone, verificationCode } = req.body
  if (!cellphone || !verificationCode) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }
  try {
    const vc = await redis.get(`login:verification-code:${cellphone}`)
    if (vc !== verificationCode) {
      res.status(401).json({ error: 'VerificationCode error' })
    }
    let user = await User.findOne({ where: { cellphone } })
    if (!user) {
      user = await User.create({ cellphone })
    }
    const token = jwt.sign({ user }, RunConfig.jwtSecret, { expiresIn: '7d' })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

function generateNumericCode(length) {
  const digits = '0123456789';
  let result = '';
  const digitsLength = digits.length;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digitsLength);
    result += digits[randomIndex];
  }
  return result;
}

router.get('/vc/:cellphone', async (req, res) => {
  let { cellphone } = req.params
  if (!cellphone) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }
  try {
    const vc = generateNumericCode(6)
    await redis.set(`login:verification-code:${cellphone}`, vc)
    res.json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
