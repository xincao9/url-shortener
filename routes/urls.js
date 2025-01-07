var express = require('express')
var router = express.Router()
const Url = require('../models/url')
const Statistics = require('../models/statistics')
const { RunConfig } = require('../config/config')
const { encode, decode } = require('../utils/base62')

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
    res.json({ s: `${domain}/urls/${sid}` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

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
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
module.exports = router
