import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap } from '../lib/gsap'
import { PLAIN } from '../lib/fx'

const Ctx = createContext({ go: null })
export const useTransition = () => useContext(Ctx)

/** Curtain wipe between routes. `go(to)` slides a dark panel up, navigates, then lifts it away. */
export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const loc = useLocation()
  const panel = useRef(null)
  const label = useRef(null)
  const busy = useRef(false)

  const go = useCallback((to) => {
    const target = typeof to === 'string' ? to : to.pathname + (to.search || '') + (to.hash || '')
    const [path, hash] = target.split('#')
    const same = path === window.location.pathname + window.location.search || path === window.location.pathname
    if (PLAIN || busy.current) { navigate(target); return }
    if (same && hash) { navigate(target); window.dispatchEvent(new CustomEvent('forme:scrollto', { detail: '#' + hash })); return }
    busy.current = true
    window.dispatchEvent(new CustomEvent('forme:transition-start'))
    const tl = gsap.timeline({ onComplete: () => { busy.current = false } })
    tl.set(panel.current, { yPercent: 100, display: 'flex' })
      .to(panel.current, { yPercent: 0, duration: 0.7, ease: 'expo.inOut' })
      .fromTo(label.current, { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: 'expo.out' }, '-=0.35')
      .add(() => { navigate(target); window.scrollTo(0, 0); window.dispatchEvent(new CustomEvent('forme:route-swapped')) })
      .to({}, { duration: 0.25 })
      .to(label.current, { yPercent: -110, duration: 0.4, ease: 'expo.in' })
      .add(() => window.dispatchEvent(new CustomEvent('forme:transition-reveal')), '-=0.15')
      .to(panel.current, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, '-=0.1')
      .set(panel.current, { display: 'none' })
  }, [navigate])

  // direct navigation (back/forward/first load) — keep scroll at top
  useEffect(() => { if (!loc.hash) window.scrollTo(0, 0) }, [loc.pathname])

  return (
    <Ctx.Provider value={{ go }}>
      {children}
      <div ref={panel} className="fixed inset-0 z-[250] bg-[#151715] hidden items-center justify-center pointer-events-none" aria-hidden>
        <div className="overflow-hidden">
          <div ref={label} className="font-headline-lg text-headline-lg text-surface-bright font-light tracking-[0.3em] uppercase">FORME REALTY</div>
        </div>
      </div>
    </Ctx.Provider>
  )
}
