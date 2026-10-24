import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { db } from '../../lib/db'
import { Shell, getDraft, setDraft, setSession, btn, btn2, lab } from './flow'
import { Link } from '../../components/Link'
import { toast } from '../../components/toast'

const ROWS = [['Home', 'property_title'], ['Move-in', 'move_in_date'], ['Term', 'tenancy_term'], ['Occupants', 'occupants'], ['Name', 'applicant_name'], ['Email', 'email'], ['Phone', 'phone'], ['Employment', 'employment_status'], ['Employer', 'employer'], ['References', 'references_text'], ['Notes', 'special_notes']]

export default function Review() {
  const d = getDraft(); const nav = useNavigate(); const [busy, setBusy] = useState(false); const [ok, setOk] = useState(false)
  if (!d && !ok) return <Navigate to="/rental-application" replace />
  const send = async () => {
    setBusy(true)
    try {
      const { property_title, rent_pcm, ...row } = d
      const a = await db.submitApplication({ ...row, property_title })
      setSession({ ref: a.ref, email: d.email.toLowerCase() }); setDraft(null); setOk(true)
      nav('/rental-application/confirmation', { state: { ref: a.ref, email: d.email, title: property_title } })
    } catch (e) { console.error(e); toast('We could not submit your application. Please try again.', 'error'); setBusy(false) }
  }
  return (
    <Shell title="Review your application" back={false} intro="Please check the details below before submitting.">
      <dl className="bg-surface-container-lowest rounded-xl divide-y divide-outline-variant/50 shadow-sm">{ROWS.map(([l, k]) => d?.[k] ? <div key={k} className="flex justify-between gap-6 p-4"><dt className={lab}>{l}</dt><dd className="text-right text-primary">{String(d[k])}</dd></div> : null)}</dl>
      <div className="flex flex-wrap gap-space-sm"><button onClick={send} disabled={busy} className={`${btn} disabled:opacity-60`}>{busy ? 'Submitting…' : 'Submit application'}</button><Link to="/rental-application" className={btn2}>Edit details</Link></div>
    </Shell>
  )
}
