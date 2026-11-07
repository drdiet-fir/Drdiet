import { Link } from 'react-router-dom'
import './CitiesSection.css'

const CITIES = [
  { name: 'Delhi', img: '/brand_assets/cities/city-1.png', path: '/healthy-meal-plan-delhi' },
  { name: 'Gurgaon', img: '/brand_assets/cities/city-2.png', path: '/diet-food-gurgaon' },
  { name: 'Bengaluru', img: '/brand_assets/cities/city-3.png', path: '/weight-loss-meals-bangalore' },
  { name: 'Noida', img: '/brand_assets/cities/city-4.png', path: '/locations' },
  { name: 'Mohali', img: '/brand_assets/cities/city-5.png', path: '/locations' },
  { name: 'Chandigarh', img: '/brand_assets/cities/city-6.png', path: '/healthy-meals-chandigarh' },
]

export default function CitiesSection() {
  return (
    <section className="cities-section">
      <div className="container cities-section__inner">
        <h2 className="cities-section__headline">Loved By Cities</h2>

        <div className="cities-section__grid">
          {CITIES.map((c) => (
            <Link to={c.path} className="city-card" key={c.name}>
              <div className="city-card__frame">
                <div className="city-card__image">
                  <img src={c.img} alt={c.name} />
                </div>
                <div className="city-card__footer">
                  <div className="city-card__label">{c.name}</div>
                  <span className="city-card__directions">
                    Directions <i className="fas fa-location-arrow" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
