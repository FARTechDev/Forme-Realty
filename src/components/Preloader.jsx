import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, SplitText } from '../lib/gsap'
import { MOTION } from '../lib/fx'

/** First-visit intro: brand letters rise, a hairline fills, then the curtain lifts. */
export default function Preloader() {
  const root = useRef(null)
  const [gone, setGone] = useState(() => !MOTION || sessionStorage.getItem('forme.intro') === '1')

  useLayoutEffect(() => {
    if (gone) { window.dispatchEvent(new CustomEvent('forme:transition-reveal')); return undefined }
    document.documentElement.classList.add('menu-open')
    const el = root.current
    const ctx = gsap.context(() => {
      const split = SplitText.create(el.querySelector('.pl-name'), { type: 'chars', mask: 'chars' })
      gsap.set(split.chars, { yPercent: 110 })
      gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('forme.intro', '1')
          document.documentElement.classList.remove('menu-open')
          setGone(true)
          window.dispatchEvent(new CustomEvent('forme:transition-reveal'))
        },
      })
        .to(split.chars, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.045 })
        .fromTo('.pl-tag', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.7')
        .to('.pl-bar', { scaleX: 1, duration: 1, ease: 'power2.inOut' }, '-=0.8')
        .to(split.chars, { yPercent: -110, duration: 0.7, ease: 'expo.in', stagger: 0.025 }, '+=0.15')
        .to(el, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=0.3')
    }, el)
    return () => ctx.revert()
  }, [gone])

  if (gone) return null
  return (
    <div ref={root} className="fx-preloader" aria-hidden>
      <div className="pl-name font-display-lg text-display-lg-mobile md:text-display-lg font-light tracking-[0.28em] uppercase">FORME REALTY</div>
      <div className="pl-tag font-label-caps text-label-caps uppercase tracking-[0.3em] text-on-primary-container mt-4 opacity-0">Space to live differently</div>
      <div className="bar"><i className="pl-bar" /></div>
    </div>
  )
}
