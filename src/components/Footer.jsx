import { Link } from 'react-router-dom'
import './Footer.css'

const currentYear = new Date().getFullYear()

const footerLinks = {
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Media/Gallery', path: '/media' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Menu', href: '/brand_assets/DR DIET MENU.pdf' },
  ],
  Plans: [
    { label: 'Subscription Plans', path: '/subscription' },
    { label: 'Nutritional Blog', path: '/blog' },
  ],
  'Join Us': [
    { label: 'Franchise', path: '/join-us#franchise' },
    { label: 'Corporate Services', path: '/join-us#corporate' },
    { label: 'Careers', path: '/join-us#careers' },
  ],
}

const socials = [
  { icon: 'fab fa-linkedin-in', href: '#', label: 'LinkedIn' },
  { icon: 'fab fa-facebook-f', href: '#', label: 'Facebook' },
  { icon: 'fab fa-instagram', href: 'https://instagram.com/drdiet.fit', label: 'Instagram' },
  { icon: 'fab fa-whatsapp', href: 'https://wa.me/917015732242', label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="container footer__top">
          {/* Brand column */}
          <div className="footer__brand">
            <Link to="/">
              <img src="/logo-primary.png" alt="Dr Diet" className="footer__logo" />
            </Link>

            <ul className="footer__contact-list">
              <li>
                <i className="fas fa-map-marker-alt" />
                <span>Bengaluru | Delhi | Gurgaon | Noida | Mohali | Chandigarh</span>
              </li>
              <li>
                <i className="fas fa-phone" />
                <a href="tel:+917015732242">+91 70157 32242</a>
              </li>
              <li>
                <i className="fas fa-envelope" />
                <a href="mailto:drdietdelhi@gmail.com">drdietdelhi@gmail.com</a>
              </li>
            </ul>

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
          <div className="footer__menu">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="footer__col">
                <h4 className="footer__col-title">{title}</h4>
                <ul className="footer__col-links">
                  {links.map((link) => (
                    <li key={link.path || link.href}>
                      {link.href ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.path}>{link.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <img className="footer__watermark" src="/brand_assets/Brand signature.svg" alt="" aria-hidden="true" />
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {currentYear} - All rights reserved. Designed and Developed by Odd Lemon Design Studio</p>
          <div className="footer__legal">
            <Link to="/terms">Terms &amp; Conditions</Link>
            <span className="footer__legal-divider" />
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
