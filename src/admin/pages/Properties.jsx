import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../lib/db'
import { priceText, STATUS_LABEL } from '../../lib/propertyFilters'
import { toast } from '../../components/toast'
import { Badge, Button, Card, IconButton, PageHeader, Pagination, SearchInput, Select, StatusBadge, Table, Toggle, useAdminList, useConfirm } from '../ui'

const PAGE = 12
export default function Properties() {
  const nav = useNavigate(); const confirm = useConfirm()
  const [q, setQ] = useState(''); const [lt, setLt] = useState(''); const [st, setSt] = useState(''); const [pub, setPub] = useState(''); const [sort, setSort] = useState('created_at'); const [page, setPage] = useState(1)
  const [sel, setSel] = useState([])
  const { rows, loading, reload } = useAdminList('properties', { order: { col: sort, asc: sort === 'title' } , search: q ? { q, cols: ['title', 'city', 'region', 'neighborhood'] } : undefined }, [q, sort])
  const f = useMemo(() => rows.filter((r) => (!lt || r.listing_type === lt) && (!st || r.status === st) && (pub === '' || String(!!r.published) === pub)), [rows, lt, st, pub])
  const pageRows = f.slice((page - 1) * PAGE, page * PAGE)
  const flip = async (r, k) => { await db.update('properties', r.id, { [k]: !r[k] }); reload() }
  const del = async (ids) => {
    if (!(await confirm({ title: `Delete ${ids.length} propert${ids.length > 1 ? 'ies' : 'y'}?`, message: 'This cannot be undone.', confirmLabel: 'Delete' }))) return
    await Promise.all(ids.map((id) => db.remove('properties', id))); setSel([]); reload(); toast('Deleted'); window.dispatchEvent(new CustomEvent('admin:refresh-stats'))
  }
  const bulk = async (published) => { await Promise.all(sel.map((id) => db.update('properties', id, { published }))); setSel([]); reload(); toast(published ? 'Published' : 'Unpublished') }
  const dup = async (r) => {
    const { id, created_at, updated_at, views, ...rest } = r
    const c = await db.insert('properties', { ...rest, title: `${r.title} (copy)`, slug: `${r.slug}-copy-${Math.random().toString(36).slice(2, 6)}`, published: false, featured: false, views: 0 })
    toast('Duplicated as draft'); nav(`/admin/properties/${c.id}`)
  }
  const all = pageRows.length > 0 && pageRows.every((r) => sel.includes(r.id))
  return (
    <>
      <PageHeader title="Properties" subtitle={`${rows.length} listings · ${rows.filter((r) => r.published).length} published`} actions={<Button icon="add" onClick={() => nav('/admin/properties/new')}>Add property</Button>} />
      <Card padded={false}>
        <div className="p-4 border-b border-outline-variant/30 flex flex-wrap gap-3 items-center">
          <SearchInput value={q} onChange={(v) => { setQ(v); setPage(1) }} className="w-64" placeholder="Search title, city…" />
          <Select value={lt} onChange={(e) => { setLt(e.target.value); setPage(1) }} placeholder="Sale & rent" options={[{ value: 'sale', label: 'For sale' }, { value: 'rent', label: 'For rent' }]} className="w-36" />
          <Select value={st} onChange={(e) => { setSt(e.target.value); setPage(1) }} placeholder="Any status" options={Object.entries(STATUS_LABEL).map(([value, label]) => ({ value, label }))} className="w-40" />
          <Select value={pub} onChange={(e) => { setPub(e.target.value); setPage(1) }} placeholder="Published or draft" options={[{ value: 'true', label: 'Published' }, { value: 'false', label: 'Drafts' }]} className="w-44" />
          <Select value={sort} onChange={(e) => setSort(e.target.value)} options={[{ value: 'created_at', label: 'Newest' }, { value: 'views', label: 'Most viewed' }, { value: 'title', label: 'Title A–Z' }, { value: 'price', label: 'Price' }]} className="w-36" />
          {sel.length > 0 && <div className="flex items-center gap-2 ml-auto"><span className="text-[13px] text-on-surface-variant">{sel.length} selected</span><Button size="sm" variant="secondary" onClick={() => bulk(true)}>Publish</Button><Button size="sm" variant="secondary" onClick={() => bulk(false)}>Unpublish</Button><Button size="sm" variant="danger" onClick={() => del(sel)}>Delete</Button></div>}
        </div>
        <Table loading={loading} rows={pageRows} onRowClick={(r) => nav(`/admin/properties/${r.id}`)} empty="No properties match — add your first listing." columns={[
          { key: 'sel', label: <input type="checkbox" checked={all} onChange={() => setSel(all ? [] : [...new Set([...sel, ...pageRows.map((r) => r.id)])])} onClick={(e) => e.stopPropagation()} />, className: 'w-10', render: (r) => <input type="checkbox" checked={sel.includes(r.id)} onClick={(e) => e.stopPropagation()} onChange={() => setSel((s) => (s.includes(r.id) ? s.filter((x) => x !== r.id) : [...s, r.id]))} /> },
          { key: 'img', label: '', render: (r) => <img src={r.cover_image} alt="" className="w-16 h-11 object-cover rounded bg-surface-container" /> },
          { key: 'title', label: 'Property', render: (r) => <div className="max-w-xs"><div className="font-medium truncate">{r.title}</div><div className="text-[12px] text-on-surface-variant">{[r.city, r.region].filter(Boolean).join(', ')} · {r.bedrooms} bd · {r.bathrooms} ba</div></div> },
          { key: 'listing_type', label: 'Type', render: (r) => <Badge tone={r.listing_type === 'rent' ? 'blue' : 'sage'}>{r.listing_type === 'rent' ? 'Rent' : 'Sale'}</Badge> },
          { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
          { key: 'price', label: 'Price', render: (r) => <span className="whitespace-nowrap">{priceText(r)}</span> },
          { key: 'views', label: 'Views', render: (r) => <span className="tabular-nums">{r.views || 0}</span> },
          { key: 'feat', label: 'Featured', render: (r) => <span onClick={(e) => e.stopPropagation()}><Toggle checked={r.featured} onChange={() => flip(r, 'featured')} /></span> },
          { key: 'pub', label: 'Live', render: (r) => <span onClick={(e) => e.stopPropagation()}><Toggle checked={r.published} onChange={() => flip(r, 'published')} /></span> },
          { key: 'act', label: '', className: 'text-right whitespace-nowrap', render: (r) => <span onClick={(e) => e.stopPropagation()}><IconButton icon="content_copy" label="Duplicate" onClick={() => dup(r)} /><IconButton icon="delete" label="Delete" onClick={() => del([r.id])} /></span> },
        ]} />
        <Pagination page={page} pageSize={PAGE} total={f.length} onPage={setPage} />
      </Card>
    </>
  )
}
