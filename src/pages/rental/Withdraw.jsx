import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../lib/db'
import { Gate, Shell, useApplication, btn, btn2, inp } from './flow'
import { Link } from '../../components/Link'
import { toast } from '../../components/toast'

export default function Withdraw() {
  const app = useApplication(); const nav = useNavigate(); const [busy, setBusy] = useState(false)
  const go = async (e, a) => {
    e.preventDefault(); setBusy(true)
    try { await db.withdrawApplication(a.ref, a.email, new FormData(e.currentTarget).get('reason')); nav('/rental-application/withdraw/confirmation') } catch (err) { console.error(err); toast('Could not withdraw.', 'error'); setBusy(false) }
  }
  return (
    <Gate app={app}>{(b) => (
      <Shell title="Withdraw your application" intro={`This will close your application for ${b.property?.title || b.application.property_title}. You may apply again at any time.`}>
        <form onSubmit={(e) => go(e, b.application)} className="space-y-space-md"><textarea name="reason" rows={3} placeholder="Reason (optional)" className={inp} />
          <div className="flex flex-wrap gap-space-sm"><button disabled={busy} className={`${btn} disabled:opacity-60`}>{busy ? 'Withdrawing…' : 'Confirm withdrawal'}</button><Link to="/rental-application/status" className={btn2}>Keep my application</Link></div></form>
      </Shell>)}</Gate>
  )
}
