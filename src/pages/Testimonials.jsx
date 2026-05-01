import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Testimonials.css'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    root.querySelectorAll('.fade-up').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return ref
}

const testimonials = [
  { name: 'Priya Sharma', role: 'Working Mother', city: 'Delhi', rating: 5, loss: '-15kg', duration: '5 months', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', text: "I've been with Dr Diet for 5 months and lost 15kg without stepping foot in a gym. The food is genuinely delicious - my kids keep stealing my meals! The support team always responds quickly and the nutritionist actually remembers my goals every time we speak.", goal: 'Fat Loss' },
  { name: 'Rahul Verma', role: 'Personal Trainer', city: 'Gurgaon', rating: 5, loss: '-20kg', duration: '4 months', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', text: "I recommend Dr Diet to all my clients. The macros are spot-on, the quality is consistent, and the customer service actually responds. As a personal trainer, I need something I can trust to recommend. Dr Diet delivers every single time.", goal: 'Body Recomp' },
  { name: 'Ananya Singh', role: 'University Student', city: 'Chandigarh', rating: 5, loss: '-8kg', duration: '6 weeks', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', text: "As a student on a budget I was skeptical but the Starter plan is so worth it. I've lost 8kg in 6 weeks and actually have energy for classes now. The meals are so good my roommates want me to share!", goal: 'Weight Loss' },
  { name: 'Vikram Patel', role: 'Engineer', city: 'Noida', rating: 5, loss: '-25kg', duration: '6 months', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80', text: "Six months ago I weighed 105kg. Today I'm at 80kg with visible abs. I never thought I'd say that. Dr Diet changed everything. The Elite plan was worth every rupee - the weekly calls with my nutritionist kept me accountable and adjusting.", goal: 'Elite Transformation' },
  { name: 'Sneha Kapoor', role: 'Nurse', city: 'Delhi', rating: 5, loss: '-12kg', duration: '3 months', avatar: 'https://images.unsplash.com/photo-1551836022-8b2858c9c69b?w=100&q=80', text: "Working night shifts makes eating healthy nearly impossible. Dr Diet solved that completely. I pre-set my delivery window, the meals are portioned and labeled, and I just eat. Effortless. Lost 12kg in 3 months working 12-hour shifts.", goal: 'Lifestyle' },
  { name: 'Arjun Mehta', role: 'CEO', city: 'Bengaluru', rating: 5, loss: '-18kg', duration: '4 months', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80', text: "Between board meetings and travel, I had zero time to think about food. Dr Diet handles it all. The Elite plan's dedicated account manager is exceptional - they adjusted my plan around my travel schedule seamlessly. Truly premium service.", goal: 'Exec Health' },
]

const videoReviews = [
  { name: 'Ahmad S.', thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', duration: '2:34' },
  { name: 'Nora M.', thumbnail: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80', duration: '1:52' },
  { name: 'Khalid R.', thumbnail: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=400&q=80', duration: '3:10' },
]

export default function Testimonials() {
  const s1 = useReveal()
  const s2 = useReveal()
  const s3 = useReveal()

  return (
    <>
      <section className="page-hero testimonials-hero">
        <div className="container">
          <span className="section-label section-label--white">Success Stories</span>
          <h1>Real People.<br />Real Results.</h1>
          <p>These aren't influencers. These are real Dr Diet customers who decided to eat what's right and changed their lives.</p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="testimonials-stats-bar">
        <div className="container testimonials-stats-grid">
          {[
            { num: '10,000+', label: 'Happy Customers' },
            { num: '4.9/5', label: 'Average Rating' },
            { num: '2,800+', label: 'Transformations Shared' },
            { num: '97%', label: 'Would Recommend' },
          ].map((s) => (
            <div key={s.label} className="testimonials-stat">
              <strong>{s.num}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Written reviews */}
      <section className="section" ref={s1}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Customer Reviews</span>
            <h2>What Our Customers Say</h2>
            <div className="divider" />
          </div>
          <div className="testimonials-full-grid">
            {testimonials.map((t, i) => (
              <div key={t.name} className={`testimonials-full-card fade-up stagger-${(i % 3) + 1}`}>
                <div className="testimonials-full-card__header">
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role} · {t.city}</span>
                    <div className="testimonials-full-card__stars">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <i key={j} className="fas fa-star" />
                      ))}
                    </div>
                  </div>
                  <div className="testimonials-full-card__result">
                    <span className="testimonials-full-card__loss">{t.loss}</span>
                    <span className="testimonials-full-card__duration">{t.duration}</span>
                  </div>
                </div>
                <p className="testimonials-full-card__text">"{t.text}"</p>
                <div className="testimonials-full-card__goal">
                  <span className="badge badge--primary">{t.goal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="section section--dark" ref={s3}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label section-label--white">Your Turn</span>
          <h2 className="text-white" style={{ maxWidth: '600px', margin: '0 auto 20px' }}>
            Your Transformation Story Starts Today
          </h2>
          <p style={{ color: 'rgba(245,237,225,0.7)', maxWidth: '500px', margin: '0 auto 40px' }}>
            Join thousands of people who are already living proof that proper nutrition changes everything.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/subscription" className="btn btn--primary btn--lg">Start My Plan</Link>
            <a href="https://wa.me/917015732242" target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--lg">
              <i className="fab fa-whatsapp" /> Chat With Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
