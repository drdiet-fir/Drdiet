import { useState } from 'react'
import './Media.css'

const galleryItems = [
  { id: 1, type: 'photo', category: 'Food', src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', caption: 'Grilled Salmon Power Bowl' },
  { id: 2, type: 'photo', category: 'Kitchen', src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', caption: 'Our HACCP-Certified Kitchen' },
  { id: 3, type: 'photo', category: 'Transformations', src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', caption: 'Real Customer Transformation' },
  { id: 4, type: 'photo', category: 'Food', src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80', caption: 'Quinoa Power Salad' },
  { id: 5, type: 'photo', category: 'Team', src: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=600&q=80', caption: 'Our Head Chef at Work' },
  { id: 6, type: 'photo', category: 'Food', src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80', caption: 'Fresh Ingredients Daily' },
  { id: 7, type: 'photo', category: 'Delivery', src: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80', caption: 'Morning Delivery Ready' },
  { id: 8, type: 'photo', category: 'Food', src: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80', caption: 'Chicken Shawarma Wrap' },
  { id: 9, type: 'photo', category: 'Kitchen', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', caption: 'Premium Food Preparation' },
  { id: 10, type: 'photo', category: 'Transformations', src: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80', caption: 'Customer Success Story' },
  { id: 11, type: 'photo', category: 'Food', src: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80', caption: 'Beef Kofta Platter' },
  { id: 12, type: 'photo', category: 'Team', src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80', caption: 'The Dr Diet Team' },
]

const mediaCategories = ['All', 'Food', 'Kitchen', 'Transformations', 'Team', 'Delivery']

const pressItems = [
  { source: 'Times of India', headline: 'Dr Diet Redefines Healthy Eating for Indian Consumers', date: 'March 2024', logo: '📰' },
  { source: 'Forbes India', headline: "The Startup Transforming India's Nutrition Landscape", date: 'January 2024', logo: '📰' },
  { source: 'Startup Pedia', headline: 'Dr Diet Reaches 10,000 Customers Milestone', date: 'November 2023', logo: '📰' },
]

export default function Media() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <>
      <section className="page-hero media-hero">
        <div className="container">
          <span className="section-label section-label--white">Gallery & Media</span>
          <h1>Behind the Scenes<br />at Dr Diet</h1>
          <p>A look into our kitchen, our team, our deliveries, and our customers' transformations.</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="section media-gallery-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--dark">Photo Gallery</span>
            <h2>Our World in Pictures</h2>
            <div className="divider" />
          </div>

          <div className="media-filters">
            {mediaCategories.map((cat) => (
              <button
                key={cat}
                className={`menu-filter-btn ${activeCategory === cat ? 'menu-filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="media-grid">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className="media-item"
                onClick={() => setLightbox(item)}
              >
                <img src={item.src} alt={item.caption} loading="lazy" />
                <div className="media-item__overlay">
                  <i className="fas fa-expand" />
                  <span>{item.caption}</span>
                </div>
                <span className="media-item__cat">{item.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="section-label section-label--dark">In the News</span>
            <h2>Dr Diet in the Media</h2>
            <div className="divider" />
          </div>
          <div className="grid-3 press-grid">
            {pressItems.map((item) => (
              <div key={item.source} className="press-card">
                <div className="press-card__logo">{item.logo} {item.source}</div>
                <h4 className="press-card__headline">"{item.headline}"</h4>
                <span className="press-card__date">{item.date}</span>
                <a href="#" className="press-card__link">
                  Read Article <i className="fas fa-external-link-alt" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" onClick={() => setLightbox(null)} aria-label="Close lightbox">
            <i className="fas fa-times" />
          </button>
          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.caption} />
            <p className="lightbox__caption">{lightbox.caption}</p>
          </div>
        </div>
      )}
    </>
  )
}
