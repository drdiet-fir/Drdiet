// Shared form validation helpers (client-side; the backend repeats these).

// A valid Indian mobile: 10 digits starting 6-9, optionally with +91 / 91 /
// 0 prefix and spaces/dashes. Returns the normalized 10-digit number or null.
export function normalizeIndianPhone(raw) {
  const digits = (raw || '').replace(/\D/g, '')
  let ten = digits
  if (ten.length === 12 && ten.startsWith('91')) ten = ten.slice(2)
  else if (ten.length === 11 && ten.startsWith('0')) ten = ten.slice(1)
  return /^[6-9]\d{9}$/.test(ten) ? ten : null
}

export function isValidIndianPhone(raw) {
  return normalizeIndianPhone(raw) !== null
}

// Trims and collapses inner whitespace; empty after trim means "blank".
export function clean(str) {
  return (str || '').trim().replace(/\s+/g, ' ')
}

export function isBlank(str) {
  return clean(str).length === 0
}
