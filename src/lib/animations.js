// Global scroll-animation engine. Scans a root element, tags targets once (data-ai) and creates
// GSAP / ScrollTrigger tweens: split-line headings, slide-up copy, staggered grids, image reveals + parallax.
import { gsap, ScrollTrigger, SplitText } from './gsap'
import { MOTION } from './fx'

const SKIP = '[data-no-anim], [data-no-anim] *'
const mark = (el) => { el.dataset.ai = '1' }
const fresh = (root, sel) => Array.from(root.querySelectorAll(sel)).filter((el) => !el.dataset.ai && !el.closest(SKIP) && !el.closest('header.site-header') && !el.closest('footer.site-footer'))

const EASE = 'expo.out'

export function processAnimations(root = document) {
  if (!MOTION || !root) return
  const fontsReady = document.fonts?.ready || Promise.resolve()
  fontsReady.then(() => run(root))
}

function run(root) {
  // 1. grids / lists of cards → staggered slide-up as a group
  fresh(root, '.grid, [data-stagger]').forEach((g) => {
    const kids = Array.from(g.children).filter((k) => k.nodeType === 1 && !k.dataset.ai)
    if (kids.length < 2 || kids.length > 24) return
    mark(g)
    kids.forEach((k) => { mark(k); k.querySelectorAll('h1,h2,h3,h4,p,li,img,span').forEach((x) => { if (!x.dataset.ai) x.dataset.ai = 'in-group' }) })
    gsap.set(kids, { y: 60, opacity: 0 })
    ScrollTrigger.batch(kids, {
      start: 'top 90%', once: true,
      onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, duration: 1.1, ease: EASE, stagger: 0.09, clearProps: 'transform,opacity' }),
    })
  })

  // 2. big headings → masked line reveal
  fresh(root, 'h1, h2').forEach((h) => {
    mark(h)
    if (h.closest('[data-ai="in-group"]')) return
    let split
    try { split = SplitText.create(h, { type: 'lines', mask: 'lines', linesClass: 'ai-line' }) } catch { return }
    gsap.set(split.lines, { yPercent: 115 })
    ScrollTrigger.create({
      trigger: h, start: 'top 92%', once: true,
      onEnter: () => gsap.to(split.lines, { yPercent: 0, duration: 1.2, ease: EASE, stagger: 0.1, onComplete: () => split.revert() }),
    })
  })

  // 3. small headings, paragraphs, list items, labels → fade + slide up
  const small = fresh(root, 'h3, h4, p, blockquote, li, label, [class*="font-label-caps"]:not(a):not(button)').filter((el) => !el.dataset.ai)
  small.forEach(mark)
  const single = small.filter((el) => !el.closest('[data-ai="in-group"]'))
  single.forEach((el) => gsap.set(el, { y: 36, opacity: 0 }))
  ScrollTrigger.batch(single, {
    start: 'top 92%', once: true,
    onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, duration: 1, ease: EASE, stagger: 0.07, clearProps: 'transform,opacity' }),
  })

  // 4. images inside overflow-hidden frames → clip reveal + scale settle (+ parallax for wide ones)
  fresh(root, 'img').forEach((img) => {
    mark(img)
    const frame = img.closest('.overflow-hidden') || img.parentElement
    if (!frame || frame.dataset.aiFrame) return
    frame.dataset.aiFrame = '1'
    const wide = frame.getBoundingClientRect().height > 340
    gsap.set(frame, { clipPath: 'inset(14% 0% 0% 0%)', opacity: 0.001 })
    gsap.set(img, { scale: 1.25 })
    ScrollTrigger.create({
      trigger: frame, start: 'top 92%', once: true,
      onEnter: () => {
        gsap.to(frame, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.4, ease: 'expo.inOut', clearProps: 'clipPath,opacity' })
        gsap.to(img, { scale: wide ? 1.1 : 1, duration: 1.8, ease: 'expo.out', clearProps: wide ? '' : 'transform' })
      },
    })
    if (wide) {
      gsap.to(img, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } })
    }
  })

  // 5. horizontal rules / hairlines draw in
  fresh(root, 'hr, [class*="border-t"]:empty, [data-line]').forEach((el) => {
    mark(el)
    gsap.fromTo(el, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 95%', once: true } })
  })

  // 6. counters  <span data-count="3850">
  root.querySelectorAll('[data-count]:not([data-counted])').forEach((el) => {
    el.dataset.counted = '1'
    const end = parseFloat(el.dataset.count); const suffix = el.dataset.suffix || ''; const o = { v: 0 }
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: end, duration: 2, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('en-US') + suffix } }) })
  })

  ScrollTrigger.refresh()
}

/** Hero entrance — runs immediately (not scroll-triggered) for [data-hero] children. */
export function heroIntro(root) {
  if (!MOTION || !root) return
  const items = root.querySelectorAll('[data-hero]')
  if (!items.length) return
  gsap.fromTo(items, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: EASE, stagger: 0.12, delay: 0.1 })
}
