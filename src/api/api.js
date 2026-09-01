const BACKEND_URL = 'https://cinefind-backend.vercel.app'

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

  const response = await fetch(
    `${BACKEND_URL}/api/shows/search?q=${encodeURIComponent(trimmedQuery)}`
  )

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

export async function createShow(showData) {
  const response = await fetch(`${BACKEND_URL}/api/shows`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(showData),
  })

  if (!response.ok) {
    throw new Error('Failed to create show')
  }

  return response.json()
}

export async function updateShow(id, showData) {
  const response = await fetch(`${BACKEND_URL}/api/shows/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(showData),
  })

  if (!response.ok) {
    throw new Error('Failed to update show')
  }

  return response.json()
}

export async function deleteShow(id) {
  const response = await fetch(`${BACKEND_URL}/api/shows/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete show')
  }

  return response.json()
}
