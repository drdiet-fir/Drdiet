import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import { blogPosts } from '../data/blogData'
import './Blog.css'

const categoryColors = {
  'Weight Loss': '#e8f5e9',
  'Muscle Gain': '#e3f2fd',
  'Health & Wellness': '#fce4ec',
  'Nutrition Tips': '#fff8e1',
  'Nutrition Education': '#f3e5f5',
}

export default function Blog() {
  return (
    <>
      <PageMeta
        title="Nutrition & Weight Loss Blog – Dr Diet"
        description="Expert articles on weight loss, muscle gain, PCOS diet, clean eating, and healthy meal planning in India. Science-backed nutrition advice from the Dr Diet team."
        canonical="/blog"
        ogImage="/brand_assets/Chicken Brown rice Landscape.webp"
      />

      <section className="page-hero blog-hero">
        <div className="container">
          <span className="section-label section-label--white">Nutrition Insights</span>
          <h1>The Dr Diet Blog</h1>
          <p>Science-backed nutrition advice, meal planning guides, and health tips for every goal.</p>
        </div>
      </section>

      <section className="section blog-listing-section">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.slug} className="blog-card">
                <div className="blog-card__image">
                  <img src={post.image} alt={post.title} loading="lazy" />
                  <span className="blog-card__category" style={{ background: categoryColors[post.category] || '#f5f5f5' }}>
                    {post.category}
                  </span>
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <span><i className="fas fa-clock" /> {post.readTime} read</span>
                    <span><i className="fas fa-calendar" /> {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <span className="blog-card__cta">Read Article <i className="fas fa-arrow-right" /></span>
                </div>
              </Link>
            ))}
          </div>

          <div className="blog-cta-box">
            <h3>Ready to start eating right?</h3>
            <p>Get fresh, calorie-counted meals delivered to your door every morning.</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/subscription" className="btn btn--primary">View Meal Plans</Link>
              <a href="https://wa.me/917015732242?text=I want to know about Dr Diet meal plans" target="_blank" rel="noopener noreferrer" className="btn btn--outline-dark">
                <i className="fab fa-whatsapp" /> Chat With Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
