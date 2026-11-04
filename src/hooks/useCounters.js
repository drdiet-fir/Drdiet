import { useEffect, useRef } from 'react'

/* Counts up to `value` once the element scrolls into view. */
export function useCounter(value, suffix = '') {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let started = false
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          let startTs = null
          const duration = 2000
          const step = (ts) => {
            if (!startTs) startTs = ts
            const p = Math.min((ts - startTs) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            el.textContent = Math.floor(eased * value).toLocaleString() + (p < 1 ? '' : suffix)
            if (p < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.6 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [value, suffix])
  return ref
}

/* Counts up to `base` then fluctuates between min/max every 2s. */
export function useLiveTicker(base, min, max, suffix = '') {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let started = false
    let intervalId = null

    const startTick = () => {
      intervalId = setInterval(() => {
        const val = Math.floor(Math.random() * (max - min + 1)) + min
        el.textContent = val.toLocaleString() + suffix
      }, 2000)
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          let startTs = null
          const duration = 2000
          const step = (ts) => {
            if (!startTs) startTs = ts
            const p = Math.min((ts - startTs) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            el.textContent = Math.floor(eased * base).toLocaleString() + (p < 1 ? '' : suffix)
            if (p < 1) requestAnimationFrame(step)
            else startTick()
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.6 }
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      if (intervalId) clearInterval(intervalId)
    }
  }, [base, min, max, suffix])
  return ref
}
