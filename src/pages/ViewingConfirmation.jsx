import { useLocation } from 'react-router-dom'
import { Link } from '../components/Link'
import { useDocumentTitle } from '../lib/hooks'
import { lab, btn, btn2 } from './_shared'

function ics(v) {
  const [y, m, d] = v.date.split('-'); const [hh, mm] = v.time.split(':')
  const start = `${y}${m}${d}T${hh}${mm}00`; const end = `${y}${m}${d}T${String(+hh + 1).padStart(2, '0')}${mm}00`
  return `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//FORME REALTY//EN\r\nBEGIN:VEVENT\r\nUID:${v.ref}@formerealty\r\nDTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d+/g, '')}\r\nDTSTART:${start}\r\nDTEND:${end}\r\nSUMMARY:Viewing — ${v.title}\r\nLOCATION:${v.city}\r\nDESCRIPTION:Reference ${v.ref}\r\nEND:VEVENT\r\nEND:VCALENDAR`
}

export default function ViewingConfirmation() {
  useDocumentTitle('Viewing requested')
  const loc = useLocation()
  let v = loc.state
  if (!v) { try { v = JSON.parse(sessionStorage.getItem('forme.viewing')) } catch { /* ignore */ } }
  if (!v) return <main className="w-full pt-32 pb-space-xl bg-background min-h-screen"><div className="max-w-xl mx-auto px-6 text-center space-y-space-md"><h1 className="font-headline-lg text-headline-lg text-primary font-light">No viewing request found.</h1><Link to="/schedule-viewing" className={btn}>Schedule a viewing</Link></div></main>
  const download = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics(v)], { type: 'text/calendar' })); a.download = `viewing-${v.ref}.ics`; a.click() }
  return (
    <main className="w-full pt-20 bg-background min-h-screen"><section className="bg-surface py-space-xl"><div className="max-w-2xl mx-auto px-6 text-center space-y-space-md">
      <span className="material-symbols-outlined text-secondary text-[56px]">event_available</span>
      <span className={`${lab} block`}>Request received</span>
      <h1 data-hero className="font-display-lg text-display-lg text-primary font-light tracking-tight">Thank you, {v.name?.split(' ')[0]}.</h1>
      <p className="font-body-lg text-on-surface-variant font-light">We have your request to view <b className="text-primary">{v.title}</b> on {new Date(v.date).toLocaleDateString('en-GB', { dateStyle: 'full' })} at {v.time}. An advisor will confirm by email at {v.email}.</p>
      <div className="inline-block bg-surface-container-low rounded-lg px-6 py-4"><span className={lab}>Reference</span><div className="font-headline-sm text-primary">{v.ref}</div></div>
      <div className="flex flex-wrap justify-center gap-space-sm pt-space-sm"><button onClick={download} className={btn}>Add to calendar</button><Link to={`/properties/${v.slug}`} className={btn2}>Back to residence</Link><Link to="/properties" className={btn2}>Keep browsing</Link></div>
    </div></section></main>
  )
}
