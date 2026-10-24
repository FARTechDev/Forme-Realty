import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { MOTION, IS_TOUCH } from '../lib/fx'

/** Two-part custom cursor: precise dot + lagging ring that grows over links and shows labels (data-cursor="View"). */
export default function Cursor() {
  const ring = useRef(null)
  const dot = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    if (!MOTION || IS_TOUCH) return undefined
    document.documentElement.classList.add('has-cursor')
    const r = ring.current, d = dot.current
    const rx = gsap.quickTo(r, 'x', { duration: 0.45, ease: 'power3.out' })
    const ry = gsap.quickTo(r, 'y', { duration: 0.45, ease: 'power3.out' })
    const dx = gsap.quickTo(d, 'x', { duration: 0.08, ease: 'none' })
    const dy = gsap.quickTo(d, 'y', { duration: 0.08, ease: 'none' })
    const move = (e) => { rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY); r.classList.remove('is-hidden'); d.classList.remove('is-hidden') }
    const over = (e) => {
      const t = e.target.closest?.('[data-cursor], a, button, [role="button"], label, summary, select, input, textarea')
      r.classList.remove('is-link', 'is-view')
      label.current.textContent = ''
      if (!t) return
      const txt = t.getAttribute('data-cursor')
      if (txt) { label.current.textContent = txt; r.classList.add('is-view') }
      else if (!/^(input|textarea|select)$/i.test(t.tagName)) r.classList.add('is-link')
      else r.classList.add('is-down')
    }
    const down = () => r.classList.add('is-down')
    const up = () => r.classList.remove('is-down')
    const leave = () => { r.classList.add('is-hidden'); d.classList.add('is-hidden') }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down); window.removeEventListener('pointerup', up)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])

  if (!MOTION || IS_TOUCH) return null
  return (
    <>
      <div ref={ring} className="fx-cursor is-hidden" aria-hidden><span ref={label} /></div>
      <div ref={dot} className="fx-cursor-dot is-hidden" aria-hidden />
    </>
  )
}
