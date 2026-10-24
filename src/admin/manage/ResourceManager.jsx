import { useMemo, useState } from 'react'
import { db } from '../../lib/db'
import { slugify } from '../../lib/refs'
import { toast } from '../../components/toast'
import { Badge, Button, Drawer, Field, ImageUploader, Input, PageHeader, Card, Select, SearchInput, Table, Textarea, Toggle, IconButton, useAdminList, useConfirm, fmtDate } from '../ui'

/** Schema-driven CRUD page. fields: [{key,label,type:'text|textarea|number|select|toggle|image|date',options,required,hint}] */
export default function ResourceManager({ table, title, subtitle, noun, columns, fields, defaults = {}, order = { col: 'sort', asc: true }, searchCols = ['title', 'name'], slugFrom, sortable }) {
  const confirm = useConfirm()
  const [q, setQ] = useState('')
  const [edit, setEdit] = useState(null)
  const [saving, setSaving] = useState(false)
  const { rows, loading, reload } = useAdminList(table, { order, search: q ? { q, cols: searchCols } : undefined }, [q])

  const open = (row) => setEdit(row ? { ...row } : { ...defaults, ...(sortable ? { sort: rows.length + 1 } : {}) })
  const set = (k, v) => setEdit((e) => ({ ...e, [k]: v, ...(slugFrom && k === slugFrom && !e._slugTouched && !e.id ? { slug: slugify(v) } : {}) }))

  const save = async () => {
    for (const f of fields) if (f.required && !String(edit[f.key] ?? '').trim()) return toast(`${f.label} is required`, 'error')
    setSaving(true)
    try {
      const { _slugTouched, ...row } = edit
      if (slugFrom && !row.slug) row.slug = slugify(row[slugFrom])
      row.id ? await db.update(table, row.id, row) : await db.insert(table, row)
      toast(`${noun} saved`); setEdit(null); reload()
    } catch (e) { toast(e.message || 'Could not save', 'error') } finally { setSaving(false) }
  }
  const remove = async (r) => {
    if (!(await confirm({ title: `Delete ${noun}?`, message: `“${r[fields[0].key]}” will be permanently removed.`, confirmLabel: 'Delete' }))) return
    await db.remove(table, r.id); toast(`${noun} deleted`); reload()
  }
  const toggle = async (r, key) => { await db.update(table, r.id, { [key]: !r[key] }); reload() }
  const move = async (r, d) => {
    const i = rows.findIndex((x) => x.id === r.id); const o = rows[i + d]; if (!o) return
    await Promise.all([db.update(table, r.id, { sort: o.sort ?? i + d + 1 }), db.update(table, o.id, { sort: r.sort ?? i + 1 })]); reload()
  }

  const cols = useMemo(() => [
    ...columns,
    ...(sortable ? [{ key: '_order', label: 'Order', render: (r) => <div className="flex"><IconButton icon="arrow_upward" label="Up" onClick={(e) => { e.stopPropagation(); move(r, -1) }} /><IconButton icon="arrow_downward" label="Down" onClick={(e) => { e.stopPropagation(); move(r, 1) }} /></div> }] : []),
    { key: '_pub', label: 'Published', render: (r) => <Toggle checked={r.published} onChange={() => toggle(r, 'published')} /> },
    { key: '_act', label: '', className: 'text-right', render: (r) => <div className="flex justify-end"><IconButton icon="edit" label="Edit" onClick={(e) => { e.stopPropagation(); open(r) }} /><IconButton icon="delete" label="Delete" onClick={(e) => { e.stopPropagation(); remove(r) }} /></div> },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [columns, rows])

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} actions={<Button icon="add" onClick={() => open()}>New {noun}</Button>} />
      <Card padded={false}>
        <div className="p-4 border-b border-outline-variant/30"><SearchInput value={q} onChange={setQ} placeholder={`Search ${title.toLowerCase()}…`} className="max-w-sm" /></div>
        <Table columns={cols} rows={rows} loading={loading} onRowClick={open} empty={`No ${title.toLowerCase()} yet — create the first one.`} />
      </Card>
      <Drawer open={!!edit} onClose={() => setEdit(null)} title={edit?.id ? `Edit ${noun}` : `New ${noun}`} width="max-w-2xl"
        footer={<><Button variant="ghost" onClick={() => setEdit(null)}>Cancel</Button><Button loading={saving} onClick={save}>Save {noun}</Button></>}>
        {edit && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((f) => {
              const v = edit[f.key] ?? ''
              const full = ['textarea', 'image'].includes(f.type) || f.full
              return (
                <Field key={f.key} label={f.label} hint={f.hint} required={f.required} className={full ? 'sm:col-span-2' : ''}>
                  {f.type === 'textarea' ? <Textarea rows={f.rows || 5} value={v} onChange={(e) => set(f.key, e.target.value)} />
                    : f.type === 'select' ? <Select options={f.options} value={v} onChange={(e) => set(f.key, e.target.value)} />
                    : f.type === 'toggle' ? <div className="pt-1"><Toggle checked={!!edit[f.key]} onChange={(x) => set(f.key, x)} /></div>
                    : f.type === 'image' ? <ImageUploader value={v} onChange={(x) => set(f.key, x)} bucket="property-images" label="Upload image" />
                    : f.type === 'number' ? <Input type="number" value={v} onChange={(e) => set(f.key, e.target.value === '' ? null : Number(e.target.value))} />
                    : f.type === 'datetime' ? <Input type="date" value={v ? String(v).slice(0, 10) : ''} onChange={(e) => set(f.key, e.target.value ? new Date(e.target.value).toISOString() : null)} />
                    : <Input value={v} onChange={(e) => { if (f.key === 'slug') setEdit((s) => ({ ...s, slug: slugify(e.target.value), _slugTouched: true })); else set(f.key, e.target.value) }} />}
                </Field>
              )
            })}
          </div>
        )}
      </Drawer>
    </>
  )
}
export { Badge, fmtDate }
