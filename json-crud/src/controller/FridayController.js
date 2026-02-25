export const fridayController = {}

const STOCKHOLM_TZ = 'Europe/Stockholm'

function isValidISODateOnly (s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s)
}

function toISODateInStockholm (dateObj) {
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: STOCKHOLM_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(dateObj)

  const y = parts.find(p => p.type === 'year')?.value
  const m = parts.find(p => p.type === 'month')?.value
  const d = parts.find(p => p.type === 'day')?.value
  return `${y}-${m}-${d}`
}

fridayController.show = (req, res) => {
  const testDate = req.query.date

  // Om query date finns och är YYYY-MM-DD, använd den. Annars "nu".
  const dateObj = isValidISODateOnly(testDate)
    ? new Date(`${testDate}T00:00:00Z`)
    : new Date()

  const weekdayName = new Intl.DateTimeFormat('sv-SE', {
    timeZone: STOCKHOLM_TZ,
    weekday: 'long'
  }).format(dateObj)

  const isoDate = isValidISODateOnly(testDate)
    ? testDate
    : toISODateInStockholm(dateObj)

  const isFriday = weekdayName.toLowerCase() === 'fredag'

  res.render('friday', {
    isoDate,
    weekdayName,
    isFriday,
    usingTestDate: isValidISODateOnly(testDate)
  })
}