var express = require('express')
var router = express.Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  const { username, email } = req.body
  if (!username || !email) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  try {
    await User.create({ username, email })
    res.json(req.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
module.exports = router
