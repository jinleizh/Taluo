/**
 * Reading History Management
 * Stores tarot reading history in localStorage with 15-day expiration
 */

const STORAGE_KEY = 'tarot_reading_history'
const EXPIRATION_DAYS = 15
const MS_PER_DAY = 24 * 60 * 60 * 1000

/**
 * Generate a simple unique ID
 */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Normalize question for matching (trim + lowercase)
 */
function normalizeQuestion(question) {
  return question.trim().toLowerCase()
}

/**
 * Check if a reading is expired (older than 15 days)
 */
function isExpired(timestamp) {
  const now = Date.now()
  const age = now - timestamp
  return age > EXPIRATION_DAYS * MS_PER_DAY
}

/**
 * Load history from localStorage and filter out expired entries
 */
export function loadHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) {
      return { readings: [] }
    }

    const history = JSON.parse(data)

    // Filter out expired readings
    const validReadings = history.readings.filter(reading => !isExpired(reading.timestamp))

    // If we filtered out any readings, save the cleaned history
    if (validReadings.length !== history.readings.length) {
      const cleanedHistory = { readings: validReadings }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedHistory))
      return cleanedHistory
    }

    return history
  } catch (error) {
    console.error('Error loading reading history:', error)
    return { readings: [] }
  }
}

/**
 * Find a cached reading for the given question and language
 * Returns the reading if found and not expired, null otherwise
 */
export function findCachedReading(question, language) {
  const normalizedQ = normalizeQuestion(question)
  const history = loadHistory()

  return history.readings.find(reading =>
    reading.question === normalizedQ &&
    reading.language === language &&
    !isExpired(reading.timestamp)
  ) || null
}

/**
 * Save a new reading to history
 */
export function saveReading(question, drawnCards, language) {
  try {
    const reading = {
      id: generateId(),
      timestamp: Date.now(),
      question: normalizeQuestion(question),
      language,
      drawnCards
    }

    const history = loadHistory()

    // Add new reading at the beginning (most recent first)
    history.readings.unshift(reading)

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))

    return reading.id
  } catch (error) {
    console.error('Error saving reading:', error)
    return null
  }
}

/**
 * Clear all reading history
 */
export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Error clearing history:', error)
    return false
  }
}

/**
 * Get statistics about the history
 */
export function getHistoryStats() {
  const history = loadHistory()
  return {
    totalReadings: history.readings.length,
    oldestReading: history.readings.length > 0
      ? new Date(history.readings[history.readings.length - 1].timestamp)
      : null,
    newestReading: history.readings.length > 0
      ? new Date(history.readings[0].timestamp)
      : null
  }
}
