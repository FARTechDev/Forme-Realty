import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from '../components/Link'
import PropertyCard, { detailPath } from '../components/PropertyCard'
import { db } from '../lib/db'
import { useData, useDocumentTitle, useSaved } from '../lib/hooks'
import { toggleSaved, priceText, sqft, locationText } from '../lib/propertyFilters'
import { PageHead, Empty, lab, btn, btn2 } from './_shared'
import { toast } from '../components/toast'

export default function Saved() {
  useDocumentTitle('Saved Residences')
  const [sp] = useSearchParams(); const mine = useSaved()
  const shared = sp.get('ids')?.split(',').filter(Boolean)
  const ids = shared || mine
  const { data: all = [], loading } = useData(() => db.publishedProperties(), [], [])
  const rows = useMemo(() => (all || []).filter((p) => ids.includes(p.id)), [all, ids.join()])
  const link = `${location.origin}/saved?ids=${mine.join(',')}`
  const cmp = [['Price', priceText], ['Location', locationText], ['Bedrooms', (p) => p.bedrooms], ['Bathrooms', (p) => p.bathrooms], ['Interior', (p) => sqft(p.area_sqft)], ['Built', (p) => p.year_built || '—'], ['Architect', (p) => p.architect || '—'], ['Listing', (p) => (p.listing_type === 'rent' ? 'To rent' : 'For sale')]]
  return (
    <main className="w-full pt-20 bg-background min-h-screen">
      <PageHead eyebrow="Your Shortlist" title={<>Residences you<br className="hidden sm:inline" /> are considering.</>} intro={shared ? 'A shortlist shared with you.' : 'Saved on this device. Compare them side by side or share the list with someone who matters to the decision.'}>
        {!shared && rows.length > 0 && <button className={btn2} onClick={() => { navigator.clipboard?.writeText(link); toast('Shortlist link copied') }}>Copy share link</button>}
      </PageHead>
      <section className="bg-surface pb-space-xl"><div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop space-y-space-xl">
        {!loading && rows.length === 0 ? <Empty title="Your shortlist is empty." text="Tap the heart on any residence to keep it here." /> : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">{rows.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
            {rows.length > 1 && (
              <div className="space-y-space-md"><h2 className="font-headline-lg text-headline-lg text-primary font-light">Compare</h2>
                <div className="overflow-x-auto" data-lenis-prevent><table className="w-full min-w-[640px] text-left">
                  <thead><tr><th className="p-3" />{rows.map((p) => <th key={p.id} className="p-3 font-headline-sm text-primary align-bottom"><Link to={detailPath(p)}>{p.title}</Link>{!shared && <button className="block text-[12px] text-secondary underline" onClick={() => toggleSaved(p.id)}>Remove</button>}</th>)}</tr></thead>
                  <tbody>{cmp.map(([l, fn]) => <tr key={l} className="border-t border-outline-variant/50"><td className={`p-3 ${lab}`}>{l}</td>{rows.map((p) => <td key={p.id} className="p-3 font-body-md text-primary">{fn(p)}</td>)}</tr>)}</tbody>
                </table></div></div>
            )}
            <div className="flex flex-wrap gap-space-sm"><Link to="/schedule-viewing" className={btn}>Schedule viewings</Link><Link to="/start-a-conversation" className={btn2}>Talk to an advisor</Link></div>
          </>
        )}
      </div></section>
    </main>
  )
}
