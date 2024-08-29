async function getBreakingBadQuote() {
  const response = await fetch('https://type.fit/api/quotes')
  const data = await response.json()

  return data[Math.floor(Math.random() * 10)]
}

async function updateContent() {
  try {
    const quote = await getBreakingBadQuote()
    const author = quote.author.split(',')
    document.getElementById('quote').textContent = `"${quote.text}"`
    document.getElementById('quoteAuthor').textContent = `- ${author[0]}`
  } catch (error) {
    console.error('Error updating content:', error)
  }
}

// Update immediately and then every hour
updateContent()
setInterval(updateContent, 60 * 60 * 1000)
