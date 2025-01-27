const express = require('express')
const router = express.Router()
const { get, increment, keys } = require('../models/statistics')

router.get('/', async (req, res) => {
  try {
    const values = await get()
    res.json(values)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
  increment(keys.visits)
})

module.exports = router
