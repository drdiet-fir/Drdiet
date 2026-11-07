import { Link } from 'react-router-dom'
import './MealCard.css'

export default function MealCard({ name, desc, img, protein, price, diet, orderTo }) {
  return (
    <div className="meal-card-v2">
      <div className="meal-card-v2__image">
        <img src={img} alt={name} loading="lazy" />
      </div>
      <div className="meal-card-v2__content">
        <div className="meal-card-v2__title-row">
          <h3>{name}</h3>
          <Link to={orderTo} className="meal-card-v2__order">
            Order <i className="fas fa-arrow-right" />
          </Link>
        </div>
        <p className="meal-card-v2__desc">{desc}</p>
        <img className="meal-card-v2__divider" src="/brand_assets/meals-section/divider.svg" alt="" />
        <div className="meal-card-v2__meta">
          <span>{protein}</span>
          <span>{price}</span>
          <span>{diet}</span>
        </div>
      </div>
    </div>
  )
}
