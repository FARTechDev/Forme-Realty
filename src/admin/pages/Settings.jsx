import { useEffect, useState } from 'react'
import { db, IS_DEMO } from '../../lib/db'
import { resetDemo } from '../../lib/demo'
import { toast } from '../../components/toast'
import { Badge, Button, Card, Field, Input, PageHeader, useConfirm } from '../ui'

export default function Settings() {
  const confirm = useConfirm()
  const [contact, setContact] = useState({ email: '', phone: '', offices: [] }); const [brand, setBrand] = useState({ name: '', tagline: '' })
  const [pw, setPw] = useState({ a: '', b: '' })
  useEffect(() => { db.setting('contact', contact).then(setContact); db.setting('brand', brand).then(setBrand) /* eslint-disable-next-line */ }, [])
  const save = async () => { await db.upsert('site_settings', { key: 'contact', value: contact }, 'key'); await db.upsert('site_settings', { key: 'brand', value: brand }, 'key'); toast('Settings saved') }
  const changePw = async () => {
    if (pw.a.length < 8) return toast('Use at least 8 characters', 'error')
    if (pw.a !== pw.b) return toast('Passwords do not match', 'error')
    try { await db.auth.updatePassword(pw.a); setPw({ a: '', b: '' }); toast('Password updated') } catch (e) { toast(e.message, 'error') }
  }
  const setOffice = (i, k, v) => setContact((c) => ({ ...c, offices: c.offices.map((o, x) => (x === i ? { ...o, [k]: v } : o)) }))
  return (
    <>
      <PageHeader title="Settings" subtitle="Contact details, brand and account security." actions={<Button onClick={save}>Save settings</Button>} />
      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Contact">
          <div className="space-y-4">
            <Field label="Concierge email"><Input value={contact.email || ''} onChange={(e) => setContact({ ...contact, email: e.target.value })} /></Field>
            <Field label="Main phone"><Input value={contact.phone || ''} onChange={(e) => setContact({ ...contact, phone: e.target.value })} /></Field>
            {(contact.offices || []).map((o, i) => <div key={i} className="grid grid-cols-2 gap-3"><Field label={`Office ${i + 1}`}><Input value={o.city} onChange={(e) => setOffice(i, 'city', e.target.value)} /></Field><Field label="Phone"><Input value={o.phone} onChange={(e) => setOffice(i, 'phone', e.target.value)} /></Field></div>)}
          </div>
        </Card>
        <Card title="Brand">
          <div className="space-y-4"><Field label="Name"><Input value={brand.name || ''} onChange={(e) => setBrand({ ...brand, name: e.target.value })} /></Field><Field label="Tagline"><Input value={brand.tagline || ''} onChange={(e) => setBrand({ ...brand, tagline: e.target.value })} /></Field></div>
        </Card>
        <Card title="Change password">
          <div className="space-y-4"><Field label="New password"><Input type="password" value={pw.a} onChange={(e) => setPw({ ...pw, a: e.target.value })} /></Field><Field label="Confirm"><Input type="password" value={pw.b} onChange={(e) => setPw({ ...pw, b: e.target.value })} /></Field><Button variant="secondary" onClick={changePw}>Update password</Button></div>
        </Card>
        <Card title="Connection">
          <div className="space-y-3 text-[14px]">
            <div className="flex items-center gap-2">Backend: <Badge tone={IS_DEMO ? 'amber' : 'green'}>{IS_DEMO ? 'Demo (this browser)' : 'Supabase'}</Badge></div>
            <p className="text-on-surface-variant">{IS_DEMO ? 'Copy .env.example to .env and add your Supabase URL and anon key to store data in your database.' : 'Connected. Row-level security restricts this area to profiles with the admin or staff role.'}</p>
            {IS_DEMO && <Button variant="danger" onClick={async () => { if (await confirm({ title: 'Reset demo data?', message: 'All changes made in this browser will be replaced with the sample data.', confirmLabel: 'Reset' })) { resetDemo(); toast('Demo data reset'); setTimeout(() => location.reload(), 500) } }}>Reset demo data</Button>}
          </div>
        </Card>
      </div>
    </>
  )
}
