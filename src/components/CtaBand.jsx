import './CtaBand.css'

export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div className="cta-band__text">
          <h2>Ready to Eat What's Right?</h2>
          <p>Join 10,000+ people who chose clean eating over compromise</p>
        </div>
        <div className="cta-band__actions">
          <a href="/subscription#get-started" className="btn btn--dark">
            Start Your Plan <i className="fas fa-arrow-right" />
          </a>
          <a
            href="https://wa.me/917015732242?text=I want to start a Dr Diet meal plan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline-dark"
          >
            Talk to Us <i className="fas fa-arrow-right" />
          </a>
        </div>
      </div>
    </section>
  )
}
