// Runs the original inline <script> of a converted design screen against the React-rendered DOM,
// so the micro-interactions of the design (FAQ accordions, filters, calendars, toggles …) keep working.
import { useEffect, useRef } from 'react'

const EVENTS = ['click', 'change', 'input', 'submit', 'keyup', 'keydown', 'focus', 'blur', 'mouseenter', 'mouseleave']
const SELECTOR = EVENTS.map((e) => `[data-on${e}]`).join(',')

export function useLegacyPage(script) {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return undefined
    const undo = []

    root.querySelectorAll(SELECTOR).forEach((el) => {
      EVENTS.forEach((evt) => {
        const code = el.getAttribute(`data-on${evt}`)
        if (!code) return
        const fn = (event) => {
          try { new Function('event', code).call(el, event) } catch (e) { console.warn('[legacy handler]', code, e) }
        }
        el.addEventListener(evt, fn)
        undo.push(() => el.removeEventListener(evt, fn))
      })
    })

    if (script) {
      const origD = document.addEventListener
      const origW = window.addEventListener
      const late = []
      const record = (target, orig) => function patched(type, fn, opts) {
        if (type === 'DOMContentLoaded' || type === 'load') { late.push(fn); return }
        orig.call(target, type, fn, opts)
        undo.push(() => target.removeEventListener(type, fn, opts))
      }
      document.addEventListener = record(document, origD)
      window.addEventListener = record(window, origW)
      try { (0, eval)(script) } catch (e) { console.warn('[legacy script]', e) }
      document.addEventListener = origD
      window.addEventListener = origW
      late.forEach((fn) => { try { fn.call(document, new Event('DOMContentLoaded')) } catch (e) { console.warn('[legacy DOMContentLoaded]', e) } })
    }
    return () => undo.forEach((u) => u())
  }, [script])
  return ref
}
