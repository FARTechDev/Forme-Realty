import { useMemo, useState } from 'react'
import { db } from '../../lib/db'
import { toast } from '../../components/toast'
import { Badge, Button, Card, IconButton, Input, PageHeader, SearchInput, Table, fmtDate, useAdminList, useConfirm } from '../ui'
import { downloadCsv } from '../manage/csv'

export default function Subscribers() {
  const confirm = useConfirm()
  const [q, setQ] = useState(''); const [email, setEmail] = useState('')
  const { rows, loading, reload } = useAdminList('subscribers', { order: { col: 'created_at', asc: false }, search: q ? { q, cols: ['email', 'source'] } : undefined }, [q])
  const bySource = useMemo(() => rows.reduce((a, r) => ({ ...a, [r.source]: (a[r.source] || 0) + 1 }), {}), [rows])
  const add = async (e) => { e.preventDefault(); try { await db.subscribe(email, 'admin'); setEmail(''); toast('Subscriber added'); reload() } catch (x) { toast(x.message, 'error') } }
  const del = async (r) => { if (await confirm({ title: 'Remove subscriber?', message: r.email, confirmLabel: 'Remove' })) { await db.remove('subscribers', r.id); reload() } }
  return (
    <>
      <PageHeader title="Subscribers" subtitle={`${rows.length} people receive private listing updates.`} actions={<Button variant="secondary" icon="download" onClick={() => downloadCsv('subscribers.csv', rows, ['email', 'source', 'created_at'])}>Export CSV</Button>} />
      <div className="flex flex-wrap gap-2 mb-5">{Object.entries(bySource).map(([k, v]) => <Badge key={k} tone="sage">{k}: {v}</Badge>)}</div>
      <Card padded={false}>
        <div className="p-4 border-b border-outline-variant/30 flex flex-wrap gap-3 justify-between">
          <SearchInput value={q} onChange={setQ} className="w-72" />
          <form onSubmit={add} className="flex gap-2"><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Add email address" className="w-64" /><Button type="submit" icon="add">Add</Button></form>
        </div>
        <Table loading={loading} rows={rows} columns={[{ key: 'email', label: 'Email' }, { key: 'source', label: 'Source', render: (r) => <Badge>{r.source}</Badge> }, { key: 'created_at', label: 'Joined', render: (r) => fmtDate(r.created_at) }, { key: 'x', label: '', className: 'text-right', render: (r) => <IconButton icon="delete" label="Remove" onClick={() => del(r)} /> }]} />
      </Card>
    </>
  )
}
