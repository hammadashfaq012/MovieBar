import { Link } from 'react-router-dom'
import ShowGrid from '../../components/ShowGrid/ShowGrid'
import './Favorites.css'

function Favorites({ favorites, addFavorite, removeFavorite }) {
  return (
    <main className="favorites">
      <h1>Favorites</h1>

      {favorites.length > 0 ? (
        <ShowGrid
          shows={favorites}
          favorites={favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
      ) : (
        <div className="favorites-empty">
          <p className="favorites-empty-title">No favorites yet.</p>
          <p className="favorites-empty-text">
            Explore shows and add your favorites.
          </p>
          <Link className="favorites-empty-link" to="/explore">
            Explore Shows
          </Link>
        </div>
      )}
    </main>
  )
}

export default Favorites
