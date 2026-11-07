import { useEffect, useRef, useState } from 'react'
import './ProteinHero.css'

/* Figma reference frame is 1440px wide — every size below is expressed
   relative to that so the whole composition scales proportionally at
   any viewport width (desktop or mobile). */
const REF = 1440
const vw = (px) => `${((px / REF) * 100).toFixed(4)}vw`
const lerp = (a, b, t) => a + (b - a) * t
const vwLerp = (a, b, t) => vw(lerp(a, b, t))

const PLATE_COUNT = 7
const PLATE_FRAMES = Array.from({ length: PLATE_COUNT }, (_, i) => `/brand_assets/hero/plates/plate-${i + 1}.png`)

/* Decorative stickers — each stays on screen the whole time and just travels
   from its landing-state spot to its scrolled-state spot (image swaps
   partway through the move, position never fades out). Sizes are shrunk a
   bit from the raw Figma numbers; positions stay as Figma placed them so
   they sit clear of the headline/subtext the way the design intends. */
const STICKER_SCALE = 0.8

const shrink = (spot) => ({
  ...spot,
  w: spot.w * STICKER_SCALE,
  h: spot.h * STICKER_SCALE,
  innerW: (spot.innerW ?? spot.w) * STICKER_SCALE,
  innerH: (spot.innerH ?? spot.h) * STICKER_SCALE,
})

const STICKER_PAIRS = [
  {
    before: shrink({ src: '/brand_assets/hero/sticker-1.png', left: 50, top: 46, w: 209, h: 166.5, rotate: 0 }),
    after: shrink({ src: '/brand_assets/hero/sticker-5.png', left: 244, top: 197, w: 263, h: 210, rotate: 0 }),
  },
  {
    before: shrink({ src: '/brand_assets/hero/sticker-2.png', left: 802, top: 34, w: 178.884, h: 178.884, rotate: 23.45, innerW: 136, innerH: 136 }),
    after: shrink({ src: '/brand_assets/hero/sticker-6.png', left: 989, top: 185, w: 247.344, h: 247.831, rotate: 24.84, innerW: 186, innerH: 187 }),
  },
  {
    before: shrink({ src: '/brand_assets/hero/sticker-3.png', left: 31.71, top: 234.71, w: 171.921, h: 171.921, rotate: -16.75, innerW: 138, innerH: 138 }),
    after: shrink({ src: '/brand_assets/hero/sticker-8.png', left: 169, top: 360, w: 223.732, h: 223.732, rotate: -16.75, innerW: 179.588, innerH: 179.588 }),
  },
  {
    before: shrink({ src: '/brand_assets/hero/sticker-4.png', left: 841.74, top: 248.27, w: 187.016, h: 144.451, rotate: 10.77, innerW: 168.5, innerH: 115 }),
    after: shrink({ src: '/brand_assets/hero/sticker-7.png', left: 1029, top: 405, w: 268, h: 183, rotate: 0 }),
  },
]

function Sticker({ before, after, progress }) {
  const s = progress < 0.5 ? before : after
  const rotate = lerp(before.rotate, after.rotate, progress)
  const img = (
    <img
      src={s.src}
      alt=""
      style={{
        width: vwLerp(before.innerW ?? before.w, after.innerW ?? after.w, progress),
        height: vwLerp(before.innerH ?? before.h, after.innerH ?? after.h, progress),
        display: 'block',
      }}
    />
  )
  return (
    <div
      className="protein-hero__sticker"
      style={{
        left: vwLerp(before.left, after.left, progress),
        top: vwLerp(before.top, after.top, progress),
        width: vwLerp(before.w, after.w, progress),
        height: vwLerp(before.h, after.h, progress),
      }}
    >
      {rotate ? <div style={{ transform: `rotate(${rotate}deg)` }}>{img}</div> : img}
    </div>
  )
}

/* Drives progress (0→1) while the tall track scrolls behind the pinned stage. */
function useScrollProgress(trackRef) {
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const [progress, setProgress] = useState(prefersReducedMotion ? 1 : 0)
  useEffect(() => {
    if (prefersReducedMotion) return
    let raf = null
    const update = () => {
      raf = null
      const el = trackRef.current
      if (!el) return
      const distance = el.offsetHeight - window.innerHeight
      if (distance <= 0) return
      const scrolled = -el.getBoundingClientRect().top
      setProgress(Math.min(Math.max(scrolled / distance, 0), 1))
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [trackRef])
  return progress
}

/* Mobile only: a gentle background parallax on the grid pattern while the
   plate and stickers stay put. Runs only when the mobile layout is active
   and motion isn't reduced. */
function useMobileParallax(patternRef) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 640px)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    let raf = null
    const update = () => {
      raf = null
      const el = patternRef.current
      if (!el || !mq.matches) return
      const host = el.parentElement
      if (!host) return
      const top = host.getBoundingClientRect().top
      el.style.transform = `translateY(${(-top * 0.14).toFixed(1)}px)`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [patternRef])
}

export default function ProteinHero() {
  const trackRef = useRef(null)
  const patternRef = useRef(null)
  const progress = useScrollProgress(trackRef)
  useMobileParallax(patternRef)

  const plateIndex = Math.min(PLATE_COUNT - 1, Math.round(progress * (PLATE_COUNT - 1)))
  const hintOpacity = Math.max(0, 1 - progress / 0.2)
  const subOpacity = Math.max(0, (progress - 0.5) / 0.4)

  return (
    <section className="protein-hero" aria-label="Your Protein Corner">
      {/* Mobile static composition (desktop scroll animation is hidden on mobile) */}
      <div className="protein-hero__mobile">
        <img className="protein-hero__m-pattern" src="/brand_assets/hero/pattern.png" alt="" ref={patternRef} />
        <div className="protein-hero__m-copy">
          <h1 className="protein-hero__m-headline">Your Protein Corner</h1>
          <p className="protein-hero__m-sub">
            Enjoy protein-packed meals that fuel your fitness goals without compromising on taste.
          </p>
        </div>
        <div className="protein-hero__m-stage">
          <img className="protein-hero__m-plate" src="/brand_assets/hero/plates/plate-7.png" alt="Protein bowl, fully assembled" />
          <img className="protein-hero__m-sticker protein-hero__m-sticker--tl" src="/brand_assets/hero/sticker-5.png" alt="" />
          <img className="protein-hero__m-sticker protein-hero__m-sticker--tr" src="/brand_assets/hero/sticker-6.png" alt="" />
          <img className="protein-hero__m-sticker protein-hero__m-sticker--bl" src="/brand_assets/hero/sticker-8.png" alt="" />
          <img className="protein-hero__m-sticker protein-hero__m-sticker--br" src="/brand_assets/hero/sticker-7.png" alt="" />
        </div>
      </div>

      <div className="protein-hero__track" ref={trackRef}>
        <div className="protein-hero__stage-wrap">

          <h1 className="protein-hero__headline" style={{ top: vwLerp(85, 67.2, progress) }}>
            Your Protein Corner
          </h1>

          <p className="protein-hero__sub" style={{ opacity: subOpacity }}>
            Enjoy protein-packed meals that fuel your fitness goals without compromising on taste.
          </p>

          <div className="protein-hero__hint" style={{ opacity: hintOpacity }}>
            <span>Scroll to Fill Bowl</span>
            <div className="protein-hero__hint-icons">
              <img src="/brand_assets/hero/mouse-icon.svg" alt="" />
              <img src="/brand_assets/hero/arrow-down-icon.svg" alt="" />
            </div>
          </div>

          <div
            className="protein-hero__stage"
            style={{
              top: vwLerp(300, 0, progress),
              width: vwLerp(1056, 1440, progress),
              height: `min(${vwLerp(437, 746, progress)}, calc(100vh - var(--navbar-height)))`,
              borderRadius: vwLerp(50, 0, progress),
              borderWidth: vwLerp(2, 0, progress),
            }}
          >
            <div className="protein-hero__stage-clip">
              <div
                className="protein-hero__pattern"
                style={{ top: vwLerp(-177, -22, progress), width: vw(1458), height: vw(810) }}
              >
                <img src="/brand_assets/hero/pattern.png" alt="" />
              </div>

              <div
                className="protein-hero__plate"
                style={{ top: vwLerp(-62, 161, progress), width: vw(1340), height: vw(754) }}
              >
                {PLATE_FRAMES.map((src, i) => (
                  <img key={src} src={src} alt={i === plateIndex ? 'Protein bowl, fully assembled' : ''} style={{ opacity: i === plateIndex ? 1 : 0 }} />
                ))}
              </div>
            </div>

            {STICKER_PAIRS.map((pair, i) => (
              <Sticker key={i} before={pair.before} after={pair.after} progress={progress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
