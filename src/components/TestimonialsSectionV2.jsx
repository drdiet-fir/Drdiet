import './TestimonialsSectionV2.css'

const REVIEWS = [
  { name: 'Kia', role: 'North Mohali', platform: 'Swiggy', text: "I was admitted in the hospital since last night and just came back. I was very hungry but didn't have the courage to cook. Because of you, I was able to eat my favourite meal in a healthy version." },
  { name: 'Khushi Arora', role: 'Rajouri Garden, Delhi', platform: 'Swiggy', text: "First of all, the food was absolutely amazing! It was my first time ordering and honestly I said 'wow' with every single bite. Please tell Chef Laddu that he's done a fantastic job." },
  { name: 'Abhi', role: 'Delhi · Repeat Customer', platform: 'Swiggy', text: 'I have been using Dr Diet for a while now. It has become my go-to place to order and eat healthy and clean with enough protein.' },
  { name: 'Mohit Yadav', role: 'Gurgaon · 10+ orders', platform: 'Swiggy', text: 'Recently tried the pasta and was genuinely impressed. Cooked perfectly al dente, sauce rich and well-balanced. Every bite was satisfying and comforting. Would definitely order again.' },
  { name: 'Yuktika Dhupar', role: 'Local Guide · Google Reviews', platform: 'Google', text: "I don't think I've had such better healthy food at this cost anywhere in my life. Also the owner Priti is very sweet. Kudos to you guys for bringing this up!!" },
]

function TestimonialCard({ r }) {
  return (
    <div className="testimonial-card-v2">
      <img className="testimonial-card-v2__quote-mark" src="/brand_assets/testimonials/quote-vector.svg" alt="" />
      <div className="testimonial-card-v2__body">
        <p className="testimonial-card-v2__text">{r.text}</p>
        <div className="testimonial-card-v2__footer">
          <div>
            <strong>{r.name}</strong>
            <span>{r.role}</span>
          </div>
          <span className="testimonial-card-v2__platform">{r.platform}</span>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSectionV2() {
  return (
    <section className="testimonials-v2">
      <h2 className="testimonials-v2__headline">Happy Customers</h2>

      <div className="testimonials-v2__marquee">
        <div className="testimonials-v2__track">
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <TestimonialCard r={r} key={`${r.name}-${i}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
