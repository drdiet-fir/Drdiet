import { Link } from 'react-router-dom'
import MealCard from './MealCard'
import './MealsSection.css'

const ORDER_SITE = 'https://order.drdiet.fit'

const MEALS = [
  {
    name: 'Artisan Stuffed Chicken Breast',
    desc: 'Tender chicken breast stuffed and oven-baked, finished with a rich, savoury sauce.',
    protein: '65g Protein',
    price: '₹299',
    diet: 'Non-Veg',
    img: '/brand_assets/menu/Artisan Stuffed Chicken Breast.webp',
  },
  {
    name: 'Healthy Stuffed Paneer',
    desc: 'Paneer stuffed and baked for a wholesome, protein-rich meal.',
    protein: '34g Protein',
    price: '₹299',
    diet: 'Veg',
    img: '/brand_assets/menu/Healthy Stuffed Paneer.webp',
  },
  {
    name: 'Chicken Tikka Wrap',
    desc: 'Smoky chicken tikka rolled in a soft multigrain wrap.',
    protein: '25.5g Protein',
    price: '₹249',
    diet: 'Non-Veg',
    img: '/brand_assets/menu/Chicken Tikka Wrap.webp',
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
