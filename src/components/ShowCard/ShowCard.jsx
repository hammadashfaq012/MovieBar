import { Link } from 'react-router-dom'
import './ShowCard.css'

function ShowCard({ show, isFavorite, onAddFavorite, onRemoveFavorite }) {
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
