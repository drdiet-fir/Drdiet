import { useState, useEffect, useRef } from 'react'
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
  { id: 1,  name: 'Grilled Chicken Rice Bowl',       price: 249, cat: ['Lunch', 'High Protein'],        cal: 420, protein: 38, carbs: 42, fat: 10, tag: 'Best Seller', img: '/brand_assets/Chicken Brown rice Landscape.webp' },
  { id: 2,  name: 'Buckwheat Noodles (Veg)',          price: 199, cat: ['Lunch', 'Vegan', 'Low Carb'],   cal: 320, protein: 14, carbs: 52, fat:  8, tag: null,         img: '/brand_assets/Veg buckweat noodles.webp' },
  { id: 3,  name: 'Chicken Tikka Wrap',               price: 249, cat: ['Lunch', 'High Protein'],        cal: 460, protein: 36, carbs: 40, fat: 12, tag: null,         img: '/brand_assets/Chicken Tikka Wrap.webp' },
  { id: 4,  name: 'High Protein Chilly Chicken',      price: 249, cat: ['Dinner', 'High Protein'],       cal: 450, protein: 42, carbs: 18, fat: 16, tag: 'High Protein', img: '/brand_assets/Chilli chicken.webp' },
  { id: 5,  name: 'Quinoa Patty Burger',              price: 249, cat: ['Lunch', 'Vegan'],               cal: 420, protein: 22, carbs: 48, fat: 14, tag: 'Vegan',       img: '/brand_assets/Quinoa Patty Burger.webp' },
  { id: 6,  name: 'Stuffed Chicken Breast',           price: 280, cat: ['Dinner', 'High Protein'],       cal: 480, protein: 46, carbs: 12, fat: 22, tag: null,         img: '/brand_assets/Juiciest stuffed chicken breast.webp' },
  { id: 7,  name: 'Nutella Protein Pancakes',         price: 249, cat: ['Breakfast', 'Snacks'],          cal: 380, protein: 28, carbs: 44, fat: 12, tag: 'Fan Fav',     img: '/brand_assets/Nuttela Pancake.webp' },
  { id: 8,  name: 'Grilled Paneer Protein Bowl',      price: 249, cat: ['Lunch', 'High Protein'],        cal: 420, protein: 32, carbs: 30, fat: 18, tag: null,         img: '/brand_assets/achari paneer bowl.webp' },
  { id: 9,  name: 'Thai Chili Fish Rice Bowl',        price: 349, cat: ['Dinner', 'High Protein'],       cal: 480, protein: 38, carbs: 46, fat: 12, tag: 'Premium',     img: '/brand_assets/Thai curry bowl.webp' },
  { id: 10, name: 'Mexican Protein Wrap',             price: 249, cat: ['Lunch'],                        cal: 440, protein: 32, carbs: 44, fat: 14, tag: null,         img: '/brand_assets/Maxican Protein Wrap.webp' },
  { id: 11, name: 'Double Paneer Tikka Sandwich',     price: 199, cat: ['Snacks', 'Lunch'],              cal: 380, protein: 26, carbs: 38, fat: 14, tag: null,         img: '/brand_assets/Double panner tikka sandwich.webp' },
  { id: 12, name: 'Chickpea Curry Bowl',              price: 249, cat: ['Dinner', 'Vegan'],              cal: 380, protein: 18, carbs: 52, fat: 10, tag: 'Vegan',       img: '/brand_assets/curried chole bowl.webp' },
]

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useReveal()

  const filtered = activeCategory === 'All'
    ? meals
    : meals.filter((m) => m.cat.includes(activeCategory))

  useEffect(() => {
    if (!ref.current) return
    ref.current.querySelectorAll('.fade-up').forEach((el) => el.classList.add('visible'))
  }, [activeCategory])

  return (
    <>
      <section className="page-hero menu-hero">
        <div className="container">
          <span className="section-label section-label--white">Our Menu</span>
          <h1>Real Food That<br />Fuels Real Results</h1>
          <p>Every dish is calorie-counted, macro-balanced, and genuinely delicious. Updated weekly to keep things exciting.</p>
        </div>
      </section>

      <section className="section menu-section" ref={ref}>
        <div className="container">
          {/* Filter */}
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

          {/* Grid */}
          <div className="menu-grid">
            {filtered.map((meal, i) => (
              <div key={meal.id} className={`menu-card fade-up stagger-${(i % 4) + 1}`}>
                <div className="menu-card__image">
                  <img src={meal.img} alt={meal.name} loading="lazy" />
                  {meal.tag && <span className="menu-card__tag">{meal.tag}</span>}
                  <div className="menu-card__calories">
                    <i className="fas fa-fire" /> {meal.cal} kcal
                  </div>
                </div>
                <div className="menu-card__body">
                  <div className="menu-card__header-row">
                    <h4 className="menu-card__name">{meal.name}</h4>
                    <span className="menu-card__price">₹{meal.price}</span>
                  </div>
                  <div className="menu-card__macros">
                    <div className="menu-card__macro">
                      <span>{meal.protein}g</span>
                      <label>Protein</label>
                    </div>
                    <div className="menu-card__macro-divider" />
                    <div className="menu-card__macro">
                      <span>{meal.carbs}g</span>
                      <label>Carbs</label>
                    </div>
                    <div className="menu-card__macro-divider" />
                    <div className="menu-card__macro">
                      <span>{meal.fat}g</span>
                      <label>Fat</label>
                    </div>
                  </div>
                  <div className="menu-card__cats">
                    {meal.cat.map((c) => (
                      <span key={c} className="menu-card__cat-badge">{c}</span>
                    ))}
                  </div>
                </div>
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
