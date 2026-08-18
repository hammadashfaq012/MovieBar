// Home page — landing page with hero section, search bar, featured shows, and spotlight.
// The search bar navigates to /explore?search=<query> (does not search directly here).
// Featured shows are loaded from MongoDB on mount (first 6 shows).
// Spotlight shows are the first 3 featured shows displayed in a detailed alternating layout.

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'
import ShowGrid from '../../components/ShowGrid/ShowGrid'
import { getShows } from '../../api/api'
import './Home.css'

function Home({ favorites, addFavorite, removeFavorite }) {
  const [query, setQuery] = useState('')
  const [featuredShows, setFeaturedShows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Load the first 6 shows from the database on mount
  useEffect(() => {
    async function loadFeaturedShows() {
      setLoading(true)
      setError('')

      try {
        const results = await getShows()
        setFeaturedShows(results.slice(0, 6))
      } catch {
        setError('Unable to load featured shows.')
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedShows()
  }, [])

  // Redirect to the Explore page with the search query in the URL
  function handleSearch() {
    if (query.trim() === '') {
      return
    }

    navigate(`/explore?search=${encodeURIComponent(query.trim())}`)
  }

  const spotlightShows = featuredShows.slice(0, 3)
  const ready = !loading && !error

  return (
    <main className="home">
      {/* Hero section with tagline and search */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-label">DISCOVER YOUR NEXT FAVORITE SHOW</p>
          <h1 className="hero-title">Find something worth watching.</h1>
          <p className="hero-text">
            Search thousands of shows and discover your next favorite series.
          </p>
          <Link className="hero-button" to="/explore">
            Explore Shows
          </Link>
          <div className="hero-search">
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </section>

      {/* Featured shows grid (first 6 shows) */}
      <section className="featured">
        <h2 className="featured-title">Featured Shows</h2>

        {loading && <p className="home-message">Loading featured shows...</p>}

        {!loading && error && (
          <p className="home-message home-error">{error}</p>
        )}

        {ready && featuredShows.length > 0 && (
          <ShowGrid
            shows={featuredShows}
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        )}

        {ready && featuredShows.length === 0 && (
          <p className="home-message">
            No featured shows available right now.
          </p>
        )}
      </section>

      {/* Spotlight section — detailed cards for top 3 shows */}
      {ready && featuredShows.length > 0 && (
        <section className="spotlight">
          <h2 className="spotlight-title">Spotlight Shows</h2>
          <div className="spotlight-list">
            {spotlightShows.map((show, index) => (
              <article
                className={
                  index % 2 === 1
                    ? 'spotlight-item spotlight-item-reverse'
                    : 'spotlight-item'
                }
                key={show.id}
              >
                <div className="spotlight-image">
                  {show.image && (show.image.original || show.image.medium) ? (
                    <img
                      className="spotlight-img"
                      src={show.image.original || show.image.medium}
                      alt={show.name}
                    />
                  ) : (
                    <div className="spotlight-placeholder">No Image</div>
                  )}
                </div>
                <div className="spotlight-info">
                  <h3 className="spotlight-name">{show.name}</h3>
                  <p className="spotlight-rating">
                    <span className="spotlight-star">★</span>{' '}
                    {show.rating && show.rating.average
                      ? show.rating.average
                      : 'N/A'}
                  </p>
                  <p className="spotlight-genres">
                    {show.genres && show.genres.length > 0
                      ? show.genres.join(' • ')
                      : 'Genre not available'}
                  </p>
                  <p className="spotlight-meta">
                    Language: {show.language || 'Not available'}
                  </p>
                  <p className="spotlight-meta">
                    Status: {show.status || 'Not available'}
                  </p>
                  <p className="spotlight-meta">
                    Runtime:{' '}
                    {show.runtime ? `${show.runtime} min` : 'Not available'}
                  </p>
                  {show.summary && (
                    <div
                      className="spotlight-summary"
                      dangerouslySetInnerHTML={{ __html: show.summary }}
                    />
                  )}
                  <Link className="spotlight-button" to={`/show/${show.id}`}>
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Footer CTA linking to the Explore page */}
      <div className="featured-footer">
        <Link className="featured-button" to="/explore">
          Explore All Shows
        </Link>
      </div>
    </main>
  )
}

export default Home
