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
  const { favorites, addFavorite, removeFavorite } = useFavorites()

  const favoriteProps = { favorites, addFavorite, removeFavorite }

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home {...favoriteProps} />} />
          <Route path="/explore" element={<Explore {...favoriteProps} />} />
          <Route path="/show/:id" element={<ShowDetails {...favoriteProps} />} />
          <Route path="/favorites" element={<Favorites {...favoriteProps} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
