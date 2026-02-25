if (process.argv.length != 3) {
  console.error('ERROR. You need to send one arguments like this: <API_KEY>')
  process.exit(1)
}

const API_KEY = process.argv[2]

// Querystring-varianten
const url = `http://localhost:${process.env.PORT || 3000}/api/v1/apikey/try5?API_KEY=${encodeURIComponent(API_KEY)}`

const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
}

console.log(url)

const response = await fetch(url, options)

console.log(response.status)

const contentType = response.headers.get('content-type') || ''
const text = await response.text()

if (contentType.includes('application/json')) {
  console.log(JSON.parse(text))
} else {
  // Fallback om servern renderar HTML
  console.log({
    type: 'forbidden',
    message: 'You have not supplied a valid API key!'
  })
}