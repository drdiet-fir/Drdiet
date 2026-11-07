import PageHero from '../components/PageHero'
import './LegalPage.css'

export default function Terms() {
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using Dr Diet's services."
      />

      <section className="section legal-section">
        <div className="container legal-content">
          <p className="legal-updated">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By placing an order, subscribing to a meal plan, or otherwise using Dr Diet's website and services, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use our services.</p>

          <h2>2. Subscriptions &amp; Orders</h2>
          <p>Subscription plans are billed in advance for the selected duration. Meal selections, delivery windows, and pause/cancellation requests must be made through the channels we provide (app, website, or WhatsApp) within the stated cut-off times.</p>

          <h2>3. Delivery</h2>
          <p>We aim to deliver within the estimated windows shown at checkout. Delivery times may vary due to traffic, weather, or other factors outside our control. We are not liable for delays caused by incorrect address or contact information provided by the customer.</p>

          <h2>4. Cancellations &amp; Refunds</h2>
          <p>Cancellation and refund eligibility depends on the specific plan purchased. Please contact our support team via WhatsApp or email for assistance with cancellations, pauses, or refund requests.</p>

          <h2>5. Health &amp; Dietary Disclaimer</h2>
          <p>Our meals are designed with general nutrition guidelines in mind and are not a substitute for professional medical advice. If you have specific allergies, medical conditions, or dietary restrictions, please inform us before subscribing and consult a healthcare professional as needed.</p>

          <h2>6. Changes to These Terms</h2>
          <p>We may update these Terms &amp; Conditions from time to time. Continued use of our services after changes are posted constitutes acceptance of the revised terms.</p>

          <h2>7. Contact Us</h2>
          <p>Questions about these terms? Reach us at <a href="mailto:drdietdelhi@gmail.com">drdietdelhi@gmail.com</a> or <a href="tel:+917015732242">+91 70157 32242</a>.</p>
        </div>
      </section>
    </>
  )
}
