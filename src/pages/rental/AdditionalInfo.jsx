import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../lib/db'
import { Gate, Shell, SubNav, useApplication, btn, inp, lab } from './flow'
import { toast } from '../../components/toast'

export default function AdditionalInfo() {
  const app = useApplication(); const nav = useNavigate(); const [busy, setBusy] = useState(false)
  const sub = async (e, b) => {
    e.preventDefault(); const f = new FormData(e.currentTarget); const open = b.requests.filter((r) => r.status === 'open'); setBusy(true)
    try { for (const r of open) { const v = (f.get(r.id) || '').toString().trim(); if (v) await db.respondApplicationInfo(b.application.ref, b.application.email, r.id, v) }
      nav('/rental-application/additional-information/confirmation') } catch (err) { console.error(err); toast('Could not send your response.', 'error'); setBusy(false) }
  }
  return (
    <Gate app={app}>{(b) => {
      const open = b.requests.filter((r) => r.status === 'open'); const done = b.requests.filter((r) => r.status !== 'open')
      return (
        <Shell title="Application clarifications" intro={open.length ? 'A few details will help us move your application forward.' : 'Nothing further is needed right now.'}><SubNav current="/rental-application/additional-information" />
          {open.length > 0 && <form onSubmit={(e) => sub(e, b)} className="space-y-space-lg">{open.map((r) => <div key={r.id} className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-2"><div className="font-headline-sm text-primary">{r.title}</div><p className="text-on-surface-variant font-light">{r.detail}</p>{r.due_date && <span className={lab}>Due {new Date(r.due_date).toLocaleDateString('en-GB', { dateStyle: 'medium' })}</span>}<textarea name={r.id} rows={3} className={inp} placeholder="Your response" /></div>)}<button disabled={busy} className={`${btn} disabled:opacity-60`}>{busy ? 'Sending…' : 'Send response'}</button></form>}
          {done.map((r) => <div key={r.id} className="bg-surface-container-low rounded-xl p-space-md"><div className="text-primary">{r.title} <span className={lab}>· provided</span></div><p className="text-on-surface-variant text-[14px]">{r.response}</p></div>)}
        </Shell>)
    }}</Gate>
  )
}
