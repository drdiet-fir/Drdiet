const { google } = require('googleapis')

// Matches the sheet column order:
// Name | Phone | City | Goal | Diet | Source | Timestamp
const RANGE = 'Sheet1!A:G'

function getClient() {
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    throw new Error('Missing Google Sheets environment variables (GOOGLE_SHEET_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY)')
  }

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key:   process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  return google.sheets({ version: 'v4', auth })
}

/**
 * Appends one row to the Google Sheet.
 *
 * @param {{ name, phone, city, goal, diet, source, timestamp }} row
 */
async function appendToSheet({ name, phone, city, goal, diet, source, timestamp }) {
  const sheets = getClient()

  await sheets.spreadsheets.values.append({
    spreadsheetId:   process.env.GOOGLE_SHEET_ID,
    range:           RANGE,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[name, phone, city, goal, diet, source, timestamp]],
    },
  })
}

module.exports = { appendToSheet }
