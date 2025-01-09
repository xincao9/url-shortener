var express = require('express')
var router = express.Router()
const Url = require('../models/url')
const { RunConfig } = require('../config/config')
const { encode } = require('../utils/base62')
const { increment, keys } = require('../models/statistics')

router.post('/', async (req, res) => {
  const { raw } = req.body
  if (!raw) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }
  try {
    let url = await Url.findOne({ where: { raw } })
    if (url === null) {
      url = await Url.create({ raw })
    }
    const domain = RunConfig.domain
    const sid = encode(url.id)
    res.json({ s: `${domain}/s/${sid}` })
    increment(keys.success)
  } catch (err) {
    res.status(500).json({ error: err.message })
    increment(keys.failures)
  }
})

module.exports = router
