import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">CineFind</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/manage">Manage</Link>
      </div>
    </nav>
  )
}

export default Navbar
