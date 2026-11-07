require('dotenv').config()

const express    = require('express')
const cors       = require('cors')
const rateLimit  = require('express-rate-limit')
const { google } = require('googleapis')
const twilio     = require('twilio')

const app = express()

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'https://www.drdiet.fit,https://drdiet.fit,http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

app.use(cors({
  origin(origin, callback) {
    // Requests with no Origin header (curl, server-to-server, health checks) are allowed.
    if (!origin) return callback(null, true)
    const isAllowed = allowedOrigins.includes(origin) || /\.vercel\.app$/.test(new URL(origin).hostname)
    return isAllowed ? callback(null, true) : callback(new Error('Not allowed by CORS'))
  },
}))
app.use(express.json())

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many submissions. Please try again later.' },
})

// Values Google Sheets would otherwise evaluate as formulas get a leading
// apostrophe so they render as literal text (CSV/Sheets formula injection).
function sheetSafe(value) {
  const str = (value ?? '').toString()
  return /^[=+\-@]/.test(str) ? `'${str}` : str
}

// ── Google Sheets Auth ────────────────────────────────────────
function getSheetsClient() {
  const auth = new google.auth.JWT({
    email:  process.env.GOOGLE_CLIENT_EMAIL,
    key:    (process.env.GOOGLE_PRIVATE_KEY || '')
              .replace(/^"(.*)"$/, '$1')
              .replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

// ── Twilio client ─────────────────────────────────────────────
function getClient() {
  return twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
}

// Converts "9876543210" → "whatsapp:+919876543210"
function toWhatsApp(phone) {
  const digits = phone.replace(/\D/g, '')
  const number = digits.startsWith('91') && digits.length === 12
    ? digits
    : `91${digits}`
  return `whatsapp:+${number}`
}

// ── WhatsApp to Admin ─────────────────────────────────────────
async function notifyAdmin({ name, phone, city, goal, diet }) {
  const message = `New Lead 🚀\nName: ${name}\nPhone: ${phone}\nCity: ${city}\nGoal: ${goal}\nDiet: ${diet}`

  await getClient().messages.create({
    from: process.env.TWILIO_WHATSAPP_NUMBER,
    to:   process.env.ADMIN_WHATSAPP_NUMBER,
    body: message,
  })
}

// ── WhatsApp to User ──────────────────────────────────────────
async function notifyUser(phone) {
  const message = `Hey 👋 Thanks for submitting your details.\nOur team will contact you shortly.\nGet Ready to get Fit 💪`

  await getClient().messages.create({
    from: process.env.TWILIO_WHATSAPP_NUMBER,
    to:   toWhatsApp(phone),
    body: message,
  })
}

// ── POST /submit ──────────────────────────────────────────────
app.post('/submit', submitLimiter, async (req, res) => {
  const { name, phone, city, goal, diet, source } = req.body

  if (!name || !phone || !city || !goal || !diet) {
    return res.status(400).json({ success: false, error: 'Missing required fields.' })
  }

  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  })

  const row = [name, phone, city, goal, diet, source, timestamp].map(sheetSafe)

  // 1. Save to Google Sheets
  try {
    const sheets = getSheetsClient()
    await sheets.spreadsheets.values.append({
      spreadsheetId:    process.env.GOOGLE_SHEET_ID,
      range:            'Sheet1!A:G',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [row] },
    })
    console.log(`✅ Saved to Sheets: ${name} | ${phone} | ${city}`)
  } catch (err) {
    console.error('❌ Sheets error:', err.message)
    return res.status(500).json({ success: false, error: 'Failed to save data.' })
  }

  // 2. Send WhatsApp notifications (non-blocking — won't fail the request)
  notifyAdmin({ name, phone, city, goal, diet })
    .then(() => console.log(`📲 Admin notified for: ${name}`))
    .catch((err) => console.error('❌ Admin WhatsApp error:', err.message))

  notifyUser(phone)
    .then(() => console.log(`📲 User notified: ${phone}`))
    .catch((err) => console.error('❌ User WhatsApp error:', err.message))

  return res.status(200).json({ success: true })
})

// ── Health check ──────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({ status: 'Dr Diet API is running' })
})

// ── Error handler (catches CORS rejections etc.) ─────────────
app.use((err, _req, res, _next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ success: false, error: 'Origin not allowed.' })
  }
  console.error('❌ Unhandled error:', err.message)
  return res.status(500).json({ success: false, error: 'Internal server error.' })
})

// ── Start ─────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`)
})
