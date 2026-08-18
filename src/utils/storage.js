// localStorage helpers — simple wrappers for reading/writing JSON data.
// Used by the useFavorites hook to persist favorites across sessions.

export function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
