const BASE_URL = 'https://api.tvmaze.com'

export async function getShows() {
  const response = await fetch(`${BASE_URL}/shows?page=0`)

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

  const response = await fetch(`${BASE_URL}/search/shows?q=${trimmedQuery}`)

  if (!response.ok) {
    throw new Error('Failed to search shows')
  }

  return response.json()
}

export async function getShowById(id) {
  const response = await fetch(`${BASE_URL}/shows/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch show details')
  }

  return response.json()
}
