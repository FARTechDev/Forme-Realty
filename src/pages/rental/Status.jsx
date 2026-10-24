import { Link } from '../../components/Link'
import { Shell, Lookup, SubNav, STATUS, useApplication, btn, btn2, lab } from './flow'

const STEPS = ['submitted', 'under_review', 'approved']

export default function Status() {
  const app = useApplication(); const { bundle: b, loading } = app
  if (loading) return <main className="min-h-screen bg-background pt-32" />
  if (!b) return <Shell title="Track your application" back={false} intro="Enter your reference and email to see where things stand."><Lookup app={app} /><p className="text-[14px] text-on-surface-variant">Not applied yet? <Link to="/rentals" className="underline">Browse rentals</Link>.</p></Shell>
  const a = b.application; const [label, text] = STATUS[a.status] || [a.status, '']
  const idx = a.status === 'info_requested' ? 1 : STEPS.indexOf(a.status)
  const open = b.requests.filter((r) => r.status === 'open')
  return (
    <Shell title={label} back={false} intro={text}>
      <SubNav current="/rental-application/status" />
      <div className="grid sm:grid-cols-3 gap-3">{['Submitted', 'In review', 'Decision'].map((s, i) => <div key={s} className={`rounded-lg p-4 border ${i <= idx ? 'bg-primary text-on-primary border-primary' : 'border-outline-variant text-on-surface-variant'}`}><div className="text-[12px] uppercase tracking-wider opacity-70">Step {i + 1}</div>{s}</div>)}</div>
      <div className="bg-surface-container-lowest rounded-xl shadow-sm divide-y divide-outline-variant/50">
        {[['Reference', a.ref], ['Home', b.property?.title || a.property_title], ['Applicant', a.applicant_name], ['Move-in', a.move_in_date && new Date(a.move_in_date).toLocaleDateString('en-GB', { dateStyle: 'long' })], ['Term', a.tenancy_term], ['Last update', new Date(a.updated_at).toLocaleString('en-GB')]].map(([l, v]) => v ? <div key={l} className="flex justify-between gap-6 p-4"><span className={lab}>{l}</span><span className="text-primary text-right">{v}</span></div> : null)}
      </div>
      {open.length > 0 && <div className="bg-secondary-container/40 rounded-xl p-space-md flex flex-wrap items-center justify-between gap-4"><span className="text-primary">{open.length} item{open.length > 1 ? 's' : ''} need your attention.</span><Link to="/rental-application/additional-information" className={btn}>Respond</Link></div>}
      <div className="flex flex-wrap gap-space-sm">
        <Link to="/rental-application/messages" className={btn}>Message advisor</Link>
        {!['withdrawn', 'declined'].includes(a.status) && <Link to="/rental-application/withdraw" className={btn2}>Withdraw application</Link>}
        <button className="font-label-caps text-label-caps uppercase text-secondary underline underline-offset-4 px-3" onClick={app.signOut}>Sign out</button>
      </div>
    </Shell>
  )
}
