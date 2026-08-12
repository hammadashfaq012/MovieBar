import { useState, useCallback } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const FAVORITES_KEY = 'cinefind-favorites'

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() =>
    loadFromStorage(FAVORITES_KEY, [])
  )

  const updateFavorites = useCallback(
    (updated) => {
      setFavorites(updated)
      saveToStorage(FAVORITES_KEY, updated)
    },
    []
  )

  const addFavorite = useCallback(
    (show) => {
      if (!favorites.some((favorite) => favorite.id === show.id)) {
        updateFavorites([...favorites, show])
      }
    },
    [favorites, updateFavorites]
  )

  const removeFavorite = useCallback(
    (showId) => {
      updateFavorites(favorites.filter((favorite) => favorite.id !== showId))
    },
    [favorites, updateFavorites]
  )

  return { favorites, addFavorite, removeFavorite }
}
