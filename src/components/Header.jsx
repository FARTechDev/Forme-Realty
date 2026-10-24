import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link, NavLink } from './Link'
import { PRIMARY_NAV, MENU_GROUPS } from './nav'
import { useSaved } from '../lib/hooks'
import { gsap } from '../lib/gsap'
import { MOTION } from '../lib/fx'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const saved = useSaved()
  const loc = useLocation()
  const menu = useRef(null)
  const header = useRef(null)
  const lastY = useRef(0)

  // hide on scroll down, show on scroll up
  useEffect(() => {
    const on = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      if (!open) setHidden(y > lastY.current && y > 240)
      lastY.current = y
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [open])

  useEffect(() => { setOpen(false) }, [loc.pathname])

  // slide-up menu overlay
  useLayoutEffect(() => {
    const el = menu.current
    if (!el) return
    document.documentElement.classList.toggle('menu-open', open)
    if (!MOTION) { el.style.visibility = open ? 'visible' : 'hidden'; return }
    const items = el.querySelectorAll('[data-menu-item]')
    gsap.killTweensOf([el, items])
    if (open) {
      gsap.set(el, { visibility: 'visible' })
      gsap.fromTo(el, { yPercent: -100 }, { yPercent: 0, duration: 0.85, ease: 'expo.inOut' })
      gsap.fromTo(items, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.035, delay: 0.35 })
    } else if (el.style.visibility === 'visible') {
      gsap.to(el, { yPercent: -100, duration: 0.7, ease: 'expo.inOut', onComplete: () => gsap.set(el, { visibility: 'hidden' }) })
    }
  }, [open])

  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])

  const linkCls = ({ isActive }) =>
    `nav-link relative uppercase transition-colors duration-200 tracking-[0.14em] font-label-caps text-label-caps ${isActive ? 'text-primary font-medium is-active' : 'text-on-surface-variant hover:text-primary'}`

  return (
    <>
      <header ref={header} className={`site-header fixed top-0 left-0 right-0 w-full z-50 transition-transform duration-500 ease-out ${hidden ? '-translate-y-full' : 'translate-y-0'} ${scrolled || open ? 'bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.03)]' : 'bg-surface/70 backdrop-blur-sm'}`}>
        <div className="h-20 max-w-7xl mx-auto px-6 lg:px-margin-desktop flex items-center justify-between">
          <Link to="/" className="flex items-center gap-space-sm group relative z-[60]" aria-label="FORME REALTY — home" data-cursor="Home">
            <span className="font-headline-sm text-headline-sm tracking-[0.16em] uppercase text-primary font-medium wordmark">FORME REALTY</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-gutter-desktop" aria-label="Primary">
            {PRIMARY_NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className={linkCls} end={n.to === '/'}>{n.label}</NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-space-lg relative z-[60]">
            <Link to="/start-a-conversation" className="cta hidden md:inline-flex items-center justify-center px-space-md py-space-sm rounded-lg bg-primary-container text-on-primary font-label-caps text-label-caps uppercase tracking-[0.14em] hover:bg-secondary transition-colors duration-200">
              Arrange a Consultation
            </Link>
            <Link to="/saved" className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg ring-1 ring-outline-variant/40 text-primary hover:bg-surface-container transition-colors" aria-label="Saved properties" data-cursor="Saved">
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              {saved.length > 0 && <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-secondary text-on-secondary text-[10px] leading-[18px] text-center font-semibold">{saved.length}</span>}
            </Link>
            <button type="button" onClick={() => setOpen((o) => !o)} className="menu-btn inline-flex items-center justify-center w-9 h-9 rounded-lg ring-1 ring-outline-variant/40 text-primary hover:bg-surface-container transition-colors" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
              <span className={`menu-icon ${open ? 'is-open' : ''}`}><i /><i /></span>
            </button>
          </div>
        </div>
      </header>

      <div ref={menu} className="fixed inset-0 z-[45] bg-[#151715] text-surface-bright overflow-y-auto" style={{ visibility: 'hidden' }} role="dialog" aria-modal="true" aria-label="Site menu">
        <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop pt-32 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-gutter-desktop gap-y-12">
            {MENU_GROUPS.map((g) => (
              <div key={g.title}>
                <div className="overflow-hidden mb-5"><span data-menu-item className="block font-label-caps text-label-caps uppercase tracking-[0.18em] text-on-primary-container">{g.title}</span></div>
                <ul className="space-y-3">
                  {g.links.map((l) => (
                    <li key={l.to} className="overflow-hidden">
                      <Link to={l.to} data-menu-item className="menu-link block font-headline-sm text-headline-sm font-light text-surface-bright/90 hover:text-secondary-fixed-dim transition-colors">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="overflow-hidden mt-16 pt-8 border-t border-white/10">
            <p data-menu-item className="font-label-caps text-label-caps uppercase tracking-[0.14em] text-on-primary-container">concierge@formerealty.com · Austin 512.480.9100 · Dallas 214.520.4400 · Scottsdale 480.990.2200</p>
          </div>
        </div>
      </div>
    </>
  )
}
