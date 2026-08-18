// API service layer — all backend HTTP requests go through here.
// Centralizes the base URL and fetch logic so components don't repeat it.

const BACKEND_URL = 'http://localhost:5000'

/**
 * Fetches all shows from the database.
 * Used by the homepage (featured section) and explore page (recommended section).
 */
export async function getShows() {
  const response = await fetch(`${BACKEND_URL}/api/shows`)

  if (!response.ok) {
    throw new Error('Failed to fetch shows')
  }

  return response.json()
}

/**
 * Searches shows by name or genre on the backend.
 * Returns an empty array if the query is empty or whitespace only.
 */
export async function searchShows(query) {
  const trimmedQuery = query.trim()

  if (trimmedQuery === '') {
    return []
  }

  const response = await fetch(
    `${BACKEND_URL}/api/shows/search?q=${encodeURIComponent(trimmedQuery)}`
  )

  if (!response.ok) {
    throw new Error('Failed to search shows')
  }

  return response.json()
}

/**
 * Fetches a single show by its numeric ID.
 * Used by the ShowDetails page.
 */
export async function getShowById(id) {
  const response = await fetch(`${BACKEND_URL}/api/shows/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch show details')
  }

  return response.json()
}
