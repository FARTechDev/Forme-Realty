import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from '../components/Link'
import PropertyCard from '../components/PropertyCard'
import { db } from '../lib/db'
import { useData, useDocumentTitle } from '../lib/hooks'
import { filterProperties, ALL_FEATURES, PROPERTY_TYPES } from '../lib/propertyFilters'

const SALE_PRICES = [['', 'Any price'], [1000000, '$1M+'], [3000000, '$3M+'], [5000000, '$5M+'], [8000000, '$8M+']]
const RENT_PRICES = [['', 'Any rent'], [5000, '$5,000+'], [8000, '$8,000+'], [12000, '$12,000+']]
const SORTS = [['', 'Featured'], ['newest', 'Newest'], ['price_asc', 'Price: low to high'], ['price_desc', 'Price: high to low'], ['area', 'Largest']]

const sel = 'bg-surface text-on-surface rounded-lg px-space-md py-2.5 font-body-sm text-body-sm border border-transparent focus:border-secondary focus:outline-none cursor-pointer'

function Pill({ label, children }) {
  return <label className="flex flex-col gap-1"><span className="font-label-caps text-label-caps uppercase text-secondary">{label}</span>{children}</label>
}

/** Shared catalogue: mode = 'sale' | 'rent' | 'all'; advanced adds the full search panel. */
export default function Listing({ mode = 'sale', advanced = false, eyebrow, title, intro, heading, headingIntro }) {
  useDocumentTitle(typeof title === 'string' ? title : 'Residences')
  const [sp, setSp] = useSearchParams()
  const [open, setOpen] = useState(advanced)
  const { data, loading } = useData(() => db.publishedProperties(mode === 'all' ? {} : { listing_type: mode }), [mode], [])
  const get = (k, d = '') => sp.get(k) ?? d
  const set = (k, v) => { const n = new URLSearchParams(sp); v === '' || v == null || (Array.isArray(v) && !v.length) ? n.delete(k) : n.set(k, Array.isArray(v) ? v.join(',') : v); setSp(n, { replace: true }) }
  const features = get('features') ? get('features').split(',') : []
  const filters = {
    q: get('q'), listing_type: mode === 'all' ? get('type') : mode, city: get('city'), property_type: get('ptype'),
    minPrice: +get('min') || 0, beds: +get('beds') || 0, baths: +get('baths') || 0, features, sort: get('sort'),
    minArea: +get('minArea') || 0, newThisWeek: get('new') === '1', furnished: get('furnished') === '1',
  }
  const cities = useMemo(() => [...new Set((data || []).map((p) => p.city))].sort(), [data])
  const rows = useMemo(() => filterProperties(data || [], filters), [data, sp, mode]) // eslint-disable-line
  const prices = mode === 'rent' ? RENT_PRICES : SALE_PRICES
  const active = [...sp.keys()].filter((k) => !['sort', 'plain'].includes(k)).length

  return (
    <main className="w-full pt-20 bg-background min-h-screen">
      <section className="w-full bg-surface pt-space-xl pb-space-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop flex flex-col lg:flex-row lg:items-end justify-between gap-gutter-desktop">
          <div className="lg:w-7/12 space-y-space-sm">
            <div className="flex items-center gap-space-sm"><span className="inline-block w-2 h-2 rounded-full bg-secondary" /><span className="font-label-caps text-label-caps uppercase text-secondary tracking-[0.14em]">{eyebrow}</span></div>
            <h1 className="font-display-lg text-display-lg text-primary tracking-tight font-light leading-[1.08]">{title}</h1>
          </div>
          <div className="lg:w-4/12 flex flex-col items-start gap-space-md lg:pb-space-xs">
            <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">{intro}</p>
            <Link to={mode === 'rent' ? '/rental-application/status' : '/our-approach'} className="inline-flex items-center gap-2 font-label-caps text-label-caps uppercase text-primary tracking-[0.14em] hover:text-secondary transition-colors group">
              {mode === 'rent' ? 'Track an application' : 'Our Approach to Property'} <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface sticky top-20 z-40 shadow-sm" data-no-anim>
        <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop py-space-md">
          <div className="bg-surface-container-low rounded-xl px-space-md py-space-sm flex flex-col gap-space-md">
            <div className="flex flex-wrap items-end gap-space-sm">
              <Pill label="Search"><input className={`${sel} min-w-[200px]`} placeholder="City, architect, name…" defaultValue={get('q')} onChange={(e) => set('q', e.target.value)} /></Pill>
              {mode === 'all' && <Pill label="Listing"><select className={sel} value={get('type')} onChange={(e) => set('type', e.target.value)}><option value="">For sale &amp; rent</option><option value="sale">For sale</option><option value="rent">To rent</option></select></Pill>}
              <Pill label="Location"><select className={sel} value={get('city')} onChange={(e) => set('city', e.target.value)}><option value="">All regions</option>{cities.map((c) => <option key={c}>{c}</option>)}</select></Pill>
              <Pill label="Type"><select className={sel} value={get('ptype')} onChange={(e) => set('ptype', e.target.value)}><option value="">All types</option>{PROPERTY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select></Pill>
              <Pill label="Price"><select className={sel} value={get('min')} onChange={(e) => set('min', e.target.value)}>{prices.map(([v, l]) => <option key={l} value={v}>{l}</option>)}</select></Pill>
              <Pill label="Bedrooms"><select className={sel} value={get('beds')} onChange={(e) => set('beds', e.target.value)}><option value="">Any</option>{[2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}</select></Pill>
              <Pill label="Sort"><select className={sel} value={get('sort')} onChange={(e) => set('sort', e.target.value)}>{SORTS.map(([v, l]) => <option key={l} value={v}>{l}</option>)}</select></Pill>
              <button type="button" onClick={() => setOpen((o) => !o)} className="cta inline-flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-primary-container text-on-primary font-label-caps text-label-caps uppercase tracking-[0.12em]">
                <span className="material-symbols-outlined text-[18px]">tune</span>{open ? 'Fewer filters' : 'More filters'}
              </button>
              {active > 0 && <button type="button" onClick={() => setSp({}, { replace: true })} className="font-label-caps text-label-caps uppercase text-secondary underline underline-offset-4 py-3">Clear all</button>}
            </div>
            {open && (
              <div className="flex flex-wrap items-end gap-space-md pt-space-sm border-t border-outline-variant/40">
                <Pill label="Baths"><select className={sel} value={get('baths')} onChange={(e) => set('baths', e.target.value)}><option value="">Any</option>{[2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}</select></Pill>
                <Pill label="Min. area (sq m)"><select className={sel} value={get('minArea')} onChange={(e) => set('minArea', e.target.value)}><option value="">Any</option>{[150, 250, 350, 450].map((n) => <option key={n} value={n}>{n}+</option>)}</select></Pill>
                <label className="flex items-center gap-2 font-body-sm text-body-sm cursor-pointer py-3"><input type="checkbox" checked={get('new') === '1'} onChange={(e) => set('new', e.target.checked ? '1' : '')} className="accent-[#4d6453]" /> New this week</label>
                {mode !== 'sale' && <label className="flex items-center gap-2 font-body-sm text-body-sm cursor-pointer py-3"><input type="checkbox" checked={get('furnished') === '1'} onChange={(e) => set('furnished', e.target.checked ? '1' : '')} className="accent-[#4d6453]" /> Furnished</label>}
                <div className="flex flex-wrap gap-2">
                  {ALL_FEATURES.map((f) => {
                    const on = features.includes(f)
                    return <button key={f} type="button" onClick={() => set('features', on ? features.filter((x) => x !== f) : [...features, f])} className={`px-3 py-2 rounded-full font-label-caps text-label-caps uppercase tracking-[0.1em] border transition-colors ${on ? 'bg-primary text-on-primary border-primary' : 'border-outline-variant text-on-surface-variant hover:border-primary'}`}>{f}</button>
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="w-full bg-surface py-space-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-space-lg gap-space-sm">
            <div className="space-y-space-xs">
              <span className="font-label-caps text-label-caps uppercase text-secondary tracking-[0.14em]">{loading ? 'Loading…' : `${rows.length} ${rows.length === 1 ? 'result' : 'results'}`}</span>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-light">{heading}</h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md font-light">{headingIntro}</p>
          </div>
          {!loading && rows.length === 0 ? (
            <div className="text-center py-space-xl space-y-space-md">
              <p className="font-headline-sm text-headline-sm text-primary">Nothing matches just yet.</p>
              <p className="font-body-md text-on-surface-variant font-light">Loosen a filter or let us introduce you to residences before they are public.</p>
              <Link to="/start-a-conversation" className="cta inline-flex px-space-lg py-3 rounded-lg bg-primary-container text-on-primary font-label-caps text-label-caps uppercase tracking-[0.14em]">Speak with an advisor</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">{rows.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
          )}
        </div>
      </section>

      <section className="w-full bg-surface-container-high py-space-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop flex flex-col md:flex-row md:items-center justify-between gap-space-lg">
          <h2 className="font-display-lg text-headline-lg sm:text-display-lg text-primary tracking-tight font-light max-w-2xl">Find a residence that feels like you.</h2>
          <div className="flex flex-wrap gap-space-sm">
            <Link to="/start-a-conversation" className="cta px-space-lg py-3 rounded-lg bg-primary-container text-on-primary font-label-caps text-label-caps uppercase tracking-[0.14em]">Speak with an advisor</Link>
            <Link to="/schedule-viewing" className="px-space-lg py-3 rounded-lg border border-primary text-primary font-label-caps text-label-caps uppercase tracking-[0.14em] hover:bg-primary hover:text-on-primary transition-colors">Schedule a viewing</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
