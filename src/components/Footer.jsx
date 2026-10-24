import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from './Link'
import { db } from '../lib/db'
import { toast } from './toast'
import { gsap, ScrollTrigger, SplitText } from '../lib/gsap'
import { MOTION, IS_TOUCH } from '../lib/fx'

const col = 'space-y-space-md'
const head = 'font-label-caps text-label-caps uppercase text-tertiary-fixed tracking-[0.14em] block'
const li = 'font-body-sm text-body-sm text-surface-dim hover:text-surface-bright transition-colors duration-200 footer-link'

const COLS = [
  { title: 'Residences', links: [['Private Portfolios', '/properties'], ['Curated Penthouses', '/residences'], ['Architectural Estates', '/properties'], ['Off-Market Parcels', '/land-development'], ['Rentals', '/rentals']] },
  { title: 'Neighborhoods', links: [['Austin Hill Country', '/neighborhoods'], ['Dallas Park Cities', '/neighborhoods'], ['Scottsdale Sanctuary', '/neighborhoods'], ['Paradise Valley', '/neighborhoods']] },
  { title: 'Company', links: [['Our Approach', '/our-approach'], ['Our People', '/our-people'], ['Journal', '/journal'], ['Careers', '/careers'], ['Contact', '/start-a-conversation']] },
  { title: 'Legal', links: [['Privacy Policy', '/privacy-policy'], ['Terms of Use', '/terms'], ['Cookie Preferences', '/cookies'], ['Fair Housing', '/fair-housing'], ['Accessibility', '/accessibility']] },
]

/** Giant animated brand name — letters rise on scroll-in and react to the pointer. */
function Wordmark() {
  const root = useRef(null)
  useLayoutEffect(() => {
    if (!MOTION) return undefined
    const el = root.current
    const textEl = el.querySelector('[data-wm]')
    const fit = () => { textEl.style.fontSize = '100px'; const w = el.clientWidth; const tw = textEl.scrollWidth; textEl.style.fontSize = Math.min(220, (100 * w) / tw * 0.99) + 'px' }
    fit(); document.fonts?.ready.then(fit); window.addEventListener('resize', fit)
    const ctx = gsap.context(() => {
      const split = SplitText.create(el.querySelector('[data-wm]'), { type: 'chars', charsClass: 'wm-char', mask: 'chars' })
      const chars = split.chars
      gsap.set(chars, { yPercent: 115, rotate: 4 })
      ScrollTrigger.create({
        trigger: el, start: 'top 92%', once: true,
        onEnter: () => gsap.to(chars, { yPercent: 0, rotate: 0, duration: 1.4, ease: 'expo.out', stagger: { each: 0.05, from: 'start' } }),
      })
      // pointer-reactive lift + sage tint
      if (!IS_TOUCH) {
        const setters = chars.map((c) => ({ y: gsap.quickTo(c, 'yPercent', { duration: 0.5, ease: 'power3.out' }), c }))
        const move = (e) => {
          setters.forEach(({ c, y }) => {
            const r = c.getBoundingClientRect()
            const dx = e.clientX - (r.left + r.width / 2)
            const dy = e.clientY - (r.top + r.height / 2)
            const d = Math.hypot(dx, dy)
            const k = Math.max(0, 1 - d / 260)
            y(-k * 18)
            c.style.color = k > 0.05 ? `color-mix(in srgb, #8a9487 ${Math.round(k * 100)}%, #faf9f5)` : ''
          })
        }
        const leave = () => setters.forEach(({ c, y }) => { y(0); c.style.color = '' })
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
      }
      // ambient shimmer sweeping through the letters
      gsap.to(chars, { opacity: 0.72, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: { each: 0.18, from: 'start', repeat: -1, yoyo: true } })
    }, el)
    return () => { ctx.revert(); window.removeEventListener('resize', fit) }
  }, [])
  return (
    <div ref={root} className="footer-wordmark relative select-none overflow-hidden pt-space-lg pb-2" aria-label="FORME REALTY">
      <div data-wm className="block font-display-xl font-light uppercase text-surface-bright whitespace-nowrap leading-[0.9] tracking-[-0.02em] text-center" style={{ fontSize: '10vw' }}>FORME REALTY</div>
    </div>
  )
}

/** The copyright name — each letter rolls on hover and a light sweep passes across it. */
function SignatureName() {
  const letters = 'FORME REALTY'.split('')
  return (
    <span className="signature-name inline-flex font-medium tracking-[0.14em] text-surface-bright" aria-label="FORME REALTY">
      {letters.map((ch, i) => (
        <span key={i} className="sig-letter" style={{ '--i': i }} aria-hidden>
          <span className="sig-inner" data-ch={ch === ' ' ? ' ' : ch}>{ch === ' ' ? ' ' : ch}</span>
        </span>
      ))}
    </span>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    try {
      const r = await db.subscribe(email, 'footer')
      setDone(true); setEmail('')
      toast(r?.duplicate ? 'You are already subscribed — thank you.' : 'Subscribed. New private listings will reach you first.')
    } catch (err) { toast(err.message || 'Could not subscribe', 'error') } finally { setBusy(false) }
  }

  return (
    <footer className="site-footer w-full bg-primary-container text-inverse-on-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop pt-space-xl pb-space-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop pb-space-xl border-b border-outline-variant/15">
          <div className="lg:col-span-5 space-y-space-md pr-space-lg">
            <span className="font-headline-sm text-headline-sm tracking-[0.18em] uppercase text-surface-bright block">FORME REALTY</span>
            <p className="font-body-md text-body-md text-surface-dim font-light leading-relaxed max-w-md">Architecture. Atmosphere. A sense of belonging. Thoughtfully selected residences defined by spatial integrity and natural light.</p>
            <form onSubmit={subscribe} className="pt-space-sm max-w-md" aria-label="Newsletter">
              <label htmlFor="footer-email" className={head + ' mb-3'}>Private listings, first</label>
              <div className="flex items-end gap-3 border-b border-outline-variant/40 focus-within:border-secondary-fixed-dim transition-colors">
                <input id="footer-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={done ? 'Thank you — you are on the list' : 'Your email address'} className="flex-1 bg-transparent border-0 px-0 py-3 font-body-sm text-body-sm text-surface-bright placeholder:text-surface-dim/60 focus:ring-0 focus:outline-none" />
                <button type="submit" disabled={busy} className="pb-3 inline-flex items-center gap-1 font-label-caps text-label-caps uppercase tracking-[0.14em] text-surface-bright hover:text-secondary-fixed-dim transition-colors disabled:opacity-50">
                  {busy ? 'Sending' : 'Subscribe'}<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {COLS.map((c) => (
              <div key={c.title} className={col}>
                <span className={head}>{c.title}</span>
                <ul className="space-y-space-sm">
                  {c.links.map(([label, to]) => (
                    <li key={label} className="leading-none"><Link to={to} className={li}>{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Wordmark />

        <div className="pt-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md text-surface-dim font-body-sm text-body-sm">
          <div className="flex flex-wrap items-center gap-x-space-lg gap-y-space-xs font-label-caps text-label-caps tracking-[0.12em] text-outline-variant">
            <span className="uppercase">Austin · 512.480.9100</span>
            <span className="uppercase">Dallas · 214.520.4400</span>
            <span className="uppercase">Scottsdale · 480.990.2200</span>
          </div>
          <div className="font-body-sm text-body-sm text-outline-variant font-light flex flex-wrap items-center gap-x-2">
            <span>© {new Date().getFullYear()}</span><SignatureName /><span>. All rights reserved.</span>
            <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('forme:scrollto', { detail: 0 }))} className="ml-4 inline-flex items-center gap-1 font-label-caps text-label-caps uppercase tracking-[0.14em] text-surface-dim hover:text-surface-bright transition-colors" aria-label="Back to top">
              Top <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
