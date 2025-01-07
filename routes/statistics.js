var express = require('express')
var router = express.Router()
const { get } = require('../models/statistics')
router.get('/', async (req, res) => {
  try {
    return await get()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
