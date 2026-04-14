import { useState } from 'react'
import './WhatsAppButton.css'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)
  const phone = '966500000000'
  const message = encodeURIComponent("Hello Dr Diet! I'd like to learn more about your meal plans.")

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-btn ${hovered ? 'whatsapp-btn--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat with us on WhatsApp"
    >
      <span className={`whatsapp-btn__tooltip ${hovered ? 'whatsapp-btn__tooltip--visible' : ''}`}>
        Chat with us!
      </span>
      <i className="fab fa-whatsapp whatsapp-btn__icon" />
      <span className="whatsapp-btn__pulse" />
    </a>
  )
}
