var express = require('express')
var router = express.Router()
const Url = require('../models/url')

router.post('/', async (req, res) => {
  const { raw } = req.body
  if (!raw) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  try {
    await Url.create({ raw })
    res.json(req.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
module.exports = router
