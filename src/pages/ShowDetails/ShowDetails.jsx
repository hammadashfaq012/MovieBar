import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getShowById } from '../../api/api'
import { handleImageError } from '../../utils/image'
import './ShowDetails.css'

function ShowDetails({ favorites, addFavorite, removeFavorite }) {
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadShow() {
      setLoading(true)
      setError('')

      try {
        const data = await getShowById(id)
        setShow(data)
      } catch {
        setError('Something went wrong. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadShow()
  }, [id])

  if (loading) {
    return (
      <main className="show-details">
        <p className="show-details-message">Loading show...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="show-details">
        <p className="show-details-message show-details-error">{error}</p>
      </main>
    )
  }

  if (!show) {
    return null
  }

  const isFavorite = favorites.some((favorite) => favorite.id === show.id)
  const plainSummary = show.summary ? show.summary.replace(/<[^>]*>/g, '') : ''

  function handleFavoriteClick() {
    if (isFavorite) {
      removeFavorite(show.id)
    } else {
      addFavorite(show)
    }
  }

  return (
    <main className="show-details">
      <Link className="details-back" to="/explore">
        ← Back to Explore
      </Link>

      <div className="details-card">
        <div className="details-poster">
          {show.image?.original || show.image?.medium ? (
            <img
              className="details-poster-img"
              src={show.image?.original || show.image?.medium}
              alt={show.name}
              data-placeholder-class="details-poster-placeholder"
              onError={handleImageError}
            />
          ) : (
            <div className="details-poster-placeholder">No Image</div>
          )}
        </div>

        <div className="details-info">
          <h1 className="details-title">{show.name}</h1>

          <p className="details-rating">
            <span className="details-star">★</span>{' '}
            {show.rating && show.rating.average ? show.rating.average : 'N/A'}
          </p>

          <p className="details-genres">
            {show.genres && show.genres.length > 0
              ? show.genres.join(' • ')
              : 'Genre not available'}
          </p>

          <div className="details-meta">
            {show.language && (
              <p className="details-meta-item">Language: {show.language}</p>
            )}
            {show.status && (
              <p className="details-meta-item">Status: {show.status}</p>
            )}
            {show.runtime && (
              <p className="details-meta-item">
                Runtime: {show.runtime} minutes
              </p>
            )}
          </div>

          {show.officialSite && (
            <a
              className="details-link"
              href={show.officialSite}
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Website
            </a>
          )}

          {plainSummary && (
            <p className="details-summary">{plainSummary}</p>
          )}

          <button
            type="button"
            className={
              isFavorite ? 'details-button is-favorite' : 'details-button'
            }
            onClick={handleFavoriteClick}
          >
            {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default ShowDetails
