import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { MOTION, IS_TOUCH } from '../lib/fx'
import { processAnimations, heroIntro } from '../lib/animations'
import { installFormHandler } from '../lib/forms'

let lenis = null
export const getLenis = () => lenis

const CTA_RE = /(^|\s)bg-primary(-container)?(\s|$)/

/** Mounts once inside Layout: smooth scroll, pointer-driven CTA fills, magnetic buttons, anchor scrolling, forms, scroll animations. */
export default function Engine() {
  const loc = useLocation()

  // smooth scroll + ScrollTrigger sync
  useEffect(() => {
    const offs = []
    if (MOTION) {
      lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
      lenis.on('scroll', ScrollTrigger.update)
      const tick = (t) => lenis.raf(t * 1000)
      gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0)
      offs.push(() => { gsap.ticker.remove(tick); lenis.destroy(); lenis = null })
    }
    const scrollTo = (e) => {
      const t = e.detail
      if (lenis) lenis.scrollTo(t, { offset: -90, duration: 1.4 })
      else if (typeof t === 'number') window.scrollTo({ top: t, behavior: 'smooth' })
      else document.querySelector(t)?.scrollIntoView({ behavior: 'smooth' })
    }
    const stop = () => lenis?.stop(); const start = () => lenis?.start()
    window.addEventListener('forme:scrollto', scrollTo)
    offs.push(() => window.removeEventListener('forme:scrollto', scrollTo))
    // in-page #anchors
    const click = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a || a.getAttribute('href') === '#') return
      const el = document.querySelector(a.getAttribute('href'))
      if (!el) return
      e.preventDefault(); scrollTo({ detail: el })
    }
    document.addEventListener('click', click)
    offs.push(() => document.removeEventListener('click', click))
    offs.push(installFormHandler())
    // stop smooth scroll while the menu overlay is open
    const mo = new MutationObserver(() => (document.documentElement.classList.contains('menu-open') ? stop() : start()))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    offs.push(() => mo.disconnect())
    return () => offs.forEach((f) => f())
  }, [])

  // pointer-position CSS vars for the CTA fill + magnetic pull
  useEffect(() => {
    if (!MOTION) return undefined
    const move = (e) => {
      const b = e.target.closest?.('.cta')
      if (!b) return
      const r = b.getBoundingClientRect()
      b.style.setProperty('--mx', `${e.clientX - r.left}px`)
      b.style.setProperty('--my', `${e.clientY - r.top}px`)
      if (!IS_TOUCH && r.width < 420) {
        gsap.to(b, { x: (e.clientX - (r.left + r.width / 2)) * 0.18, y: (e.clientY - (r.top + r.height / 2)) * 0.28, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
      }
    }
    const leave = (e) => { const b = e.target.closest?.('.cta'); if (b) gsap.to(b, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1,0.4)', overwrite: 'auto' }) }
    document.addEventListener('pointermove', move)
    document.addEventListener('pointerout', leave)
    return () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerout', leave) }
  }, [])

  // (re)scan the page after each route render and whenever async content is added
  useEffect(() => {
    let timer
    const scan = () => {
      const root = document.querySelector('main') || document.body
      document.querySelectorAll('a, button').forEach((b) => { if (CTA_RE.test(b.className) && !b.closest('header.site-header') && b.offsetWidth < 520 && b.offsetWidth > 0) b.classList.add('cta') })
      processAnimations(root)
    }
    const queue = () => { clearTimeout(timer); timer = setTimeout(scan, 80) }
    let first = true
    const reveal = () => {
      const root = document.querySelector('main')
      if (!root) return
      if (first) { first = false }
      heroIntro(root); scan()
    }
    window.addEventListener('forme:transition-reveal', reveal)
    const mo = new MutationObserver(queue)
    const rootEl = document.getElementById('root')
    mo.observe(rootEl, { childList: true, subtree: true })
    queue()
    return () => { clearTimeout(timer); mo.disconnect(); window.removeEventListener('forme:transition-reveal', reveal) }
  }, [])

  // route change housekeeping
  useEffect(() => {
    ScrollTrigger.getAll().forEach((t) => { if (!document.body.contains(t.trigger)) t.kill() })
    if (!loc.hash) { lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0) }
    else setTimeout(() => window.dispatchEvent(new CustomEvent('forme:scrollto', { detail: loc.hash })), 400)
    const t = setTimeout(() => ScrollTrigger.refresh(), 600)
    return () => clearTimeout(t)
  }, [loc.pathname, loc.hash])

  return null
}
