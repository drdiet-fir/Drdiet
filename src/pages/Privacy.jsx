import PageHero from '../components/PageHero'
import './LegalPage.css'

export default function Privacy() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="How Dr Diet collects, uses, and protects your information."
      />

      <section className="section legal-section">
        <div className="container legal-content">
          <p className="legal-updated">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2>1. Information We Collect</h2>
          <p>When you subscribe, place an order, or contact us, we may collect your name, phone number, email address, delivery address, and dietary preferences, along with any information you choose to share through our forms or WhatsApp.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to process orders and subscriptions, coordinate delivery, respond to enquiries, send updates about your order, and, where you've opted in, share offers and nutrition content.</p>

          <h2>3. Sharing of Information</h2>
          <p>We do not sell your personal information. We may share necessary details with delivery partners and service providers solely to fulfil your order, or where required by law.</p>

          <h2>4. Data Security</h2>
          <p>We take reasonable technical and organisational measures to protect your information against unauthorised access, loss, or misuse. No method of transmission or storage is completely secure, and we encourage you to contact us if you suspect any issue with your account.</p>

          <h2>5. Your Choices</h2>
          <p>You can request to update, correct, or delete your personal information, or opt out of marketing communications, at any time by contacting us.</p>

          <h2>6. Cookies</h2>
          <p>Our website may use cookies or similar technologies to improve your browsing experience and understand site usage. You can control cookies through your browser settings.</p>

          <h2>7. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised "last updated" date.</p>

          <h2>8. Contact Us</h2>
          <p>For privacy-related questions or requests, reach us at <a href="mailto:drdietdelhi@gmail.com">drdietdelhi@gmail.com</a> or <a href="tel:+917015732242">+91 70157 32242</a>.</p>
        </div>
      </section>
    </>
  )
}
