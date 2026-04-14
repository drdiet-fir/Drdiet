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
  { id: 1, name: 'Grilled Salmon Power Bowl', cat: ['Lunch', 'High Protein'], cal: 480, protein: 42, carbs: 28, fat: 18, tag: 'Best Seller', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' },
  { id: 2, name: 'Overnight Oats with Berries', cat: ['Breakfast'], cal: 340, protein: 18, carbs: 45, fat: 8, tag: 'Fan Fav', img: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&q=80' },
  { id: 3, name: 'Chicken Shawarma Wrap', cat: ['Lunch'], cal: 520, protein: 38, carbs: 42, fat: 14, tag: null, img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80' },
  { id: 4, name: 'Zucchini Bolognese', cat: ['Dinner', 'Low Carb'], cal: 420, protein: 35, carbs: 12, fat: 22, tag: 'Low Carb', img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80' },
  { id: 5, name: 'Quinoa Veggie Power Bowl', cat: ['Lunch', 'Vegan'], cal: 380, protein: 22, carbs: 48, fat: 10, tag: 'Vegan', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' },
  { id: 6, name: 'Beef Kofta with Roasted Veg', cat: ['Dinner', 'High Protein'], cal: 560, protein: 45, carbs: 22, fat: 28, tag: 'Bulk Gain', img: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80' },
  { id: 7, name: 'Greek Yogurt Parfait', cat: ['Breakfast', 'Snacks'], cal: 280, protein: 20, carbs: 28, fat: 8, tag: null, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' },
  { id: 8, name: 'Grilled Chicken Caesar', cat: ['Lunch', 'High Protein'], cal: 450, protein: 40, carbs: 18, fat: 20, tag: null, img: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&q=80' },
  { id: 9, name: 'Lemon Herb Sea Bass', cat: ['Dinner'], cal: 400, protein: 38, carbs: 14, fat: 16, tag: 'Premium', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80' },
  { id: 10, name: 'Protein Energy Balls', cat: ['Snacks', 'High Protein'], cal: 180, protein: 12, carbs: 16, fat: 7, tag: null, img: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=400&q=80' },
  { id: 11, name: 'Avocado Egg Toast', cat: ['Breakfast'], cal: 360, protein: 22, carbs: 30, fat: 18, tag: null, img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80' },
  { id: 12, name: 'Chickpea Curry Bowl', cat: ['Dinner', 'Vegan'], cal: 440, protein: 18, carbs: 55, fat: 14, tag: 'Vegan', img: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80' },
]

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useReveal()

  const filtered = activeCategory === 'All'
    ? meals
    : meals.filter((m) => m.cat.includes(activeCategory))

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
                  <h4 className="menu-card__name">{meal.name}</h4>
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
