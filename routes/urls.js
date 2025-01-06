var express = require('express')
var router = express.Router()
const Url = require('../models/url')
const { runConfig } = require('../config/config')

router.post('/', async (req, res) => {
  const { raw } = req.body
  if (!raw) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }
  try {
    const url = await Url.create({ raw })
    const domain = runConfig.domain
    res.json({ s: `${domain}/urls/${url.id}` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  let { id } = req.params
  try {
    const url = await Url.findOne({ where: { id } })
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
