import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import './NotFound.css'

export default function NotFound() {
  return (
    <>
      <PageHero
        title="Page Not Found"
        subtitle="The page you're looking for doesn't exist or may have moved."
      />

      <section className="section not-found-section">
        <div className="container not-found-content">
          <span className="not-found-code">404</span>
          <p>Let's get you back to something delicious.</p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn--primary">
              <i className="fas fa-house" /> Back to Home
            </Link>
            <Link to="/menu" className="btn btn--outline-dark">
              View Menu <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
