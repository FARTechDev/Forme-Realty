import { useState } from 'react'
import { db } from '../../lib/db'
import { Gate, Shell, SubNav, useApplication, btn, inp } from './flow'
import { toast } from '../../components/toast'

export default function Messages() {
  const app = useApplication(); const [text, setText] = useState(''); const [busy, setBusy] = useState(false)
  const send = async (e, a) => {
    e.preventDefault(); if (!text.trim()) return; setBusy(true)
    try { await db.sendApplicationMessage(a.ref, a.email, text.trim()); setText(''); await app.reload() } catch (err) { console.error(err); toast('Message not sent.', 'error') } finally { setBusy(false) }
  }
  return (
    <Gate app={app}>{(b) => (
      <Shell title="Messages" intro="Write to your advisor directly. We reply within one working day."><SubNav current="/rental-application/messages" />
        <div className="space-y-3">{b.messages.map((m) => <div key={m.id} className={`max-w-[85%] rounded-xl p-4 ${m.sender === 'applicant' ? 'ml-auto bg-primary text-on-primary' : 'bg-surface-container-low text-primary'}`}><p>{m.body}</p><div className="text-[11px] opacity-60 mt-1">{m.sender === 'applicant' ? 'You' : 'FORME advisor'} · {new Date(m.created_at).toLocaleString('en-GB')}</div></div>)}</div>
        <form onSubmit={(e) => send(e, b.application)} className="space-y-3"><textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="Write a message…" className={inp} /><button disabled={busy} className={`${btn} disabled:opacity-60`}>{busy ? 'Sending…' : 'Send message'}</button></form>
      </Shell>)}</Gate>
  )
}
