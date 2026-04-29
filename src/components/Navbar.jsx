import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Menu', path: '/menu' },
  { label: 'Subscriptions', path: '/subscription' },
  { label: 'Locations', path: '/locations' },
  {
    label: 'Join Us',
    path: '/join-us',
    children: [
      { label: 'Franchise', path: '/join-us#franchise' },
      { label: 'Catering', path: '/join-us#catering' },
      { label: 'B2B', path: '/join-us#b2b' },
    ],
  },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img
            src="/logo-black.png"
            alt="Dr Diet – Eat What's Right"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.path}
                className="navbar__dropdown-wrapper"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <NavLink to={link.path} className="navbar__link">
                  {link.label}
                  <i className="fas fa-chevron-down navbar__chevron" />
                </NavLink>
                {dropdownOpen && (
                  <div className="navbar__dropdown">
                    {link.children.map((child) => (
                      <Link key={child.path} to={child.path} className="navbar__dropdown-item">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
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
          )}
        </nav>

        {/* CTA */}
        <div className="navbar__actions">
          <Link to="/subscription" className="btn btn--primary btn--sm">
            Start Your Plan
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
              {link.children && (
                <div className="navbar__mobile-sub">
                  {link.children.map((child) => (
                    <Link key={child.path} to={child.path} className="navbar__mobile-sublink">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link to="/subscription" className="btn btn--primary" style={{ marginTop: '24px' }}>
            Start Your Plan
          </Link>
        </nav>
      </div>
    </header>
  )
}
