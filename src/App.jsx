// Root component that sets up routing and shares favorites state across all pages.
// Favorites state is managed here via the useFavorites hook and passed down as props.

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Explore from './pages/Explore/Explore'
import ShowDetails from './pages/ShowDetails/ShowDetails'
import Favorites from './pages/Favorites/Favorites'
import useFavorites from './hooks/useFavorites'
import './App.css'

function App() {
  // Shared favorites state persisted to localStorage
  const { favorites, addFavorite, removeFavorite } = useFavorites()

  // Bundle favorites props to pass to every page that needs them
  const favoriteProps = { favorites, addFavorite, removeFavorite }

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          {/* Home page — hero section with search bar and featured shows */}
          <Route path="/" element={<Home {...favoriteProps} />} />

          {/* Explore page — main search/browse page */}
          <Route path="/explore" element={<Explore {...favoriteProps} />} />

          {/* Show details page — displays full info for a single show */}
          <Route path="/show/:id" element={<ShowDetails {...favoriteProps} />} />

          {/* Favorites page — shows all favorited shows from localStorage */}
          <Route path="/favorites" element={<Favorites {...favoriteProps} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
