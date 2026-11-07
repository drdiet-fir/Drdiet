import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import MealCard from '../components/MealCard'
import PageHero from '../components/PageHero'
import './Menu.css'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )
    root.querySelectorAll('.fade-up').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return ref
}

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'High Protein', 'Low Carb', 'Vegan']

const meals = [
  { id: 1,  name: 'Grilled Chicken Rice Bowl',       price: 249, cat: ['Lunch', 'High Protein'],        protein: 38, diet: 'Non-Veg', desc: 'Grilled chicken over seasoned rice with a fresh side salad.', img: '/brand_assets/Chicken Brown rice Landscape.webp' },
  { id: 2,  name: 'Buckwheat Noodles (Veg)',          price: 199, cat: ['Lunch', 'Vegan', 'Low Carb'],   protein: 14, diet: 'Veg',     desc: 'Stir-fried buckwheat noodles tossed with crisp vegetables.', img: '/brand_assets/Veg buckweat noodles.webp' },
  { id: 3,  name: 'Chicken Tikka Wrap',               price: 249, cat: ['Lunch', 'High Protein'],        protein: 36, diet: 'Non-Veg', desc: 'Smoky chicken tikka rolled in a soft multigrain wrap.', img: '/brand_assets/Chicken Tikka Wrap.webp' },
  { id: 4,  name: 'High Protein Chilly Chicken',      price: 249, cat: ['Dinner', 'High Protein'],       protein: 42, diet: 'Non-Veg', desc: 'Pan-tossed chicken in a bold, spicy chilly sauce.', img: '/brand_assets/Chilli chicken.webp' },
  { id: 5,  name: 'Quinoa Patty Protein Burger',      price: 249, cat: ['Lunch', 'Vegan'],               protein: 22, diet: 'Veg',     desc: 'A multigrain protein patty loaded between fresh buns with crisp veggies.', img: '/brand_assets/Quinoa Patty Burger.webp' },
  { id: 6,  name: 'Stuffed Chicken Breast',           price: 280, cat: ['Dinner', 'High Protein'],       protein: 46, diet: 'Non-Veg', desc: 'Tender chicken breast stuffed and oven-baked, finished with a rich, savoury sauce.', img: '/brand_assets/Juiciest stuffed chicken breast.webp' },
  { id: 7,  name: 'Nutella Protein Pancakes',         price: 249, cat: ['Breakfast', 'Snacks'],          protein: 28, diet: 'Veg',     desc: 'Fluffy protein pancakes drizzled with a hint of Nutella.', img: '/brand_assets/Nuttela Pancake.webp' },
  { id: 8,  name: 'Grilled Paneer Protein Bowl',      price: 249, cat: ['Lunch', 'High Protein'],        protein: 32, diet: 'Veg',     desc: 'Grilled paneer and veggies over a protein-rich grain base.', img: '/brand_assets/achari paneer bowl.webp' },
  { id: 9,  name: 'Thai Chili Fish Rice Bowl',        price: 349, cat: ['Dinner', 'High Protein'],       protein: 38, diet: 'Non-Veg', desc: 'Flaky fish in a Thai chilli glaze over fragrant rice.', img: '/brand_assets/Thai curry bowl.webp' },
  { id: 10, name: 'Mexican Protein Wrap',             price: 249, cat: ['Lunch'],                        protein: 32, diet: 'Non-Veg', desc: 'A multigrain wrap with grilled chicken, beans, and salsa.', img: '/brand_assets/Maxican Protein Wrap.webp' },
  { id: 11, name: 'Double Paneer Tikka Sandwich',     price: 199, cat: ['Snacks', 'Lunch'],              protein: 26, diet: 'Veg',     desc: 'Toasted sandwich loaded with double paneer tikka filling.', img: '/brand_assets/Double panner tikka sandwich.webp' },
  { id: 12, name: 'Chickpea Curry Bowl',              price: 249, cat: ['Dinner', 'Vegan'],              protein: 18, diet: 'Veg',     desc: 'A comforting chickpea curry over fibre-rich grains.', img: '/brand_assets/curried chole bowl.webp' },
]

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useReveal()

  const filtered = activeCategory === 'All'
    ? meals
    : meals.filter((m) => m.cat.includes(activeCategory))

  useLayoutEffect(() => {
    if (!ref.current) return
    ref.current.querySelectorAll('.fade-up').forEach((el) => el.classList.add('visible'))
  }, [activeCategory])

  return (
    <>
      <PageHero
        title="Real Food That Fuels Real Results"
        subtitle="Every dish is calorie-counted, macro-balanced, and genuinely delicious. Updated weekly to keep things exciting."
      />

      <section className="section menu-section" ref={ref}>
        <div className="container">
          {/* Filter */}
          <div className="menu-filters-row">
            <div className="menu-filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`menu-filter-btn ${activeCategory === cat ? 'menu-filter-btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <a href="/brand_assets/DR DIET MENU.pdf" target="_blank" rel="noopener noreferrer" className="menu-pdf-btn">
              Restaurant Menu <i className="fas fa-arrow-right" />
            </a>
          </div>

          {/* Grid */}
          <div className="menu-grid">
            {filtered.map((meal, i) => (
              <div key={meal.id} className={`fade-up stagger-${(i % 4) + 1}`}>
                <MealCard
                  name={meal.name}
                  desc={meal.desc}
                  img={meal.img}
                  protein={`${meal.protein}g Protein`}
                  price={`₹${meal.price}`}
                  diet={meal.diet}
                  orderTo="/subscription#get-started"
                />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="menu-empty">
              <i className="fas fa-search" />
              <p>No meals in this category yet. Check back soon!</p>
            </div>
          )}

          <div className="menu-note">
            <i className="fas fa-info-circle" />
            <p>This is a sample menu. Your actual meals are <strong>fully customized</strong> to your caloric goals and preferences. Menus rotate weekly.</p>
          </div>
        </div>
      </section>
    </>
  )
}
