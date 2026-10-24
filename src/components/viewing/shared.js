import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../lib/db'
import { useData } from '../../lib/hooks'
import { toast } from '../toast'

export const pad = (n) => String(n).padStart(2, '0')
export const toIso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const fromIso = (s) => { const [y, m, d] = String(s).slice(0, 10).split('-').map(Number); return new Date(y, m - 1, d) }
export const todayDate = () => { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()) }
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
/** "Friday, May 16, 2025" */
export const longDate = (iso) => { if (!iso) return ''; const d = fromIso(iso); return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` }
/** "Wednesday, 14 October 2026" */
export const longDateUk = (iso) => { if (!iso) return ''; const d = fromIso(iso); return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}` }

/** Month grid starting Monday. Returns { label, cells:[{iso,day,inMonth,past}] } */
export function monthGrid(year, month) {
  const first = new Date(year, month, 1)
  const lead = (first.getDay() + 6) % 7
  const start = new Date(year, month, 1 - lead)
  const today = todayDate()
  const total = Math.ceil((lead + new Date(year, month + 1, 0).getDate()) / 7) * 7
  const cells = Array.from({ length: total }, (_, i) => {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
    return { iso: toIso(d), day: d.getDate(), inMonth: d.getMonth() === month, past: d < today, weekday: d.getDay() }
  })
  return { label: `${MONTHS[month]} ${year}`, cells }
}

/** Calendar state: visible month + navigation, bounded to the current month at the low end. */
export function useCalendar() {
  const t = todayDate()
  const [view, setView] = useState({ y: t.getFullYear(), m: t.getMonth() })
  const grid = useMemo(() => monthGrid(view.y, view.m), [view])
  const atMin = view.y === t.getFullYear() && view.m === t.getMonth()
  const shift = (n) => setView((v) => { const d = new Date(v.y, v.m + n, 1); return { y: d.getFullYear(), m: d.getMonth() } })
  const prev = () => !atMin && shift(-1)
  const next = () => shift(1)
  const goTo = (iso) => { const d = fromIso(iso); setView({ y: d.getFullYear(), m: d.getMonth() }) }
  return { grid, atMin, prev, next, goTo }
}

export function money(n, cur = 'USD') {
  const sym = { USD: '$', GBP: '£', EUR: '€', CHF: 'CHF ' }[cur] ?? `${cur} `
  return `${sym}${Number(n).toLocaleString('en-US')}`
}
export function priceOf(p) {
  if (!p) return ''
  if (p.listing_type === 'rent') return p.rent_pcm ? money(p.rent_pcm, p.currency) : p.price_label
  return p.price ? money(p.price, p.currency) : p.price_label || 'Price on Request'
}
export const placeOf = (p) => (p ? [p.neighborhood, p.city, p.country !== 'United States' ? p.country : p.region].filter((v, i, a) => v && a.indexOf(v) === i).join(', ') : '')
export const coverOf = (p) => p?.cover_image || p?.gallery?.[0]?.url || ''

/** First clock time in a string such as "Afternoon (14:00 – 17:00)" or "10:00" -> [h, m] */
export function startOf(t) { const m = /(\d{1,2}):(\d{2})/.exec(t || ''); return m ? [+m[1], +m[2]] : [10, 0] }

/**
 * Shared data flow for both viewing pages: published properties, the :slug preselection,
 * the form submission and the hand-off to /viewing-confirmation.
 */
export function useViewingRequest() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { data: props, loading } = useData(() => db.publishedProperties(), [])
  const [propertyId, setPropertyId] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const list = props || []
  useEffect(() => {
    if (!list.length) return
    const bySlug = slug && list.find((p) => p.slug === slug)
    setPropertyId((cur) => (bySlug ? bySlug.id : cur && list.some((p) => p.id === cur) ? cur : list[0].id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, slug])
  const property = list.find((p) => p.id === propertyId) || null

  async function submit(v) {
    setError('')
    if (!property) { setError('Please choose a property.'); return }
    if (!v.preferred_date) { setError('Please choose a preferred date.'); return }
    setBusy(true)
    try {
      const res = await db.submitViewing({ property_id: property.id, ...v })
      const row = res?.data || res || {}
      const saved = { ...row, ...v, property_id: property.id, ref: row.ref || res?.ref, property_title: property.title, property_slug: property.slug, property_place: placeOf(property) }
      try { sessionStorage.setItem('forme.lastViewing', JSON.stringify(saved)) } catch { /* ignore */ }
      navigate('/viewing-confirmation', { state: { viewing: saved } })
    } catch (e) {
      console.error(e)
      setError('We could not send your request just now. Please try again.')
      toast('We could not send your request. Please try again.', 'error')
    } finally { setBusy(false) }
  }
  return { slug, props: list, loading, propertyId, setPropertyId, property, busy, error, setError, submit }
}

export const VIEWING_TYPES = [
  { v: 'in_person', label: 'In person', icon: 'location_on' },
  { v: 'virtual', label: 'Virtual', icon: 'videocam' },
]

/* ---------- .ics ---------- */
const icsEsc = (s = '') => String(s).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\;')
export function buildIcs(v) {
  const d = fromIso(v.preferred_date)
  const [h, m] = startOf(v.preferred_time)
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m)
  const end = new Date(start.getTime() + 75 * 60000)
  const f = (x) => `${x.getFullYear()}${pad(x.getMonth() + 1)}${pad(x.getDate())}T${pad(x.getHours())}${pad(x.getMinutes())}00`
  const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '')
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//FORME REALTY//Viewing//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
    `UID:${v.ref || Date.now()}@formerealty.com`, `DTSTAMP:${now}`, `DTSTART:${f(start)}`, `DTEND:${f(end)}`,
    `SUMMARY:${icsEsc(`Viewing request: ${v.property_title || 'FORME REALTY'}`)}`,
    `LOCATION:${icsEsc(v.property_place || '')}`,
    `DESCRIPTION:${icsEsc(`Reference ${v.ref || ''}. Provisional request - subject to confirmation by the FORME REALTY private office.${v.preferred_time ? ` Preferred window: ${v.preferred_time}.` : ''}`)}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
}
export function downloadIcs(v) {
  const blob = new Blob([buildIcs(v)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = `${v.ref || 'viewing'}.ics`
  document.body.appendChild(a); a.click(); a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
