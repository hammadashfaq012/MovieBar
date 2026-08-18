const BACKEND_URL = 'http://localhost:5000'

export async function getShows() {
  const response = await fetch(`${BACKEND_URL}/api/shows`)

  if (!response.ok) {
    throw new Error('Failed to fetch shows')
  }

  return response.json()
}

export async function searchShows(query) {
  const trimmedQuery = query.trim()

  if (trimmedQuery === '') {
    return []
  }

  const response = await fetch(`${BACKEND_URL}/api/shows/search?q=${encodeURIComponent(trimmedQuery)}`)

  if (!response.ok) {
    throw new Error('Failed to search shows')
  }

  return response.json()
}

export async function getShowById(id) {
  const response = await fetch(`${BACKEND_URL}/api/shows/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch show details')
  }

  return response.json()
}
