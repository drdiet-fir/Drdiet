import { useEffect, useRef } from 'react'

export function useScrollAnimation() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    // Observe the container itself and all animated children
    const animated = el.querySelectorAll('.fade-up, .fade-in')
    animated.forEach((child) => observer.observe(child))
    if (el.classList.contains('fade-up') || el.classList.contains('fade-in')) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return ref
}

export function useCountUp(target, duration = 2000, startOnVisible = true) {
  const ref = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const run = () => {
      if (hasRun.current) return
      hasRun.current = true
      let start = 0
      const step = (timestamp) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.floor(eased * target).toLocaleString()
        if (progress < 1) requestAnimationFrame(step)
        else el.textContent = target.toLocaleString() + (el.dataset.suffix || '')
      }
      requestAnimationFrame(step)
    }

    if (!startOnVisible) { run(); return }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) run() },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, startOnVisible])

  return ref
}
