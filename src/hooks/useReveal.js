import { useRef, useEffect } from 'react'

/**
 * useReveal — sets up an IntersectionObserver on all [data-reveal] elements
 * inside the returned containerRef.
 *
 * Attach the returned ref to a wrapper element. Any descendant with
 * [data-reveal] will start hidden (opacity 0, translateY 26px) and
 * transition in when it enters the viewport.
 */
export function useReveal(threshold = 0.12) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target
            el.style.opacity = '1'
            el.style.transform = 'none'
            observer.unobserve(el)
          }
        })
      },
      { threshold }
    )

    // Use rAF so newly-mounted DOM elements are measurable before observing
    const raf = requestAnimationFrame(() => {
      const targets = container.querySelectorAll('[data-reveal]')
      targets.forEach((el) => {
        el.style.opacity = '0'
        el.style.transform = 'translateY(26px)'
        el.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1)'
        observer.observe(el)
      })
    })

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [threshold])

  return containerRef
}

export default useReveal
