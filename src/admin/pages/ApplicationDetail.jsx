import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { db } from '../../lib/db'
import { toast } from '../../components/toast'
import { Button, Card, Field, Input, PageHeader, Select, StatusBadge, Textarea, Badge, Spinner, fmtDate, fmtDateTime, titleCase, useConfirm } from '../ui'

const FLOW = ['submitted', 'under_review', 'info_requested', 'approved', 'declined']
export default function ApplicationDetail() {
  const { id } = useParams(); const nav = useNavigate(); const confirm = useConfirm()
  const [app, setApp] = useState(null); const [msgs, setMsgs] = useState([]); const [docs, setDocs] = useState([]); const [reqs, setReqs] = useState([])
  const [body, setBody] = useState(''); const [notes, setNotes] = useState(''); const [docName, setDocName] = useState('')
  const [rq, setRq] = useState({ title: '', detail: '', due_date: '' }); const [fileUrls, setFileUrls] = useState({})

  const load = async () => {
    const a = await db.get('rental_applications', { id }); if (!a) return setApp(false)
    setApp(a); setNotes(a.payload?.admin_notes || '')
    const [m, d, r] = await Promise.all(['application_messages', 'application_documents', 'information_requests'].map((t) => db.list(t, { eq: { application_id: id }, order: { col: 'created_at', asc: true } })))
    setMsgs(m.data); setDocs(d.data); setReqs(r.data)
    const urls = {}
    for (const x of d.data) if (x.file_url || x.file_path) urls[x.id] = x.file_url || await db.storage.signedUrl('application-documents', x.file_path).catch(() => '')
    setFileUrls(urls)
  }
  useEffect(() => { load() /* eslint-disable-next-line */ }, [id])
  if (app === null) return <div className="py-20 text-center"><Spinner size={26} /></div>
  if (app === false) return <p>Application not found. <Link to="/admin/applications" className="underline">Back</Link></p>

  const setStatus = async (status) => { setApp(await db.update('rental_applications', id, { status })); toast('Status updated'); window.dispatchEvent(new CustomEvent('admin:refresh-stats')) }
  const send = async () => { if (!body.trim()) return; await db.insert('application_messages', { application_id: id, sender: 'advisor', body: body.trim(), created_at: new Date().toISOString() }); setBody(''); load() }
  const reqDoc = async () => { if (!docName.trim()) return; await db.insert('application_documents', { application_id: id, name: docName.trim(), doc_type: 'other', file_path: '', file_url: '', status: 'requested', created_at: new Date().toISOString() }); setDocName(''); load(); toast('Document requested') }
  const setDoc = async (d, status) => { await db.update('application_documents', d.id, { status }); load() }
  const addReq = async () => { if (!rq.title.trim()) return; await db.insert('information_requests', { application_id: id, ...rq, due_date: rq.due_date || null, status: 'open', response: '', created_at: new Date().toISOString() }); setRq({ title: '', detail: '', due_date: '' }); if (app.status !== 'info_requested') await db.update('rental_applications', id, { status: 'info_requested' }); load(); toast('Information requested') }
  const saveNotes = async () => { await db.update('rental_applications', id, { payload: { ...(app.payload || {}), admin_notes: notes } }); toast('Notes saved') }
  const del = async () => { if (await confirm({ title: 'Delete application?', message: `${app.ref} and its messages will be removed.`, confirmLabel: 'Delete' })) { await db.remove('rental_applications', id); nav('/admin/applications') } }
  const locked = app.status === 'withdrawn'
  const D = ([k, v]) => v ? <div key={k} className="flex justify-between gap-4 py-2.5 border-b border-outline-variant/20 last:border-0 text-[14px]"><span className="text-on-surface-variant">{k}</span><span className="text-right">{v}</span></div> : null

  return (
    <>
      <PageHeader title={app.applicant_name} subtitle={`${app.ref} · ${app.property_title}`} back={<Link to="/admin/applications" className="text-[12px] uppercase tracking-[0.14em] text-on-surface-variant hover:text-primary">← Applications</Link>}
        actions={<><StatusBadge status={app.status} /><Button variant="ghost" icon="delete" onClick={del}>Delete</Button></>} />
      {!locked && (
        <div className="flex flex-wrap gap-2 mb-6">
          {FLOW.map((s) => <Button key={s} size="sm" variant={app.status === s ? 'primary' : 'secondary'} onClick={() => setStatus(s)}>{titleCase(s)}</Button>)}
        </div>
      )}
      {locked && <p className="mb-6 text-[14px] text-on-surface-variant">Withdrawn by the applicant{app.withdrawn_reason ? `: “${app.withdrawn_reason}”` : ''}. This application is read-only.</p>}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-6 lg:col-span-1">
          <Card title="Applicant">
            {[['Email', app.email], ['Phone', app.phone], ['Preferred contact', titleCase(app.preferred_contact || '')], ['Employment', app.employment_status], ['Employer', app.employer]].map(D)}
          </Card>
          <Card title="Tenancy">
            {[['Move-in', fmtDate(app.move_in_date)], ['Term', app.tenancy_term], ['Occupants', app.occupants], ['Submitted', fmtDateTime(app.submitted_at)], ['Notes', app.special_notes], ['References', app.references_text]].map(D)}
          </Card>
          <Card title="Internal notes" actions={<Button size="sm" variant="secondary" onClick={saveNotes}>Save</Button>}><Textarea rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Only visible to the team…" /></Card>
        </div>
        <div className="space-y-6 lg:col-span-2">
          <Card title="Messages" subtitle="Visible to the applicant in their Messages centre">
            <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
              {msgs.length === 0 && <p className="text-[14px] text-on-surface-variant">No messages yet.</p>}
              {msgs.map((m) => <div key={m.id} className={`max-w-[85%] rounded-lg px-4 py-2.5 text-[14px] ${m.sender === 'advisor' ? 'bg-primary-container text-on-primary ml-auto' : 'bg-surface-container'}`}>{m.body}<div className="text-[11px] opacity-60 mt-1">{m.sender === 'advisor' ? 'Advisor' : app.applicant_name} · {fmtDateTime(m.created_at)}</div></div>)}
            </div>
            {!locked && <div className="flex gap-2"><Textarea rows={2} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write a reply…" /><Button onClick={send} icon="send">Send</Button></div>}
          </Card>
          <Card title="Documents">
            <ul className="divide-y divide-outline-variant/20 mb-4">
              {docs.length === 0 && <li className="py-3 text-[14px] text-on-surface-variant">No documents requested or uploaded.</li>}
              {docs.map((d) => (
                <li key={d.id} className="py-3 flex items-center gap-3 flex-wrap">
                  <span className="material-symbols-outlined text-outline">description</span>
                  <div className="flex-1 min-w-[160px]"><div className="text-[14px]">{d.name}</div><div className="text-[12px] text-on-surface-variant">{titleCase(d.doc_type)}</div></div>
                  <StatusBadge status={d.status} />
                  {fileUrls[d.id] && <Button size="sm" variant="secondary" as="a" href={fileUrls[d.id]} target="_blank" rel="noreferrer" icon="open_in_new">Open</Button>}
                  {d.status === 'uploaded' && !locked && <><Button size="sm" onClick={() => setDoc(d, 'verified')}>Verify</Button><Button size="sm" variant="secondary" onClick={() => setDoc(d, 'rejected')}>Reject</Button></>}
                </li>
              ))}
            </ul>
            {!locked && <div className="flex gap-2"><Input value={docName} onChange={(e) => setDocName(e.target.value)} placeholder="Request a document, e.g. Proof of address" /><Button variant="secondary" onClick={reqDoc}>Request</Button></div>}
          </Card>
          <Card title="Information requests">
            <ul className="divide-y divide-outline-variant/20 mb-4">
              {reqs.length === 0 && <li className="py-3 text-[14px] text-on-surface-variant">None.</li>}
              {reqs.map((r) => <li key={r.id} className="py-3"><div className="flex items-center gap-2"><span className="font-medium text-[14px]">{r.title}</span><StatusBadge status={r.status} />{r.due_date && <span className="text-[12px] text-on-surface-variant">due {fmtDate(r.due_date)}</span>}</div><p className="text-[13px] text-on-surface-variant mt-1">{r.detail}</p>{r.response && <p className="text-[14px] mt-2 bg-secondary-container/40 rounded px-3 py-2"><strong>Response:</strong> {r.response}</p>}</li>)}
            </ul>
            {!locked && (
              <div className="grid sm:grid-cols-3 gap-3 items-end">
                <Field label="Title"><Input value={rq.title} onChange={(e) => setRq({ ...rq, title: e.target.value })} /></Field>
                <Field label="Due"><Input type="date" value={rq.due_date} onChange={(e) => setRq({ ...rq, due_date: e.target.value })} /></Field>
                <Button variant="secondary" onClick={addReq}>Request info</Button>
                <Field label="Detail" className="sm:col-span-3"><Textarea rows={2} value={rq.detail} onChange={(e) => setRq({ ...rq, detail: e.target.value })} /></Field>
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  )
}
export { Badge, Select }
