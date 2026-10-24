import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from '../components/Link'
import PropertyCard, { SaveButton } from '../components/PropertyCard'
import NotFound from './NotFound'
import { db } from '../lib/db'
import { useData, useDocumentTitle } from '../lib/hooks'
import { priceText, sqft, sqm, locationText, bathsText, money } from '../lib/propertyFilters'
import { toast } from '../components/toast'

const lab = 'font-label-caps text-label-caps uppercase tracking-[0.14em] text-secondary'
const inp = 'w-full bg-surface-container-low border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 px-0 py-3 font-body-md text-body-md outline-none transition-colors'

function Lightbox({ items, index, onClose, setIndex }) {
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') setIndex((index + 1) % items.length); if (e.key === 'ArrowLeft') setIndex((index - 1 + items.length) % items.length) }
    window.addEventListener('keydown', k); document.documentElement.classList.add('lenis-stopped')
    return () => { window.removeEventListener('keydown', k); document.documentElement.classList.remove('lenis-stopped') }
  }, [index, items.length, onClose, setIndex])
  const it = items[index]
  return (
    <div className="fixed inset-0 z-[200] bg-primary/95 flex flex-col items-center justify-center p-6" data-lenis-prevent onClick={onClose}>
      <button className="absolute top-6 right-6 text-on-primary" aria-label="Close"><span className="material-symbols-outlined text-[32px]">close</span></button>
      <img src={it.url} alt={it.caption} className="max-h-[78vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
      <p className="mt-4 text-on-primary/80 font-body-sm">{it.caption} <span className="opacity-60">· {index + 1} / {items.length}</span></p>
      <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
        <button className="pointer-events-auto text-on-primary p-2" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + items.length) % items.length) }}><span className="material-symbols-outlined text-[40px]">chevron_left</span></button>
        <button className="pointer-events-auto text-on-primary p-2" aria-label="Next" onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % items.length) }}><span className="material-symbols-outlined text-[40px]">chevron_right</span></button>
      </div>
    </div>
  )
}

function EnquiryForm({ p }) {
  const [state, setState] = useState({ busy: false, ref: '' })
  const rent = p.listing_type === 'rent'
  const submit = async (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setState({ busy: true, ref: '' })
    try {
      const r = await db.submitInquiry({ type: 'property', name: f.get('name'), email: f.get('email'), phone: f.get('phone') || '', subject: `Enquiry — ${p.title}`, message: f.get('message') || '', property_id: p.id, payload: { property: p.title, slug: p.slug, listing_type: p.listing_type } })
      setState({ busy: false, ref: r?.data?.ref || r?.ref || 'received' })
    } catch (err) { console.error(err); toast('Something went wrong — please try again.', 'error'); setState({ busy: false, ref: '' }) }
  }
  if (state.ref) return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg space-y-space-sm">
      <span className="material-symbols-outlined text-secondary text-[36px]">mark_email_read</span>
      <h3 className="font-headline-sm text-headline-sm text-primary">Thank you — your enquiry is with us.</h3>
      <p className="font-body-md text-on-surface-variant font-light">A member of the team will reply personally within one working day.{state.ref !== 'received' && <> Your reference is <b className="text-primary">{state.ref}</b>.</>}</p>
    </div>
  )
  return (
    <form onSubmit={submit} className="bg-surface-container-lowest rounded-xl p-space-lg space-y-space-md shadow-sm">
      <h3 className="font-headline-sm text-headline-sm text-primary">Interested in {p.title}?</h3>
      <input name="name" required placeholder="Full name" className={inp} />
      <input name="email" type="email" required placeholder="Email address" className={inp} />
      <input name="phone" placeholder="Phone (optional)" className={inp} />
      <textarea name="message" rows={3} placeholder={rent ? 'Preferred move-in date, household, questions…' : 'Tell us what you would like to know…'} className={inp} />
      <button disabled={state.busy} className="cta w-full py-3.5 rounded-lg bg-primary-container text-on-primary font-label-caps text-label-caps uppercase tracking-[0.14em] disabled:opacity-60">{state.busy ? 'Sending…' : 'Send enquiry'}</button>
      <p className="text-[12px] text-on-surface-variant">By submitting you agree to our <Link to="/privacy-policy" className="underline">privacy policy</Link>.</p>
    </form>
  )
}

export default function PropertyDetail() {
  const { slug } = useParams()
  const { data: p, loading } = useData(() => db.propertyBySlug(slug), [slug])
  const { data: all } = useData(() => db.publishedProperties(), [], [])
  const [lb, setLb] = useState(-1)
  useDocumentTitle(p?.title)
  useEffect(() => { if (p?.id) db.trackPropertyView(p.id) }, [p?.id])

  if (loading) return <main className="min-h-screen pt-32 bg-background" />
  if (!p || p.published === false) return <NotFound />

  const rent = p.listing_type === 'rent'
  const gallery = (p.gallery?.length ? p.gallery : [{ url: p.cover_image, caption: p.title }]).filter((g) => g.url)
  const similar = (all || []).filter((x) => x.id !== p.id && x.listing_type === p.listing_type).slice(0, 3)
  const specs = p.specs?.length ? p.specs : [
    { label: 'Bedrooms', value: p.bedrooms }, { label: 'Bathrooms', value: p.bathrooms }, { label: 'Interior', value: `${sqft(p.area_sqft)} · ${sqm(p.area_sqm)}` },
    p.lot_size && { label: 'Grounds', value: p.lot_size }, p.year_built && { label: 'Completed', value: p.year_built }, p.parking && { label: 'Parking', value: p.parking },
  ].filter(Boolean)
  const facts = [
    ['bed', `${p.bedrooms} bedrooms`], ['bathtub', bathsText(p.bathrooms)], ['square_foot', sqft(p.area_sqft)], p.year_built && ['calendar_month', `Built ${p.year_built}`],
  ].filter(Boolean)

  return (
    <main className="w-full pt-20 bg-background min-h-screen">
      <section className="w-full bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop pt-space-lg">
          <nav className="flex flex-wrap items-center gap-2 font-label-caps text-label-caps uppercase text-on-surface-variant tracking-[0.1em]">
            <Link to={rent ? '/rentals' : '/properties'} className="hover:text-primary transition-colors">{rent ? 'Rentals' : 'Portfolio'}</Link><span>/</span>
            <Link to={`/residences?city=${encodeURIComponent(p.city)}`} className="hover:text-primary transition-colors">{locationText(p)}</Link>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg pt-space-lg pb-space-lg">
            <div className="lg:w-8/12 space-y-space-sm">
              {p.badge && <span className={lab}>{p.badge}</span>}
              <h1 className="font-display-lg text-display-lg text-primary tracking-tight font-light leading-[1.05]">{p.title}</h1>
              {p.subtitle && <p className="font-body-lg text-body-lg text-on-surface-variant font-light max-w-2xl">{p.subtitle}</p>}
            </div>
            <div className="flex flex-col items-start lg:items-end gap-space-sm">
              <div className="font-headline-md text-headline-md text-primary">{priceText(p)}</div>
              <div className="flex items-center gap-space-sm">
                <SaveButton id={p.id} className="!bg-surface-container" />
                <button type="button" onClick={() => { navigator.clipboard?.writeText(location.href); toast('Link copied') }} className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors" aria-label="Share"><span className="material-symbols-outlined text-[20px]">ios_share</span></button>
                <Link to={`/schedule-viewing/${p.slug}`} className="cta px-space-lg py-3 rounded-lg bg-primary-container text-on-primary font-label-caps text-label-caps uppercase tracking-[0.14em]">Schedule a viewing</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop pb-space-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 h-[60vh] min-h-[380px]">
            {gallery.slice(0, 5).map((g, i) => (
              <button key={i} type="button" data-cursor="Expand" onClick={() => setLb(i)} className={`relative overflow-hidden rounded-xl bg-surface-container group ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                <img src={g.url} alt={g.caption || p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading={i ? 'lazy' : 'eager'} />
                {i === 4 && gallery.length > 5 && <span className="absolute inset-0 bg-primary/55 text-on-primary flex items-center justify-center font-label-caps text-label-caps uppercase tracking-[0.14em]">+{gallery.length - 5} more</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container-lowest py-space-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
          <div className="lg:col-span-7 space-y-space-lg">
            <div className="flex flex-wrap gap-space-lg">{facts.map(([ic, t]) => <div key={t} className="flex items-center gap-2 text-primary"><span className="material-symbols-outlined text-secondary">{ic}</span><span className="font-body-md">{t}</span></div>)}</div>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-light">Designed around the way you live.</h2>
            <div className="space-y-space-sm font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
              {(p.description || p.summary || '').split(/\n\n+/).map((t, i) => <p key={i}>{t}</p>)}
            </div>
            {p.features?.length > 0 && (
              <div className="space-y-space-sm pt-space-sm">
                <span className={lab}>Features</span>
                <ul className="grid sm:grid-cols-2 gap-x-space-lg gap-y-2">{p.features.map((f) => <li key={f} className="flex items-center gap-2 font-body-md text-primary"><span className="material-symbols-outlined text-secondary text-[18px]">check</span>{f}</li>)}</ul>
              </div>
            )}
          </div>
          <aside className="lg:col-span-5 lg:sticky lg:top-28 self-start"><EnquiryForm p={p} /></aside>
        </div>
      </section>

      <section className="w-full bg-surface-container-low py-space-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop space-y-space-lg">
          <h2 className="font-headline-md text-headline-md text-primary font-light">{rent ? 'Terms & Specification' : 'Architectural & Spatial Data'}</h2>
          <dl className="grid md:grid-cols-2 gap-x-gutter-desktop">
            {specs.map((s) => <div key={s.label} className="flex items-baseline justify-between gap-4 py-4 border-b border-outline-variant/50"><dt className={lab}>{s.label}</dt><dd className="font-body-md text-primary text-right">{s.value}</dd></div>)}
            {rent && p.available_from && <div className="flex items-baseline justify-between gap-4 py-4 border-b border-outline-variant/50"><dt className={lab}>Available from</dt><dd className="text-primary">{new Date(p.available_from).toLocaleDateString('en-GB', { dateStyle: 'long' })}</dd></div>}
            {rent && p.lease_term && <div className="flex items-baseline justify-between gap-4 py-4 border-b border-outline-variant/50"><dt className={lab}>Lease term</dt><dd className="text-primary">{p.lease_term}</dd></div>}
            {rent && <div className="flex items-baseline justify-between gap-4 py-4 border-b border-outline-variant/50"><dt className={lab}>Furnishing</dt><dd className="text-primary">{p.furnished ? 'Furnished' : 'Unfurnished'}</dd></div>}
            {p.materials && <div className="flex items-baseline justify-between gap-4 py-4 border-b border-outline-variant/50"><dt className={lab}>Materials</dt><dd className="text-primary text-right">{p.materials}</dd></div>}
            {p.architect && <div className="flex items-baseline justify-between gap-4 py-4 border-b border-outline-variant/50"><dt className={lab}>Architect</dt><dd className="text-primary">{p.architect}</dd></div>}
          </dl>
        </div>
      </section>

      <section className="w-full bg-primary-container text-on-primary py-space-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop flex flex-col md:flex-row md:items-center justify-between gap-space-lg">
          <div className="space-y-space-xs max-w-xl">
            <h2 className="font-headline-lg text-headline-lg font-light tracking-tight">{rent ? 'Ready to make this home yours?' : 'Could this be your next chapter?'}</h2>
            <p className="font-body-md font-light opacity-80">{rent ? `Applications for ${p.title} take about ten minutes and can be tracked online.` : 'See it in person, privately and at your own pace.'}</p>
          </div>
          <div className="flex flex-wrap gap-space-sm">
            {rent && <Link to={`/rental-application?property=${p.slug}`} className="cta px-space-lg py-3 rounded-lg bg-surface text-primary font-label-caps text-label-caps uppercase tracking-[0.14em]">Apply now</Link>}
            <Link to={`/schedule-viewing/${p.slug}`} className="px-space-lg py-3 rounded-lg border border-on-primary/60 font-label-caps text-label-caps uppercase tracking-[0.14em] hover:bg-on-primary hover:text-primary transition-colors">Arrange a viewing</Link>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="w-full bg-surface py-space-xl">
          <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop space-y-space-lg">
            <div className="flex items-end justify-between"><h2 className="font-headline-lg text-headline-lg text-primary font-light tracking-tight">{rent ? 'More places to consider' : 'Explore other residences'}</h2><Link to={rent ? '/rentals' : '/properties'} className={`${lab} hover:text-primary`}>View all</Link></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">{similar.map((x) => <PropertyCard key={x.id} p={x} />)}</div>
          </div>
        </section>
      )}
      {lb >= 0 && <Lightbox items={gallery} index={lb} setIndex={setLb} onClose={() => setLb(-1)} />}
    </main>
  )
}
