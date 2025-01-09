var express = require('express')
var router = express.Router()
const { decode } = require('../utils/base62')
const Url = require('../models/url')
const { increment, keys } = require('../models/statistics')

router.get('/:id', async (req, res) => {
  let { id } = req.params
  try {
    const nid = decode(id)
    const url = await Url.findOne({ where: { id: nid } })
    if (url === null) {
      res.status(400).json({ error: 'Not found!' })
      return
    }
    res.redirect(url.raw)
    increment(keys.usage)
  } catch (err) {
    res.status(500).json({ error: err.message })
    increment(keys.failures)
  }
})

module.exports = router
