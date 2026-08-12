import ShowCard from '../ShowCard/ShowCard'
import './ShowGrid.css'

function ShowGrid({ shows, favorites, addFavorite, removeFavorite }) {
  return (
    <div className="show-grid">
      {shows.map((show) => (
        <ShowCard
          key={show.id}
          show={show}
          isFavorite={favorites.some((favorite) => favorite.id === show.id)}
          onAddFavorite={() => addFavorite(show)}
          onRemoveFavorite={() => removeFavorite(show.id)}
        />
      ))}
    </div>
  )
}

export default ShowGrid
