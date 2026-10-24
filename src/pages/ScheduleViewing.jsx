import { useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { db } from '../lib/db'
import { useData, useDocumentTitle } from '../lib/hooks'
import { PageHead, lab, inp, btn } from './_shared'
import { toast } from '../components/toast'

const TIMES = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00']
const iso = (d) => d.toISOString().slice(0, 10)

export default function ScheduleViewing() {
  useDocumentTitle('Schedule a Viewing')
  const params = useParams(); const [sp] = useSearchParams(); const nav = useNavigate()
  const { data: props = [] } = useData(() => db.publishedProperties(), [], [])
  const [pid, setPid] = useState(null)
  const slug = params.slug || sp.get('property')
  const selected = pid ?? props.find((p) => p.slug === slug)?.id ?? ''
  const [date, setDate] = useState(''); const [time, setTime] = useState(''); const [type, setType] = useState('in_person'); const [busy, setBusy] = useState(false)
  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i + 1); return d }).filter((d) => d.getDay() !== 0), [])
  const prop = props.find((p) => p.id === selected)

  const submit = async (e) => {
    e.preventDefault()
    if (!selected) return toast('Please choose a property.', 'error')
    if (!date || !time) return toast('Please choose a date and time.', 'error')
    const f = new FormData(e.currentTarget); setBusy(true)
    try {
      const r = await db.submitViewing({ property_id: selected, name: f.get('name'), email: f.get('email'), phone: f.get('phone') || '', preferred_date: date, preferred_time: time, viewing_type: type, attendees: +f.get('attendees') || 1, notes: f.get('notes') || '' })
      const info = { ref: r.ref, title: prop.title, date, time, type, name: f.get('name'), email: f.get('email'), slug: prop.slug, city: prop.city }
      try { sessionStorage.setItem('forme.viewing', JSON.stringify(info)) } catch { /* ignore */ }
      nav('/viewing-confirmation', { state: info })
    } catch (err) { console.error(err); toast('We could not send your request. Please try again.', 'error'); setBusy(false) }
  }

  return (
    <main className="w-full pt-20 bg-background min-h-screen">
      <PageHead eyebrow="Viewings" title={<>See it in person,<br className="hidden sm:inline" /> at your pace.</>} intro="Choose a residence, a day and a time. An advisor will confirm personally, usually within a few hours." />
      <section className="w-full bg-surface pb-space-xl"><form onSubmit={submit} className="max-w-7xl mx-auto px-6 lg:px-margin-desktop grid lg:grid-cols-12 gap-gutter-desktop">
        <div className="lg:col-span-7 space-y-space-lg">
          <div className="space-y-2"><span className={lab}>1 · Residence</span>
            <select value={selected} onChange={(e) => setPid(e.target.value)} className={inp} required><option value="">Select a property…</option>{props.map((p) => <option key={p.id} value={p.id}>{p.title} — {p.city} ({p.listing_type === 'rent' ? 'rent' : 'sale'})</option>)}</select></div>
          <div className="space-y-3"><span className={lab}>2 · Date</span>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">{days.map((d) => <button type="button" key={iso(d)} onClick={() => setDate(iso(d))} className={`rounded-lg py-3 border text-center transition-colors ${date === iso(d) ? 'bg-primary text-on-primary border-primary' : 'border-outline-variant hover:border-primary'}`}><div className="text-[11px] uppercase tracking-wider opacity-70">{d.toLocaleDateString('en-GB', { weekday: 'short' })}</div><div className="font-headline-sm">{d.getDate()}</div><div className="text-[11px] opacity-70">{d.toLocaleDateString('en-GB', { month: 'short' })}</div></button>)}</div></div>
          <div className="space-y-3"><span className={lab}>3 · Time</span>
            <div className="flex flex-wrap gap-2">{TIMES.map((t) => <button type="button" key={t} onClick={() => setTime(t)} className={`px-5 py-3 rounded-lg border transition-colors ${time === t ? 'bg-primary text-on-primary border-primary' : 'border-outline-variant hover:border-primary'}`}>{t}</button>)}</div></div>
          <div className="space-y-3"><span className={lab}>4 · Format</span>
            <div className="flex gap-2">{[['in_person', 'In person', 'location_on'], ['virtual', 'Virtual tour', 'videocam']].map(([v, l, ic]) => <button type="button" key={v} onClick={() => setType(v)} className={`flex items-center gap-2 px-5 py-3 rounded-lg border transition-colors ${type === v ? 'bg-primary text-on-primary border-primary' : 'border-outline-variant hover:border-primary'}`}><span className="material-symbols-outlined text-[18px]">{ic}</span>{l}</button>)}</div></div>
        </div>
        <aside className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg space-y-space-md shadow-sm self-start">
          <span className={lab}>Your details</span>
          <input name="name" required placeholder="Full name" className={inp} />
          <input name="email" type="email" required placeholder="Email address" className={inp} />
          <input name="phone" placeholder="Phone (optional)" className={inp} />
          <input name="attendees" type="number" min="1" max="8" defaultValue="1" className={inp} aria-label="Attendees" />
          <textarea name="notes" rows={3} placeholder="Anything we should prepare? (optional)" className={inp} />
          {prop && <div className="text-on-surface-variant text-[13px]">{prop.title} · {date ? new Date(date).toLocaleDateString('en-GB', { dateStyle: 'full' }) : 'choose a date'} {time && `at ${time}`}</div>}
          <button disabled={busy} className={`${btn} w-full disabled:opacity-60`}>{busy ? 'Sending…' : 'Request viewing'}</button>
        </aside>
      </form></section>
    </main>
  )
}
