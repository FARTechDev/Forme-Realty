import { useRef, useState } from 'react'
import { db } from '../../lib/db'
import { Gate, Shell, SubNav, useApplication, btn2, inp, lab } from './flow'
import { toast } from '../../components/toast'

const TYPES = [['identity', 'Photo identification'], ['income', 'Proof of income'], ['reference', 'Reference letter'], ['other', 'Other']]
const BUCKET = 'application-documents'

export default function Documents() {
  const app = useApplication(); const [busy, setBusy] = useState(false); const [type, setType] = useState('identity'); const ref = useRef()
  const up = async (file, b, requestId) => {
    if (!file) return
    if (file.size > 10 * 1024 * 1024) return toast('Files must be under 10 MB.', 'error')
    setBusy(true)
    try {
      const a = b.application
      const { path, url } = await db.storage.upload(BUCKET, file, `${a.ref}/`)
      await db.addApplicationDocument(a.ref, a.email, { name: file.name, doc_type: type, file_path: path, file_url: url, request_doc_id: requestId })
      toast('Document uploaded'); await app.reload()
    } catch (e) { console.error(e); toast('Upload failed. Please try again.', 'error') } finally { setBusy(false); if (ref.current) ref.current.value = '' }
  }
  return (
    <Gate app={app}>{(b) => (
      <Shell title="Your documents" intro="Upload PDFs or images up to 10 MB each. Files are visible only to you and your advisor."><SubNav current="/rental-application/documents" />
        <ul className="bg-surface-container-lowest rounded-xl shadow-sm divide-y divide-outline-variant/50">
          {b.documents.length === 0 && <li className="p-4 text-on-surface-variant">No documents yet.</li>}
          {b.documents.map((d) => (
            <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div><div className="text-primary">{d.name}</div><div className={lab}>{d.doc_type} · {d.status}</div></div>
              {d.status === 'requested' && <label className={`${btn2} cursor-pointer`}>Upload<input type="file" hidden accept=".pdf,image/*" disabled={busy} onChange={(e) => up(e.target.files[0], b, d.id)} /></label>}
            </li>))}
        </ul>
        <div className="bg-surface-container-low rounded-xl p-space-md space-y-3"><span className={lab}>Add another document</span>
          <div className="flex flex-wrap gap-3 items-center"><select value={type} onChange={(e) => setType(e.target.value)} className={`${inp} !w-auto`}>{TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
            <label className={`${btn2} cursor-pointer ${busy ? 'opacity-60' : ''}`}>{busy ? 'Uploading…' : 'Choose file'}<input ref={ref} type="file" hidden accept=".pdf,image/*" disabled={busy} onChange={(e) => up(e.target.files[0], b)} /></label></div></div>
      </Shell>)}</Gate>
  )
}
