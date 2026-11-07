import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinksLeft = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Menu', path: '/menu' },
  { label: 'Locations', path: '/locations' },
]

const navLinksRight = [
  { label: 'Subscription', path: '/subscription' },
  { label: 'Join Us', path: '/join-us' },
  { label: 'Contact', path: '/contact' },
]

const navLinks = [...navLinksLeft, ...navLinksRight]

const PROMO_MESSAGE = 'Offer Live'
const promoItems = Array.from({ length: 8 })

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const renderLink = (link) => (
    <NavLink
      key={link.path}
      to={link.path}
      className={({ isActive }) =>
        `navbar__link ${isActive ? 'navbar__link--active' : ''}`
      }
      end={link.path === '/'}
    >
      {link.label}
    </NavLink>
  )

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      {/* Promo bar */}
      <div className="navbar__promo">
        <div className="navbar__promo-track">
          {[...promoItems, ...promoItems].map((_, i) => (
            <span className="navbar__promo-item" key={i}>
              <i className="fas fa-circle" />
              {PROMO_MESSAGE}
            </span>
          ))}
        </div>
      </div>

      <div className="navbar__row">
        <div className="navbar__row-inner">
          {/* Desktop Nav – left */}
          <nav className="navbar__nav navbar__nav--left" aria-label="Main navigation">
            {navLinksLeft.map(renderLink)}
          </nav>

          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <img
              src="/logo-primary.png"
              alt="Dr Diet – Eat What's Right"
            />
          </Link>

          {/* Desktop Nav – right + CTA */}
          <div className="navbar__right">
            <nav className="navbar__nav navbar__nav--right" aria-label="Secondary navigation">
              {navLinksRight.map(renderLink)}
            </nav>

            <div className="navbar__actions">
              <Link to="/subscription#get-started" className="btn btn--dark btn--sm navbar__order">
                Order
              </Link>

              {/* Hamburger */}
              <button
                className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        <nav className="navbar__mobile-nav" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <div key={link.path}>
              <NavLink
                to={link.path}
                className="navbar__mobile-link"
                end={link.path === '/'}
              >
                {link.label}
              </NavLink>
            </div>
          ))}
          <Link to="/subscription" className="btn btn--primary" style={{ marginTop: '24px' }}>
            Order Now
          </Link>
        </nav>
      </div>
    </header>
  )
}
