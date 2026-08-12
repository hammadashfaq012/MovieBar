import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <p className="footer-logo">CineFind</p>
          <p className="footer-description">Discover your next favorite show.</p>
          <div className="footer-socials">
            <button type="button" className="footer-social" aria-label="Twitter">
              X
            </button>
            <button type="button" className="footer-social" aria-label="Facebook">
              f
            </button>
            <button type="button" className="footer-social" aria-label="YouTube">
              ▶
            </button>
          </div>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Quick Links</p>
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/favorites">Favorites</Link>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Discover</p>
          <Link to="/explore">Explore Shows</Link>
          <Link to="/explore?search=popular">Popular Shows</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <p>© 2026 CineFind. All rights reserved.</p>
        <p>Built with React</p>
      </div>
    </footer>
  )
}

export default Footer
