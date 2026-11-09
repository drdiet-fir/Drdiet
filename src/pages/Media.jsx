import { useState } from 'react'
import PageHero from '../components/PageHero'
import PageMeta from '../components/PageMeta'
import './Media.css'

const galleryItems = [
  { id: 1, type: 'photo', category: 'Food', src: '/brand_assets/menu/Artisan Stuffed Chicken Breast.webp', caption: 'Artisan Stuffed Chicken Breast' },
  { id: 2, type: 'photo', category: 'Kitchen', src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', caption: 'Our HACCP-Certified Kitchen' },
  { id: 4, type: 'photo', category: 'Food', src: '/brand_assets/menu/Steamed Chicken Hummus Salad.webp', caption: 'Steamed Chicken Hummus Salad' },
  { id: 6, type: 'photo', category: 'Food', src: '/brand_assets/menu/Healthy Stuffed Paneer.webp', caption: 'Healthy Stuffed Paneer' },
  { id: 8, type: 'photo', category: 'Food', src: '/brand_assets/menu/Chicken Tikka Wrap.webp', caption: 'Chicken Tikka Wrap' },
  { id: 9, type: 'photo', category: 'Kitchen', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', caption: 'Premium Food Preparation' },
  { id: 11, type: 'photo', category: 'Food', src: '/brand_assets/menu/Nutella Protein Pancakes.webp', caption: 'Nutella Protein Pancakes' },
  { id: 12, type: 'photo', category: 'Team', src: '/brand_assets/dr-diet-team.webp', caption: 'The Dr Diet Team' },
]

const mediaCategories = ['All', 'Food', 'Kitchen', 'Team']

export default function Media() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <>
      <PageMeta
        title="Gallery & Media | Dr Diet"
        description="Go behind the scenes at Dr Diet — our kitchen, team, food and daily deliveries. A visual look at how we make healthy eating happen."
        canonical="/media"
      />
      <PageHero
        title="Behind the Scenes at Dr Diet"
        subtitle="A look into our kitchen, our team, our deliveries, and our customers' transformations."
      />

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

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" onClick={() => setLightbox(null)} aria-label="Close lightbox">
            <i className="fas fa-times" />
          </button>
          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.caption} loading="lazy" />
            <p className="lightbox__caption">{lightbox.caption}</p>
          </div>
        </div>
      )}
    </>
  )
}
