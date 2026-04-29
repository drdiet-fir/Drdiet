import { Link } from 'react-router-dom'
import './Footer.css'

const currentYear = new Date().getFullYear()

const footerLinks = {
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Media / Gallery', path: '/media' },
    { label: 'Contact Us', path: '/contact' },
  ],
  Plans: [
    { label: 'Subscription Plans', path: '/subscription' },
    { label: 'Our Menu', path: '/menu' },
    { label: 'Locations', path: '/locations' },
    { label: 'Testimonials', path: '/testimonials' },
  ],
  'Join Us': [
    { label: 'Franchise', path: '/join-us#franchise' },
    { label: 'Catering Services', path: '/join-us#catering' },
    { label: 'B2B Partnerships', path: '/join-us#b2b' },
  ],
}

const socials = [
  { icon: 'fab fa-instagram', href: 'https://instagram.com/drdiet.fit', label: 'Instagram' },
  { icon: 'fab fa-whatsapp', href: 'https://wa.me/917015732242', label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          {/* Brand column */}
          <div className="footer__brand">
            <Link to="/">
              <img src="/logo-white.png" alt="Dr Diet" className="footer__logo" />
            </Link>
            <p className="footer__tagline">
              Eat What's Right. Transform your health through science-backed
              nutrition, delivered fresh to your door every day.
            </p>
            <div className="footer__socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer__social"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer__col">
              <h4 className="footer__col-title">{title}</h4>
              <ul className="footer__col-links">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <ul className="footer__contact-list">
              <li>
                <i className="fas fa-phone" />
                <a href="tel:+917015732242">+91 70157 32242</a>
              </li>
              <li>
                <i className="fab fa-whatsapp" />
                <a href="https://wa.me/917015732242" target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </li>
              <li>
                <i className="fas fa-envelope" />
                <a href="mailto:drdietdelhi@gmail.com">drdietdelhi@gmail.com</a>
              </li>
              <li>
                <i className="fas fa-map-marker-alt" />
                <span>Sector 70, Mohali 160071<br />Delhi · Gurgaon · Noida · Chandigarh · Bengaluru</span>
              </li>
              <li>
                <i className="fas fa-motorcycle" />
                <span>Order on Swiggy &amp; Zomato</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {currentYear} Dr Diet. All rights reserved. | Eat What's Right.</p>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
