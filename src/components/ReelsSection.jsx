import { useLayoutEffect, useRef, useState } from 'react'
import './ReelsSection.css'

const REELS = [
  { id: 'DejWzimBGPs', url: 'https://www.instagram.com/p/DejWzimBGPs/', video: '/brand_assets/reels/reel-1.mp4' },
  { id: 'DZxKOdduqq2', url: 'https://www.instagram.com/p/DZxKOdduqq2/', video: '/brand_assets/reels/reel-2.mp4' },
  { id: 'DYrKreOJqs1', url: 'https://www.instagram.com/p/DYrKreOJqs1/', video: '/brand_assets/reels/reel-3.mp4' },
  { id: 'DfOc4jYSxGu', url: 'https://www.instagram.com/p/DfOc4jYSxGu/', video: '/brand_assets/reels/reel-4.mp4' },
  { id: 'DYo7TXTJ5nq', url: 'https://www.instagram.com/p/DYo7TXTJ5nq/', video: '/brand_assets/reels/reel-5.mp4' },
]

const CENTER = 2
const DURATION = 320
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'

/* Rotates the array so the item currently at `index` ends up at CENTER. */
function recenter(arr, index) {
  const n = index - CENTER
  const len = arr.length
  const shift = ((n % len) + len) % len
  return arr.slice(shift).concat(arr.slice(0, shift))
}

function ReelCard({ reel, isCenter, muted, onToggleMute, onClick, cardRef }) {
  return (
    <div
      className={`reel-card ${isCenter ? 'reel-card--center' : ''}`}
      ref={cardRef}
      onClick={onClick}
    >
      <video
        className="reel-card__video"
        src={reel.video}
        autoPlay
        loop
        muted={muted}
        playsInline
      />
      <a
        className="reel-card__badge"
        href={reel.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        aria-label="View on Instagram"
      >
        <i className="fab fa-instagram" />
      </a>
      {isCenter && (
        <button
          type="button"
          className="reel-card__mute"
          onClick={(e) => {
            e.stopPropagation()
            onToggleMute()
          }}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          <i className={muted ? 'fas fa-volume-mute' : 'fas fa-volume-up'} />
        </button>
      )}
    </div>
  )
}

export default function ReelsSection() {
  const [order, setOrder] = useState(REELS.map((_, i) => i))
  const [muted, setMuted] = useState(true)
  const sectionRef = useRef(null)
  const nodeRefs = useRef(new Map())
  const pending = useRef(null)

  const handleClick = (slotIndex) => {
    if (slotIndex === CENTER) return
    const n = slotIndex - CENTER
    const len = order.length

    // Items that cross the row boundary (front→back if shifting left, back→front if shifting right)
    // — these get the "exit one side, re-enter the other" treatment instead of a straight-line slide.
    const wrappedIds = new Set(
      (n > 0 ? order.slice(0, n) : order.slice(len + n)).map((reelIndex) => REELS[reelIndex].id)
    )

    const rects = new Map()
    nodeRefs.current.forEach((el, id) => {
      if (el) rects.set(id, el.getBoundingClientRect())
    })

    pending.current = { rects, wrappedIds, direction: n > 0 ? 'left' : 'right' }
    setOrder((prev) => recenter(prev, slotIndex))
    setMuted(true)
  }

  useLayoutEffect(() => {
    const job = pending.current
    if (!job) return
    pending.current = null

    const clearWidth = sectionRef.current?.getBoundingClientRect().width || 1200
    const { rects, wrappedIds, direction } = job

    nodeRefs.current.forEach((el, id) => {
      if (!el) return
      const before = rects.get(id)
      if (!before) return
      const after = el.getBoundingClientRect()
      const dx = before.left - after.left
      const dy = before.top - after.top
      const sx = before.width / after.width
      const sy = before.height / after.height
      const fromT = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`

      if (wrappedIds.has(id)) {
        // Exiting item: continue off in the direction the row is moving (at its old
        // size), fading out — then jump to the opposite (still invisible) side and
        // slide/resize/fade into its new slot in one smooth motion.
        const exitOffset = direction === 'left' ? -clearWidth : clearWidth
        const enterOffset = direction === 'left' ? clearWidth : -clearWidth
        el.animate(
          [
            { transform: fromT, opacity: 1, offset: 0 },
            { transform: `translate(${dx + exitOffset}px, ${dy}px) scale(${sx}, ${sy})`, opacity: 0, offset: 0.4 },
            { transform: `translate(${enterOffset}px, ${dy}px) scale(${sx}, ${sy})`, opacity: 0, offset: 0.42 },
            { transform: 'translate(0, 0) scale(1, 1)', opacity: 1, offset: 1 },
          ],
          { duration: DURATION, easing: EASE, fill: 'forwards' }
        ).onfinish = () => {
          el.style.transform = ''
          el.style.opacity = ''
        }
      } else if (dx !== 0 || dy !== 0 || sx !== 1 || sy !== 1) {
        el.animate(
          [{ transform: fromT }, { transform: 'translate(0, 0) scale(1, 1)' }],
          { duration: DURATION, easing: EASE, fill: 'forwards' }
        ).onfinish = () => {
          el.style.transform = ''
        }
      }
    })
  }, [order])

  return (
    <section className="reels-section" ref={sectionRef}>
      <h2 className="reels-section__headline">Real People, Real Feeling</h2>

      <div className="reels-section__track">
        {order.map((reelIndex, slotIndex) => {
          const reel = REELS[reelIndex]
          return (
            <ReelCard
              key={reel.id}
              reel={reel}
              isCenter={slotIndex === CENTER}
              muted={slotIndex === CENTER ? muted : true}
              onToggleMute={() => setMuted((m) => !m)}
              onClick={() => handleClick(slotIndex)}
              cardRef={(el) => {
                if (el) nodeRefs.current.set(reel.id, el)
                else nodeRefs.current.delete(reel.id)
              }}
            />
          )
        })}
      </div>
    </section>
  )
}
