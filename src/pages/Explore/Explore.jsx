// Explore page — main search and browse page.
// Displays search results when a query is active, or recommended shows when idle.
// Accepts ?search=<query> from the URL (set when navigating from Home page search).
// Search queries the backend /api/shows/search endpoint which searches name and genres.

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'
import ShowGrid from '../../components/ShowGrid/ShowGrid'
import { getShows, searchShows } from '../../api/api'
import './Explore.css'

function Explore({ favorites, addFavorite, removeFavorite }) {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('search') || '')
  const [shows, setShows] = useState([])
  const [recommendedShows, setRecommendedShows] = useState([])
  const [loading, setLoading] = useState(false)
  const [recommendedLoading, setRecommendedLoading] = useState(true)
  const [error, setError] = useState('')
  const [recommendedError, setRecommendedError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  // Load recommended shows from the database on mount (shown when no search is active)
  useEffect(() => {
    async function loadRecommendedShows() {
      setRecommendedLoading(true)
      setRecommendedError('')

      try {
        const data = await getShows()
        setRecommendedShows(data.slice(0, 12))
      } catch {
        setRecommendedError('Unable to load recommended shows.')
      } finally {
        setRecommendedLoading(false)
      }
    }

    loadRecommendedShows()
  }, [])

  // Execute a search query against the backend
  async function runSearch(searchQuery) {
    if (searchQuery.trim() === '') {
      setShows([])
      setHasSearched(false)
      return
    }

    setHasSearched(true)
    setLoading(true)
    setError('')

    try {
      const results = await searchShows(searchQuery)
      setShows(results)
    } catch {
      setError('Something went wrong. Please try again.')
      setShows([])
    } finally {
      setLoading(false)
    }
  }

  // Triggered by SearchBar submit button / Enter key
  function handleSearch() {
    runSearch(query)
  }

  // Auto-search when navigated from Home page with ?search= URL param
  useEffect(() => {
    const urlQuery = searchParams.get('search')

    if (urlQuery) {
      setQuery(urlQuery)
      runSearch(urlQuery)
    }
  }, [searchParams])

  const searchReady = !loading && !error
  const recommendedReady = !recommendedLoading && !recommendedError

  return (
    <main className="explore">
      <h1>Explore</h1>
      <p className="explore-subtitle">Discover shows and movies</p>

      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
      />

      {/* Search results — shown only after a search has been performed */}
      {hasSearched && (
        <>
          {loading && <p className="explore-message">Loading shows...</p>}

          {!loading && error && (
            <p className="explore-message explore-error">{error}</p>
          )}

          {searchReady && shows.length > 0 && (
            <>
              <h2 className="explore-heading">Search Results</h2>
              <ShowGrid
                shows={shows}
                favorites={favorites}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
              />
            </>
          )}

          {searchReady && shows.length === 0 && (
            <p className="explore-message">
              No shows found. Try a different search.
            </p>
          )}
        </>
      )}

      {/* Recommended shows — shown when no search has been performed yet */}
      {!hasSearched && (
        <>
          {recommendedLoading && (
            <p className="explore-message">
              Loading recommended shows...
            </p>
          )}

          {!recommendedLoading && recommendedError && (
            <p className="explore-message explore-error">
              {recommendedError}
            </p>
          )}

          {recommendedReady && recommendedShows.length > 0 && (
            <>
              <h2 className="explore-heading">Recommended Shows</h2>
              <ShowGrid
                shows={recommendedShows}
                favorites={favorites}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
              />
            </>
          )}

          {recommendedReady && recommendedShows.length === 0 && (
            <p className="explore-message">
              No recommended shows available right now.
            </p>
          )}
        </>
      )}
    </main>
  )
}

export default Explore
