import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Card, PageHeader, Pagination, SearchInput, StatusBadge, Table, Tabs, fmtDate, titleCase, useAdminList } from '../ui'

const STATUSES = ['submitted', 'under_review', 'info_requested', 'approved', 'declined', 'withdrawn']
export default function Applications() {
  const nav = useNavigate()
  const [tab, setTab] = useState('all'); const [q, setQ] = useState(''); const [page, setPage] = useState(1)
  const { rows, loading } = useAdminList('rental_applications', { order: { col: 'created_at', asc: false } })
  const counts = useMemo(() => rows.reduce((a, r) => ({ ...a, [r.status]: (a[r.status] || 0) + 1 }), {}), [rows])
  const f = rows.filter((r) => (tab === 'all' || r.status === tab) && (!q || [r.applicant_name, r.email, r.ref, r.property_title].some((v) => String(v || '').toLowerCase().includes(q.toLowerCase()))))
  return (
    <>
      <PageHeader title="Rental applications" subtitle="Review applicants, request documents and information, and message them." />
      <Tabs value={tab} onChange={(v) => { setTab(v); setPage(1) }} tabs={[{ value: 'all', label: 'All', count: rows.length }, ...STATUSES.map((s) => ({ value: s, label: titleCase(s), count: counts[s] || 0 }))]} />
      <Card padded={false}>
        <div className="p-4 border-b border-outline-variant/30"><SearchInput value={q} onChange={(v) => { setQ(v); setPage(1) }} className="w-72" /></div>
        <Table loading={loading} rows={f.slice((page - 1) * 15, page * 15)} onRowClick={(r) => nav(`/admin/applications/${r.id}`)} columns={[
          { key: 'ref', label: 'Reference', render: (r) => <span className="font-medium">{r.ref}</span> },
          { key: 'applicant_name', label: 'Applicant', render: (r) => <div><div>{r.applicant_name}</div><div className="text-[12px] text-on-surface-variant">{r.email}</div></div> },
          { key: 'property_title', label: 'Property', render: (r) => <span className="block max-w-xs truncate">{r.property_title}</span> },
          { key: 'move_in_date', label: 'Move-in', render: (r) => fmtDate(r.move_in_date) },
          { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
          { key: 'submitted_at', label: 'Submitted', render: (r) => fmtDate(r.submitted_at || r.created_at) },
        ]} />
        <Pagination page={page} pageSize={15} total={f.length} onPage={setPage} />
      </Card>
    </>
  )
}
export { Badge }
