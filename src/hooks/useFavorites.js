// Custom hook for managing favorite shows.
// Persists favorites to localStorage so they survive page refreshes.
// Returns the current favorites array and functions to add/remove shows.

import { useState, useCallback } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const FAVORITES_KEY = 'cinefind-favorites'

export default function useFavorites() {
  // Initialize state from localStorage (or empty array if nothing stored)
  const [favorites, setFavorites] = useState(() =>
    loadFromStorage(FAVORITES_KEY, [])
  )

  // Save updated favorites to both state and localStorage
  const updateFavorites = useCallback(
    (updated) => {
      setFavorites(updated)
      saveToStorage(FAVORITES_KEY, updated)
    },
    []
  )

  // Add a show to favorites (skips if already present)
  const addFavorite = useCallback(
    (show) => {
      if (!favorites.some((favorite) => favorite.id === show.id)) {
        updateFavorites([...favorites, show])
      }
    },
    [favorites, updateFavorites]
  )

  // Remove a show from favorites by its ID
  const removeFavorite = useCallback(
    (showId) => {
      updateFavorites(favorites.filter((favorite) => favorite.id !== showId))
    },
    [favorites, updateFavorites]
  )

  return { favorites, addFavorite, removeFavorite }
}
