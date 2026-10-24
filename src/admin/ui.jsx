// Shared admin UI primitives. Visual language = the public site (Ivory / Graphite / Sage, Manrope, hairlines).
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { db } from '../lib/db'
import { toast } from '../components/toast'

export const cx = (...a) => a.filter(Boolean).join(' ')

/* ---------- formatting ---------- */
export const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—')
export const fmtDateTime = (d) => (d ? new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—')
export function timeAgo(d) {
  if (!d) return ''
  const s = Math.max(1, Math.round((Date.now() - new Date(d).getTime()) / 1000))
  if (s < 60) return 'just now'
  const m = Math.round(s / 60); if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60); if (h < 24) return `${h}h ago`
  const dd = Math.round(h / 24); if (dd < 30) return `${dd}d ago`
  return fmtDate(d)
}
export const titleCase = (s = '') => s.replace(/[_-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

/* ---------- Buttons ---------- */
const BTN = {
  primary: 'bg-primary-container text-on-primary hover:bg-secondary',
  secondary: 'bg-surface-container-lowest text-primary ring-1 ring-outline-variant/60 hover:ring-primary',
  ghost: 'text-on-surface-variant hover:text-primary hover:bg-surface-container',
  danger: 'bg-error text-on-error hover:opacity-90',
  subtle: 'bg-surface-container text-primary hover:bg-surface-container-high',
}
export function Button({ variant = 'primary', size = 'md', icon, loading, className, children, as: As = 'button', ...rest }) {
  const sz = size === 'sm' ? 'px-3 py-1.5 text-[12px]' : size === 'lg' ? 'px-6 py-3 text-[13px]' : 'px-4 py-2 text-[13px]'
  return (
    <As {...(As === 'button' ? { type: rest.type || 'button' } : {})} {...rest} disabled={rest.disabled || loading}
      className={cx('inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap', sz, BTN[variant], className)}>
      {loading ? <Spinner size={14} /> : icon ? <span className="material-symbols-outlined text-[18px]">{icon}</span> : null}
      {children}
    </As>
  )
}
export function IconButton({ icon, label, className, ...rest }) {
  return (
    <button type="button" aria-label={label} title={label} {...rest} className={cx('inline-flex items-center justify-center w-8 h-8 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors', className)}>
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
    </button>
  )
}
export function Spinner({ size = 18 }) {
  return <span className="inline-block rounded-full border-2 border-current border-t-transparent animate-spin" style={{ width: size, height: size }} />
}

/* ---------- Layout bits ---------- */
export function PageHeader({ title, subtitle, actions, back }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        {back}
        <h1 className="font-headline-lg text-headline-lg font-light tracking-tight text-on-surface">{title}</h1>
        {subtitle && <p className="font-body-md text-body-md text-on-surface-variant mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
export function Card({ title, subtitle, actions, children, className, padded = true }) {
  return (
    <section className={cx('bg-surface-container-lowest rounded-lg ring-1 ring-outline-variant/30', className)}>
      {(title || actions) && (
        <header className="flex items-center justify-between gap-3 px-5 py-4 border-b border-outline-variant/30">
          <div>
            <h2 className="font-headline-sm text-[16px] font-medium text-on-surface">{title}</h2>
            {subtitle && <p className="text-[12px] text-on-surface-variant mt-0.5">{subtitle}</p>}
          </div>
          {actions}
        </header>
      )}
      <div className={padded ? 'p-5' : ''}>{children}</div>
    </section>
  )
}
export function StatCard({ label, value, hint, icon, to }) {
  const inner = (
    <div className="bg-surface-container-lowest rounded-lg ring-1 ring-outline-variant/30 p-5 h-full hover:ring-primary/40 transition-all">
      <div className="flex items-center justify-between">
        <span className="font-label-caps text-label-caps uppercase tracking-[0.14em] text-outline">{label}</span>
        {icon && <span className="material-symbols-outlined text-[20px] text-secondary">{icon}</span>}
      </div>
      <div className="font-display-lg text-[40px] leading-none font-light text-on-surface mt-4 tabular-nums">{value ?? '—'}</div>
      {hint && <div className="text-[12px] text-on-surface-variant mt-2">{hint}</div>}
    </div>
  )
  return to ? <a href={to} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('admin:navigate', { detail: to })) }}>{inner}</a> : inner
}

/* ---------- Badges ---------- */
const TONES = {
  neutral: 'bg-surface-container text-on-surface-variant', sage: 'bg-secondary-container text-on-secondary-container', dark: 'bg-primary-container text-on-primary',
  amber: 'bg-[#f5e9cf] text-[#6b4e12]', red: 'bg-error-container text-on-error-container', blue: 'bg-[#dce6f2] text-[#1f3d5c]', green: 'bg-[#d9ead9] text-[#1f4a28]',
}
export function Badge({ tone = 'neutral', children, className }) {
  return <span className={cx('inline-flex items-center h-6 px-2.5 rounded-full font-label-caps text-[10px] uppercase tracking-[0.1em] whitespace-nowrap', TONES[tone], className)}>{children}</span>
}
const STATUS_TONE = {
  new: 'amber', pending: 'amber', draft: 'neutral', submitted: 'amber', in_progress: 'blue', under_review: 'blue', scheduled: 'blue', info_requested: 'amber',
  replied: 'sage', confirmed: 'green', approved: 'green', completed: 'green', available: 'green', published: 'green', verified: 'green', provided: 'green', uploaded: 'blue',
  closed: 'neutral', cancelled: 'red', declined: 'red', withdrawn: 'neutral', rescheduled: 'blue', under_contract: 'amber', sold: 'dark', let: 'dark', coming_soon: 'blue', requested: 'amber', rejected: 'red', open: 'amber',
}
export const StatusBadge = ({ status }) => <Badge tone={STATUS_TONE[status] || 'neutral'}>{titleCase(status || '')}</Badge>

/* ---------- Form controls ---------- */
const inputCls = 'w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-2 text-[14px] text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/60 transition-colors disabled:opacity-60'
export const Input = ({ className, ...p }) => <input {...p} className={cx(inputCls, className)} />
export const Textarea = ({ className, rows = 4, ...p }) => <textarea rows={rows} {...p} className={cx(inputCls, 'resize-y', className)} />
export function Select({ options = [], className, placeholder, ...p }) {
  return (
    <select {...p} className={cx(inputCls, 'pr-8', className)}>
      {placeholder != null && <option value="">{placeholder}</option>}
      {options.map((o) => { const v = typeof o === 'object' ? o.value : o; const l = typeof o === 'object' ? o.label : titleCase(String(o)); return <option key={v} value={v}>{l}</option> })}
    </select>
  )
}
export function Field({ label, hint, error, required, children, className }) {
  return (
    <label className={cx('block', className)}>
      {label && <span className="block font-label-caps text-[10.5px] uppercase tracking-[0.14em] text-outline mb-1.5">{label}{required && <span className="text-error"> *</span>}</span>}
      {children}
      {hint && !error && <span className="block text-[12px] text-on-surface-variant mt-1">{hint}</span>}
      {error && <span className="block text-[12px] text-error mt-1">{error}</span>}
    </label>
  )
}
export function Toggle({ checked, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={!!checked} onClick={() => onChange(!checked)} className="inline-flex items-center gap-3 group">
      <span className={cx('relative w-10 h-6 rounded-full transition-colors', checked ? 'bg-secondary' : 'bg-outline-variant')}>
        <span className={cx('absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform', checked && 'translate-x-4')} />
      </span>
      {label && <span className="text-[14px] text-on-surface">{label}</span>}
    </button>
  )
}
export function SearchInput({ value, onChange, placeholder = 'Search…', className }) {
  return (
    <div className={cx('relative', className)}>
      <span className="material-symbols-outlined text-[18px] text-outline absolute left-3 top-1/2 -translate-y-1/2">search</span>
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="pl-9" />
    </div>
  )
}
export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-outline-variant/40 mb-5">
      {tabs.map((t) => {
        const v = typeof t === 'object' ? t.value : t; const l = typeof t === 'object' ? t.label : titleCase(t)
        return (
          <button key={v} type="button" onClick={() => onChange(v)} className={cx('px-4 py-2.5 text-[13px] font-medium -mb-px border-b-2 transition-colors', value === v ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary')}>
            {l}{typeof t === 'object' && t.count != null && <span className="ml-2 text-[11px] text-outline">{t.count}</span>}
          </button>
        )
      })}
    </div>
  )
}

/* ---------- Table ---------- */
export function Table({ columns, rows = [], onRowClick, empty = 'Nothing to show yet.', loading, rowKey = 'id' }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-outline-variant/40">
            {columns.map((c) => <th key={c.key} className={cx('px-4 py-3 font-label-caps text-[10.5px] uppercase tracking-[0.14em] text-outline font-semibold whitespace-nowrap', c.className)}>{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {loading && <tr><td colSpan={columns.length} className="px-4 py-10 text-center text-on-surface-variant"><Spinner /></td></tr>}
          {!loading && rows.length === 0 && <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-on-surface-variant text-[14px]">{empty}</td></tr>}
          {!loading && rows.map((r) => (
            <tr key={r[rowKey]} onClick={onRowClick ? () => onRowClick(r) : undefined} className={cx('border-b border-outline-variant/20 last:border-0 transition-colors', onRowClick && 'cursor-pointer hover:bg-surface-container-low')}>
              {columns.map((c) => <td key={c.key} className={cx('px-4 py-3 text-[14px] text-on-surface align-middle', c.className)}>{c.render ? c.render(r) : r[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export function Pagination({ page, pageSize, total, onPage }) {
  const pages = Math.max(1, Math.ceil(total / pageSize))
  if (pages <= 1) return null
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-outline-variant/30 text-[13px] text-on-surface-variant">
      <span>Showing {(page - 1) * pageSize + 1}–{Math.min(total, page * pageSize)} of {total}</span>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => onPage(page - 1)} icon="chevron_left">Prev</Button>
        <span className="px-2 tabular-nums">{page} / {pages}</span>
        <Button variant="ghost" size="sm" disabled={page >= pages} onClick={() => onPage(page + 1)}>Next<span className="material-symbols-outlined text-[18px]">chevron_right</span></Button>
      </div>
    </div>
  )
}
export const EmptyState = ({ icon = 'inbox', title, children }) => (
  <div className="text-center py-14 px-6">
    <span className="material-symbols-outlined text-[40px] text-outline-variant">{icon}</span>
    <div className="font-headline-sm text-[16px] text-on-surface mt-3">{title}</div>
    {children && <div className="text-[14px] text-on-surface-variant mt-1">{children}</div>}
  </div>
)

/* ---------- Overlays ---------- */
function useEscape(open, onClose) {
  useEffect(() => {
    if (!open) return undefined
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [open, onClose])
}
export function Modal({ open, onClose, title, children, footer, wide }) {
  useEscape(open, onClose)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#151715]/55 backdrop-blur-[2px] admin-fade" onClick={onClose} />
      <div className={cx('relative bg-surface-container-lowest rounded-lg shadow-[0_24px_48px_-12px_rgba(34,37,34,0.25)] w-full max-h-[90vh] flex flex-col admin-pop', wide ? 'max-w-3xl' : 'max-w-lg')} role="dialog" aria-modal="true">
        <header className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30">
          <h3 className="font-headline-sm text-[18px] font-medium">{title}</h3>
          <IconButton icon="close" label="Close" onClick={onClose} />
        </header>
        <div className="p-6 overflow-y-auto">{children}</div>
        {footer && <footer className="px-6 py-4 border-t border-outline-variant/30 flex justify-end gap-2">{footer}</footer>}
      </div>
    </div>
  )
}
export function Drawer({ open, onClose, title, subtitle, children, footer, width = 'max-w-xl' }) {
  useEscape(open, onClose)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[200]">
      <div className="absolute inset-0 bg-[#151715]/45 admin-fade" onClick={onClose} />
      <aside className={cx('absolute right-0 top-0 h-full w-full bg-surface-container-lowest shadow-2xl flex flex-col admin-slide', width)} role="dialog" aria-modal="true">
        <header className="flex items-start justify-between px-6 py-5 border-b border-outline-variant/30">
          <div><h3 className="font-headline-sm text-[18px] font-medium">{title}</h3>{subtitle && <p className="text-[12px] text-on-surface-variant mt-0.5">{subtitle}</p>}</div>
          <IconButton icon="close" label="Close" onClick={onClose} />
        </header>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
        {footer && <footer className="px-6 py-4 border-t border-outline-variant/30 flex justify-end gap-2">{footer}</footer>}
      </aside>
    </div>
  )
}

/* ---------- Confirm dialog:  const confirm = useConfirm(); if (await confirm({title, message})) … ---------- */
const ConfirmCtx = createContext(() => Promise.resolve(true))
export const useConfirm = () => useContext(ConfirmCtx)
export function ConfirmProvider({ children }) {
  const [st, setSt] = useState(null)
  const confirm = useCallback((opts) => new Promise((resolve) => setSt({ ...opts, resolve })), [])
  const close = (v) => { st?.resolve(v); setSt(null) }
  return (
    <ConfirmCtx.Provider value={confirm}>
      {children}
      <Modal open={!!st} onClose={() => close(false)} title={st?.title || 'Are you sure?'}
        footer={<><Button variant="ghost" onClick={() => close(false)}>Cancel</Button><Button variant={st?.danger === false ? 'primary' : 'danger'} onClick={() => close(true)}>{st?.confirmLabel || 'Confirm'}</Button></>}>
        <p className="text-[14px] text-on-surface-variant">{st?.message}</p>
      </Modal>
    </ConfirmCtx.Provider>
  )
}

/* ---------- Image / file uploader ---------- */
/** value: string (single) or string[] (multiple). Uploads through db.storage (Supabase Storage or local demo store). */
export function ImageUploader({ value, onChange, multiple = false, bucket = 'property-images', label = 'Upload images', accept = 'image/*' }) {
  const input = useRef(null)
  const [busy, setBusy] = useState(false)
  const [url, setUrl] = useState('')
  const list = useMemo(() => (multiple ? (value || []) : value ? [value] : []), [value, multiple])
  const emit = (arr) => onChange(multiple ? arr : arr[0] || '')

  const upload = async (files) => {
    setBusy(true)
    try {
      const out = []
      for (const f of Array.from(files)) out.push((await db.storage.upload(bucket, f, 'admin/')).url)
      emit(multiple ? [...list, ...out] : out.slice(-1))
    } catch (e) { toast(e.message || 'Upload failed', 'error') } finally { setBusy(false); if (input.current) input.current.value = '' }
  }
  const move = (i, d) => { const a = [...list]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; emit(a) }
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {list.map((u, i) => (
          <div key={u + i} className="relative group aspect-[4/3] rounded-lg overflow-hidden bg-surface-container ring-1 ring-outline-variant/40">
            <img src={u} alt="" className="w-full h-full object-cover" />
            {multiple && i === 0 && <span className="absolute top-1.5 left-1.5 bg-primary-container text-on-primary text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">Cover</span>}
            <div className="absolute inset-x-0 bottom-0 flex justify-between p-1.5 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex">{multiple && <><IconButton icon="arrow_back" label="Move left" onClick={() => move(i, -1)} className="!text-white hover:!bg-white/20 !w-7 !h-7" /><IconButton icon="arrow_forward" label="Move right" onClick={() => move(i, 1)} className="!text-white hover:!bg-white/20 !w-7 !h-7" /></>}</div>
              <IconButton icon="delete" label="Remove" onClick={() => emit(list.filter((_, k) => k !== i))} className="!text-white hover:!bg-white/20 !w-7 !h-7" />
            </div>
          </div>
        ))}
        {(multiple || list.length === 0) && (
          <button type="button" onClick={() => input.current?.click()} className="aspect-[4/3] rounded-lg border border-dashed border-outline hover:border-secondary hover:bg-surface-container-low transition-colors flex flex-col items-center justify-center gap-1 text-on-surface-variant">
            {busy ? <Spinner /> : <span className="material-symbols-outlined text-[26px]">add_photo_alternate</span>}
            <span className="text-[12px]">{busy ? 'Uploading…' : label}</span>
          </button>
        )}
      </div>
      <input ref={input} type="file" accept={accept} multiple={multiple} hidden onChange={(e) => e.target.files?.length && upload(e.target.files)} />
      <div className="flex gap-2 mt-3">
        <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="…or paste an image URL" className="!py-1.5 !text-[13px]" />
        <Button variant="secondary" size="sm" onClick={() => { if (!url.trim()) return; emit(multiple ? [...list, url.trim()] : [url.trim()]); setUrl('') }}>Add</Button>
      </div>
    </div>
  )
}

/* ---------- data helper ---------- */
export function useAdminList(table, opts = {}, deps = []) {
  const [state, setState] = useState({ rows: [], count: 0, loading: true })
  const [tick, setTick] = useState(0)
  useEffect(() => {
    let live = true
    setState((s) => ({ ...s, loading: true }))
    db.list(table, opts).then(({ data, count }) => live && setState({ rows: data || [], count: count ?? (data || []).length, loading: false }))
      .catch((e) => { console.error(e); toast(e.message || 'Could not load data', 'error'); live && setState((s) => ({ ...s, loading: false })) })
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, tick, ...deps])
  return { ...state, reload: () => setTick((t) => t + 1) }
}
