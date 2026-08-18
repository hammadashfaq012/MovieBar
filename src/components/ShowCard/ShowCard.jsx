// Displays a single show as a card with poster, title, rating, and genres.
// Clicking the card navigates to the show details page.
// Includes a favorite toggle button that prevents navigation when clicked.

import { Link } from 'react-router-dom'
import './ShowCard.css'

function ShowCard({ show, isFavorite, onAddFavorite, onRemoveFavorite }) {
  // Toggle favorite without navigating to the show details page
  function handleFavoriteClick(event) {
    event.preventDefault()
    event.stopPropagation()

    if (isFavorite) {
      onRemoveFavorite()
    } else {
      onAddFavorite()
    }
  }

  const favoriteLabel = isFavorite
    ? `Remove ${show.name} from favorites`
    : `Add ${show.name} to favorites`

  return (
    <article className="show-card">
      <Link className="show-card-link" to={`/show/${show.id}`}>
        {/* Show poster image, or a placeholder if no image exists */}
        <div className="show-card-poster">
          {show.image && show.image.medium ? (
            <img
              className="show-card-image"
              src={show.image.medium}
              alt={show.name}
            />
          ) : (
            <div className="show-card-placeholder">No Image</div>
          )}
        </div>

        <div className="show-card-content">
          <h3 className="show-card-title">{show.name}</h3>
          <p className="show-card-rating">
            <span className="show-card-star">★</span>{' '}
            {show.rating && show.rating.average
              ? show.rating.average
              : 'N/A'}
          </p>
          <p className="show-card-genres">
            {show.genres && show.genres.length > 0
              ? show.genres.join(' • ')
              : 'Genre not available'}
          </p>
        </div>
      </Link>

      {/* Favorite toggle button (heart icon) */}
      <button
        type="button"
        className={isFavorite ? 'show-card-button is-favorite' : 'show-card-button'}
        onClick={handleFavoriteClick}
        aria-label={favoriteLabel}
        title={favoriteLabel}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
    </article>
  )
}

export default ShowCard
