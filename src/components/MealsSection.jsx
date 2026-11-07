import { Link } from 'react-router-dom'
import MealCard from './MealCard'
import './MealsSection.css'

const ORDER_SITE = 'https://order.drdiet.fit'

const MEALS = [
  {
    name: 'Juiciest Stuffed Chicken Breast',
    desc: 'Tender chicken breast stuffed and oven-baked, finished with a rich, savoury sauce.',
    protein: '55g Protein',
    price: '₹280',
    diet: 'Non-Veg',
    img: '/brand_assets/meals-section/meal-1.png',
  },
  {
    name: 'Guilt Free Paneer Makhani Bowl',
    desc: 'Creamy makhani paneer over fibre-rich grains — all the comfort, none of the guilt.',
    protein: '32g Protein',
    price: '₹249',
    diet: 'Veg',
    img: '/brand_assets/meals-section/meal-2.png',
  },
  {
    name: 'Quinoa Patty Protein Burger',
    desc: 'A multigrain protein patty loaded between fresh buns with crisp veggies.',
    protein: '28g Protein',
    price: '₹249',
    diet: 'Veg',
    img: '/brand_assets/meals-section/meal-3.png',
  },
]

export default function MealsSection() {
  return (
    <section className="meals-section-v2">
      <div className="container meals-section-v2__inner">
        <div className="meals-section-v2__head">
          <h2 className="meals-section-v2__headline">A Menu Full of Goodness</h2>
          <p className="meals-section-v2__sub">
            Delicious, wholesome meals made with real ingredients, balanced nutrition, and zero boring bites.
          </p>
        </div>

        <div className="meals-section-v2__grid">
          {MEALS.map((m) => (
            <MealCard key={m.name} {...m} orderTo={ORDER_SITE} />
          ))}
        </div>

        <Link to="/menu" className="meals-section-v2__view-all">
          View All <i className="fas fa-arrow-right" />
        </Link>
      </div>
    </section>
  )
}
