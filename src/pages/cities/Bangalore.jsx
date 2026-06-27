import { Link } from 'react-router-dom'
import PageMeta from '../../components/PageMeta'
import './CityPage.css'

const benefits = [
  { icon: 'fas fa-weight', title: 'Weight Loss Plans', desc: 'Science-backed calorie-deficit plans for Bangalore\'s fitness-conscious population. Lose weight without giving up taste.' },
  { icon: 'fas fa-dumbbell', title: 'Muscle Gain Meals', desc: 'High-protein meals (35–55g per serving) to support gym recovery and muscle building.' },
  { icon: 'fas fa-briefcase', title: 'Office Meal Plans', desc: 'Healthy tiffin for IT professionals in Whitefield, Electronic City, and Koramangala.' },
  { icon: 'fas fa-heartbeat', title: 'Medical Diet Plans', desc: 'Plans for PCOS, diabetes, thyroid, and lifestyle conditions, aligned with medical advice.' },
  { icon: 'fas fa-leaf', title: 'Clean Ingredients', desc: 'No maida, no preservatives, no seed oils. Fresh ingredients cooked daily in our certified kitchen.' },
  { icon: 'fas fa-truck', title: 'Daily Fresh Delivery', desc: 'Freshly cooked meals delivered to your doorstep across Bangalore every morning.' },
]

const areas = ['Hebbal', 'Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City', 'HSR Layout', 'BTM Layout', 'Marathahalli', 'Bellandur', 'Sarjapur Road']

const meals = [
  { name: 'Chilli Chicken Bowl', cal: '450 kcal', protein: '42g protein', img: '/brand_assets/Chilli chicken.webp' },
  { name: 'Quinoa Patty Burger', cal: '420 kcal', protein: '22g protein', img: '/brand_assets/Quinoa Patty Burger.webp' },
  { name: 'Veg Buckwheat Noodles', cal: '320 kcal', protein: '14g protein', img: '/brand_assets/Veg buckweat noodles.webp' },
]

const testimonials = [
  { text: 'As a software engineer in Whitefield, I was surviving on Swiggy\'s junk. Dr Diet fixed my nutrition completely. Lost 18kg and I feel incredible.', name: 'Arjun Mehta', role: 'Software Engineer, Whitefield', rating: 5 },
  { text: 'Finally found healthy food delivery in Bangalore that\'s actually healthy. Macro-tracked, fresh, and genuinely delicious. Worth every rupee.', name: 'Divya Nair', role: 'Product Manager, Koramangala', rating: 5 },
]

export default function Bangalore() {
  return (
    <>
      <PageMeta
        title="Healthy Weight Loss Meal Plans in Bangalore – Dr Diet"
        description="Dr Diet delivers fresh, calorie-counted healthy meal plans in Bangalore including Hebbal, Koramangala, Whitefield & HSR Layout. Weight loss, muscle gain & office meal plans from ₹199/day."
        canonical="/weight-loss-meals-bangalore"
        ogImage="/brand_assets/Chilli chicken.webp"
      />

      <section className="page-hero city-hero">
        <div className="container">
          <span className="section-label section-label--white">Bangalore</span>
          <h1>Healthy Weight Loss Meal Plans<br />in Bangalore</h1>
          <p>Fresh, calorie-counted, high-protein meals delivered daily across Bengaluru. Starting at ₹199/day.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '32px' }}>
            <Link to="/subscription#get-started" className="btn btn--primary btn--lg">Start My Plan</Link>
            <a href="https://wa.me/917015732242?text=I want a healthy meal plan in Bangalore" target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--lg" style={{ borderColor: 'rgba(255,255,255,0.6)', color: '#fff' }}>
              <i className="fab fa-whatsapp" /> Chat With Us
            </a>
          </div>
        </div>
      </section>

      <section className="section city-intro-section">
        <div className="container">
          <p>
            Dr Diet delivers healthy, calorie-counted meal plans across Bangalore including Hebbal, Koramangala, Whitefield, Indiranagar, and HSR Layout. Our meal plans are designed for Bangalore's IT professionals, gym enthusiasts, and individuals seeking effective weight loss or muscle gain diets.
          </p>
          <p>
            Bangalore's tech-driven lifestyle means long hours, late nights, and too many food delivery orders that aren't actually healthy. Dr Diet provides a real alternative: freshly cooked, macro-balanced Indian meals delivered to your door every morning — so healthy eating becomes effortless, not a project.
          </p>
          <p>
            Every Dr Diet meal in Bangalore is calorie-counted, cooked without maida or preservatives, and customised to your specific goal — whether that's losing weight, gaining muscle, managing PCOS, or simply eating cleaner.
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--dark">Why Dr Diet Bangalore</span>
            <h2>Meal Plans Designed for Bengaluru</h2>
            <div className="divider" />
          </div>
          <div className="city-benefits-grid">
            {benefits.map((b) => (
              <div key={b.title} className="city-benefit-card">
                <div className="city-benefit-card__icon"><i className={b.icon} /></div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section city-areas-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--dark">Delivery Areas</span>
            <h2>We Deliver Across Bangalore</h2>
            <div className="divider" />
          </div>
          <div className="city-areas-grid">
            {areas.map((a) => <div key={a} className="city-area-pill">{a}</div>)}
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--dark">Sample Meals</span>
            <h2>What's on Your Plate</h2>
            <div className="divider" />
          </div>
          <div className="city-meals-grid">
            {meals.map((m) => (
              <div key={m.name} className="city-meal-card">
                <img src={m.img} alt={m.name} loading="lazy" />
                <div className="city-meal-card__info">
                  <h4>{m.name}</h4>
                  <span>{m.cal} · {m.protein}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/menu" className="btn btn--dark">View Full Menu <i className="fas fa-arrow-right" /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Customer Reviews</span>
            <h2>What Bangalore Customers Say About Dr Diet</h2>
            <div className="divider" />
          </div>
          <div className="city-testimonial-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="city-testimonial-card">
                <div className="city-testimonial-stars">{Array.from({ length: t.rating }).map((_, i) => <i key={i} className="fas fa-star" />)}</div>
                <p>"{t.text}"</p>
                <div className="city-testimonial-card__author">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section city-cta-section" style={{ textAlign: 'center' }}>
        <div className="container">
          <span className="section-label section-label--white">Get Started</span>
          <h2>Start Your Healthy Meal Plan in Bangalore Today</h2>
          <p>Join thousands of Bengalureans eating right every day. Plans from ₹199/day.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/subscription#get-started" className="btn btn--primary btn--lg">Start My Plan</Link>
            <a href="https://wa.me/917015732242?text=I want a healthy meal plan in Bangalore" target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--lg">
              <i className="fab fa-whatsapp" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
