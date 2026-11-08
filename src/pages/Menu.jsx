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

const ORDER_SITE = 'https://order.drdiet.fit'

const meals = [
  { id: 1,  name: 'Stuffed Moong Dal Chilla',           price: 249, cat: ['Breakfast'],                  protein: 18,   diet: 'Veg',     desc: 'A savoury moong dal chilla stuffed with a wholesome filling.', img: '/brand_assets/menu/Stuffed Moong Dal Chilla.webp', slug: 'stuffed-moong-dal-chilla' },
  { id: 2,  name: 'Nutella Protein Pancakes',           price: 249, cat: ['Breakfast', 'Snacks'],        protein: 22,   diet: 'Veg',     desc: "Guilt-free stack with house Nutella and fresh fruit — founder's favourite.", img: '/brand_assets/menu/Nutella Protein Pancakes.webp', slug: 'nutella-protein-pancakes' },
  { id: 3,  name: 'Chicken Tikka Wrap',                 price: 249, cat: ['Lunch', 'High Protein'],      protein: 25.5, diet: 'Non-Veg', desc: 'Smoky chicken tikka rolled in a soft multigrain wrap.', img: '/brand_assets/menu/Chicken Tikka Wrap.webp', slug: 'premium-healthy-whole-wheat-chicken-tikka-wrap' },
  { id: 4,  name: 'Tofu Tikka Wrap',                    price: 199, cat: ['Lunch', 'Vegan'],             protein: 14,   diet: 'Veg',     desc: 'Smoky tofu tikka rolled in a soft multigrain wrap.', img: '/brand_assets/menu/Tofu Tikka Wrap.webp', slug: 'premium-healthy-whole-wheat-tofu-grilled-wrap' },
  { id: 5,  name: 'Baked Falafel Wrap',                 price: 249, cat: ['Lunch', 'High Protein'],      protein: 13,   diet: 'Veg',     desc: 'Crisp baked falafel rolled in a soft wrap with fresh veggies.', img: '/brand_assets/menu/Baked Falafel Wrap.webp', slug: 'baked-falafel-hummus' },
  { id: 6,  name: 'Artisan Stuffed Chicken Breast',     price: 299, cat: ['Dinner', 'High Protein'],     protein: 65,   diet: 'Non-Veg', desc: 'Tender chicken breast stuffed and oven-baked, finished with a rich, savoury sauce.', img: '/brand_assets/menu/Artisan Stuffed Chicken Breast.webp', slug: 'artisan-stuffed-chicken-breast' },
  { id: 7,  name: 'Half Pound Chicken Breast Meal',     price: 299, cat: ['Dinner', 'High Protein'],     protein: 55,   diet: 'Non-Veg', desc: 'A hearty half-pound portion of seasoned, grilled chicken breast.', img: '/brand_assets/menu/Half Pound Chicken Breast Meal.webp', slug: 'half-pound-chicken-breast-meal' },
  { id: 8,  name: 'Steamed Chicken Hummus Salad',       price: 299, cat: ['Lunch', 'High Protein'],      protein: 53,   diet: 'Non-Veg', desc: 'Steamed chicken served over a fresh hummus salad.', img: '/brand_assets/menu/Steamed Chicken Hummus Salad.webp', slug: 'steamed-chicken-hummus-salad' },
  { id: 9,  name: 'Baked Creamy Chicken with Mushroom & Paprika', price: 299, cat: ['Dinner', 'High Protein'], protein: 54, diet: 'Non-Veg', desc: 'Oven-baked chicken in a creamy mushroom and paprika sauce.', img: '/brand_assets/menu/Baked Creamy Chicken with Mushroom & Paprika.webp', slug: 'baked-creamy-chicken-breast-peprika-with-mushroom' },
  { id: 10, name: 'Healthy Stuffed Paneer',             price: 299, cat: ['Dinner', 'High Protein'],     protein: 34,   diet: 'Veg',     desc: 'Paneer stuffed and baked for a wholesome, protein-rich meal.', img: '/brand_assets/menu/Healthy Stuffed Paneer.webp', slug: 'mediterranean-stuffed-paneer' },
  { id: 11, name: 'Half Pound Paneer & Veggies',        price: 299, cat: ['Dinner', 'High Protein'],     protein: 42,   diet: 'Veg',     desc: 'A generous half-pound serving of grilled paneer with fresh veggies.', img: '/brand_assets/menu/Half Pound Paneer & Veggies.webp', slug: 'veg-protein-meal-half-pound' },
  { id: 12, name: 'Arrabiata Veg Protein Pasta',        price: 299, cat: ['Lunch', 'High Protein'],      protein: 26,   diet: 'Veg',     desc: 'Whole wheat pasta with fresh veggies, your choice of protein, and a spicy arrabiata sauce.', img: '/brand_assets/menu/Arrabiata Veg Protein Pasta.webp', slug: null },
  { id: 13, name: 'Mashed Potatoes Comfort Bowl (Veg)', price: 299, cat: ['Dinner'],                      protein: 18,   diet: 'Veg',     desc: 'Build-your-own comfort bowl with mashed potato and grilled paneer.', img: '/brand_assets/menu/Mashed Patatoes Comfort Bowl(Veg).webp', slug: 'mashed-potatoes-comfort-bowl-veg' },
  { id: 14, name: 'Mashed Potatoes Comfort Bowl (Non-Veg)', price: 299, cat: ['Dinner', 'High Protein'],  protein: 27,   diet: 'Non-Veg', desc: 'Build-your-own comfort bowl with mashed potato and steamed chicken.', img: '/brand_assets/menu/Mashed Potatoes Comfort Bowl(Non Veg).webp', slug: 'mashed-potatoes-comfort-bowl-non-veg' },
  { id: 15, name: 'Veg Protein Burrito Bowl',           price: 349, cat: ['Lunch', 'High Protein'],      protein: 19,   diet: 'Veg',     desc: 'Build-your-own burrito bowl with grilled paneer, rice and your choice of sauce.', img: '/brand_assets/menu/Veg Protein Burrito Bowl.webp', slug: null },
  { id: 16, name: 'Veg Protein Burrito Wrap',           price: 349, cat: ['Lunch', 'High Protein'],      protein: 19,   diet: 'Veg',     desc: 'Build-your-own burrito wrap with grilled paneer and your choice of sauce.', img: '/brand_assets/menu/Veg Protein Burrito Wrap.webp', slug: null },
  { id: 17, name: 'Chicken Burrito Bowl – Muscle Builder', price: 349, cat: ['Lunch', 'High Protein'],   protein: 28,   diet: 'Non-Veg', desc: 'Build-your-own burrito bowl with steamed chicken, rice and your choice of sauce.', img: '/brand_assets/menu/Chicken Burrito Bowl - Muscle Builder Full Meal.webp', slug: null },
  { id: 18, name: 'Chicken Burrito Wrap – Muscle Builder', price: 349, cat: ['Lunch', 'High Protein'],   protein: 28,   diet: 'Non-Veg', desc: 'Build-your-own burrito wrap with steamed chicken and your choice of sauce.', img: '/brand_assets/menu/Chicken Burrito Wrap - Muscle Builder.webp', slug: null },
  { id: 19, name: 'ABC Juice (Apple Beetroot Carrot)',  price: 249, cat: ['Snacks'],                     protein: 2,    diet: 'Veg',     desc: 'A refreshing cold-pressed juice of apple, beetroot and carrot.', img: '/brand_assets/menu/ABC Juice(Apple Beetroot Carrot).webp', slug: null },
  { id: 20, name: 'Sattu Protein Shake',                price: 249, cat: ['Snacks'],                     protein: 18,   diet: 'Veg',     desc: 'A traditional sattu-based protein shake.', img: '/brand_assets/menu/Sattu Protein Shake.webp', slug: null },
  { id: 21, name: 'Banana Walnut Shake',                price: 249, cat: ['Snacks'],                     protein: 10,   diet: 'Veg',     desc: 'A protein-rich shake blended with banana and walnuts.', img: '/brand_assets/menu/Banana Walnut Shake.webp', slug: 'golden-crunch-banana-walnut-protein-shake' },
  { id: 22, name: 'Avocado Smoothie',                   price: 349, cat: ['Snacks'],                     protein: 5,    diet: 'Veg',     desc: 'A creamy, nutrient-rich avocado smoothie.', img: '/brand_assets/menu/Avocado Smoothie.webp', slug: null },
]

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useReveal()
  const filtersRef = useRef(null)
  const dragRef = useRef(null)
  const draggedRef = useRef(false)

  const filtered = activeCategory === 'All'
    ? meals
    : meals.filter((m) => m.cat.includes(activeCategory))

  useLayoutEffect(() => {
    if (!ref.current) return
    ref.current.querySelectorAll('.fade-up').forEach((el) => el.classList.add('visible'))
  }, [activeCategory])

  // Click-and-drag to scroll the filter row (touch uses native scrolling).
  const onFiltersPointerDown = (e) => {
    if (e.pointerType === 'touch') return
    const el = filtersRef.current
    if (!el) return
    dragRef.current = { startX: e.clientX, scrollLeft: el.scrollLeft }
    draggedRef.current = false
  }

  const onFiltersPointerMove = (e) => {
    const st = dragRef.current
    const el = filtersRef.current
    if (!st || !el) return
    const dx = e.clientX - st.startX
    if (Math.abs(dx) > 4) draggedRef.current = true
    el.scrollLeft = st.scrollLeft - dx
  }

  const endFiltersDrag = () => {
    dragRef.current = null
  }

  const onFiltersClickCapture = (e) => {
    if (draggedRef.current) {
      e.stopPropagation()
      e.preventDefault()
      draggedRef.current = false
    }
  }

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
            <div
              className="menu-filters"
              ref={filtersRef}
              onPointerDown={onFiltersPointerDown}
              onPointerMove={onFiltersPointerMove}
              onPointerUp={endFiltersDrag}
              onPointerLeave={endFiltersDrag}
              onClickCapture={onFiltersClickCapture}
            >
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
                  orderTo={meal.slug ? `${ORDER_SITE}/product-detail/${meal.slug}` : ORDER_SITE}
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

          <div className="menu-explore">
            <a href="/brand_assets/DR DIET MENU.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--dark btn--lg">
              Explore Full Menu <i className="fas fa-arrow-right" />
            </a>
          </div>

          <div className="menu-note">
            <i className="fas fa-info-circle" />
            <p>This is a sample menu. Your actual meals are <strong>fully customized</strong> to your caloric goals and preferences. Menus rotate weekly.</p>
          </div>
        </div>
      </section>
    </>
  )
}
