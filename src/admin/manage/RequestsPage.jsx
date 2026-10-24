import { useMemo, useState } from 'react'
import { db } from '../../lib/db'
import { toast } from '../../components/toast'
import { Button, Card, Drawer, Field, Input, PageHeader, SearchInput, Select, StatusBadge, Table, Tabs, Textarea, Pagination, Badge, fmtDateTime, titleCase, useAdminList, useConfirm } from '../ui'
import { downloadCsv } from './csv'

const PAGE = 15
/** Generic inbox: list + status tabs + detail drawer. cfg: {table,title,noun,statuses,columns,detail(row)->[[label,value]],searchCols,csvCols,notesKey,extra,reply(row)->mailto,actions(row,update)} */
export default function RequestsPage({ cfg }) {
  const confirm = useConfirm()
  const [tab, setTab] = useState('all'); const [q, setQ] = useState(''); const [page, setPage] = useState(1)
  const [type, setType] = useState('')
  const [sel, setSel] = useState(null); const [notes, setNotes] = useState(''); const [extra, setExtra] = useState({})
  const { rows: all, loading, reload } = useAdminList(cfg.table, { order: { col: cfg.orderBy || 'created_at', asc: !!cfg.orderAsc } })
  const { rows: props } = useAdminList('properties', { order: { col: 'title' } })
  const propName = useMemo(() => Object.fromEntries(props.map((p) => [p.id, p.title])), [props])

  const counts = useMemo(() => all.reduce((a, r) => ({ ...a, [r.status]: (a[r.status] || 0) + 1 }), {}), [all])
  const filtered = useMemo(() => all.filter((r) => (tab === 'all' || r.status === tab) && (!type || r.type === type) &&
    (!q || cfg.searchCols.some((c) => String(r[c] ?? '').toLowerCase().includes(q.toLowerCase())))), [all, tab, q, type, cfg.searchCols])
  const pageRows = filtered.slice((page - 1) * PAGE, page * PAGE)

  const open = (r) => { setSel(r); setNotes(r[cfg.notesKey || 'notes'] || ''); setExtra(Object.fromEntries((cfg.extra || []).map((f) => [f.key, r[f.key] ?? '']))) }
  const update = async (patch) => {
    const r = await db.update(cfg.table, sel.id, patch); setSel(r); reload(); window.dispatchEvent(new CustomEvent('admin:refresh-stats'))
  }
  const remove = async () => {
    if (!(await confirm({ title: `Delete ${cfg.noun}?`, message: `${sel.ref} will be permanently removed.`, confirmLabel: 'Delete' }))) return
    await db.remove(cfg.table, sel.id); setSel(null); reload(); toast(`${titleCase(cfg.noun)} deleted`)
  }
  const saveNotes = async () => { await update({ [cfg.notesKey || 'notes']: notes, ...extra }); toast('Saved') }
  const ctx = { propName, update, row: sel }

  return (
    <>
      <PageHeader title={cfg.title} subtitle={cfg.subtitle} actions={<Button variant="secondary" icon="download" onClick={() => downloadCsv(`${cfg.table}.csv`, filtered, cfg.csvCols)}>Export CSV</Button>} />
      <Tabs value={tab} onChange={(v) => { setTab(v); setPage(1) }} tabs={[{ value: 'all', label: 'All', count: all.length }, ...cfg.statuses.map((s) => ({ value: s, label: titleCase(s), count: counts[s] || 0 }))]} />
      <Card padded={false}>
        <div className="p-4 border-b border-outline-variant/30 flex flex-wrap gap-3">
          <SearchInput value={q} onChange={(v) => { setQ(v); setPage(1) }} className="w-72" />
          {cfg.types && <Select value={type} onChange={(e) => { setType(e.target.value); setPage(1) }} placeholder="All types" options={cfg.types} className="w-48" />}
        </div>
        <Table loading={loading} rows={pageRows} onRowClick={open} columns={cfg.columns(ctx)} empty={`No ${cfg.title.toLowerCase()} match.`} />
        <Pagination page={page} pageSize={PAGE} total={filtered.length} onPage={setPage} />
      </Card>

      <Drawer open={!!sel} onClose={() => setSel(null)} title={sel ? `${titleCase(cfg.noun)} ${sel.ref}` : ''} subtitle={sel ? fmtDateTime(sel.created_at) : ''} width="max-w-2xl"
        footer={sel && <><Button variant="ghost" icon="delete" onClick={remove}>Delete</Button>{cfg.reply && <Button variant="secondary" icon="reply" as="a" href={cfg.reply(sel)}>Reply by email</Button>}<Button onClick={saveNotes}>Save notes</Button></>}>
        {sel && (
          <div className="space-y-6">
            <div className="flex items-center gap-3"><StatusBadge status={sel.status} /><Select value={sel.status} onChange={(e) => update({ status: e.target.value })} options={cfg.statuses} className="max-w-[200px]" /></div>
            {cfg.actions?.(sel, update)}
            <dl className="divide-y divide-outline-variant/30 border-y border-outline-variant/30">
              {cfg.detail(sel, ctx).filter(([, v]) => v !== '' && v != null).map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-4 py-3"><dt className="font-label-caps text-[10.5px] uppercase tracking-[0.14em] text-outline pt-0.5">{k}</dt><dd className="col-span-2 text-[14px] whitespace-pre-wrap break-words">{v}</dd></div>
              ))}
            </dl>
            {(cfg.extra || []).map((f) => (
              <Field key={f.key} label={f.label}><Input value={extra[f.key]} type={f.type || 'text'} onChange={(e) => setExtra((x) => ({ ...x, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))} /></Field>
            ))}
            <Field label="Internal notes"><Textarea rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Only visible to the team…" /></Field>
          </div>
        )}
      </Drawer>
    </>
  )
}
export { Badge }
