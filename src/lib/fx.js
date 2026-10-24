// Feature flags for the motion layer.
const qs = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
if (typeof window !== 'undefined') {
  try {
    if (qs.has('plain')) sessionStorage.setItem('forme.plain', qs.get('plain') === '0' ? '' : '1')
  } catch { /* ignore */ }
}
const stored = (() => { try { return sessionStorage.getItem('forme.plain') === '1' } catch { return false } })()

/** ?plain  → disables preloader, cursor, smooth-scroll, scroll animations and page transitions (handy for testing). */
export const PLAIN = stored
export const REDUCED = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
export const IS_TOUCH = typeof window !== 'undefined' && window.matchMedia?.('(hover: none), (pointer: coarse)').matches
export const MOTION = !PLAIN && !REDUCED
