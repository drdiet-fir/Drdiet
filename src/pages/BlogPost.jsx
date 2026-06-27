import { useParams, Link, Navigate } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import { blogPosts } from '../data/blogData'
import './Blog.css'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const currentIndex = blogPosts.indexOf(post)
  const relatedPosts = blogPosts.filter((_, i) => i !== currentIndex).slice(0, 2)

  return (
    <>
      <PageMeta
        title={post.metaTitle}
        description={post.metaDescription}
        canonical={`/blog/${post.slug}`}
        ogImage={post.image}
      />

      <section className="page-hero blog-post-hero" style={{ backgroundImage: `linear-gradient(135deg, rgba(43,53,32,0.92) 0%, rgba(67,78,48,0.85) 100%), url(${post.image})` }}>
        <div className="container">
          <div className="blog-post-hero__breadcrumb">
            <Link to="/blog">Blog</Link>
            <i className="fas fa-chevron-right" />
            <span>{post.category}</span>
          </div>
          <span className="section-label section-label--white">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="blog-post-hero__meta">
            <span><i className="fas fa-clock" /> {post.readTime} read</span>
            <span><i className="fas fa-calendar" /> {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </section>

      <section className="section blog-post-section">
        <div className="container blog-post-container">
          <article
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <aside className="blog-post-sidebar">
            <div className="blog-sidebar-card">
              <h3>Start Your Plan</h3>
              <p>Fresh, calorie-counted meals delivered daily from ₹199/day.</p>
              <Link to="/subscription#get-started" className="btn btn--primary" style={{ width: '100%', textAlign: 'center', marginBottom: '12px' }}>
                View Meal Plans
              </Link>
              <a href="https://wa.me/917015732242?text=I want to start a Dr Diet meal plan" target="_blank" rel="noopener noreferrer" className="btn btn--outline-dark" style={{ width: '100%', textAlign: 'center' }}>
                <i className="fab fa-whatsapp" /> Chat With Us
              </a>
            </div>

            <div className="blog-sidebar-card">
              <h3>More Articles</h3>
              {relatedPosts.map((p) => (
                <Link to={`/blog/${p.slug}`} key={p.slug} className="blog-sidebar-related">
                  <img src={p.image} alt={p.title} />
                  <div>
                    <span className="blog-sidebar-related__cat">{p.category}</span>
                    <p>{p.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '16px' }}>Ready to put this into practice?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
            Dr Diet delivers fresh, calorie-counted, high-protein meals across Delhi, Gurgaon, Chandigarh & Bangalore. Starting at ₹199/day.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/subscription#get-started" className="btn btn--primary btn--lg">Start My Plan</Link>
            <Link to="/blog" className="btn btn--outline-dark btn--lg">Read More Articles</Link>
          </div>
        </div>
      </section>
    </>
  )
}
