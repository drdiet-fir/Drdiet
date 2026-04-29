const express           = require('express')
const router            = express.Router()
const { appendToSheet } = require('../services/sheets')

router.post('/submit-form', async (req, res) => {
  const { name, phone, city, goal, diet, source = '' } = req.body

  // Validate required fields
  const required = { name, phone, city, goal, diet }
  const missing  = Object.keys(required).filter((k) => !required[k]?.toString().trim())

  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missing.join(', ')}`,
    })
  }

  // IST timestamp
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone:  'Asia/Kolkata',
    day:       '2-digit',
    month:     '2-digit',
    year:      'numeric',
    hour:      '2-digit',
    minute:    '2-digit',
    hour12:    true,
  })

  try {
    await appendToSheet({
      name:      name.trim(),
      phone:     phone.trim(),
      city,
      goal,
      diet,
      source,
      timestamp,
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[submit-form] Error:', err.message)
    return res.status(500).json({ success: false, error: 'Failed to save submission.' })
  }
})

module.exports = router
