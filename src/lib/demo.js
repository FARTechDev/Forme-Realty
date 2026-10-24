// Local "demo mode" backend — same API as remote.js but persisted in localStorage.
// Used automatically when VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not configured.
import { SEED } from './seed'
import { uuid } from './refs'

const KEY = 'forme.demo.v2'
const SESSION_KEY = 'forme.demo.session'
const PW_KEY = 'forme.demo.adminpw'
export const DEMO_ADMIN = { email: import.meta.env.VITE_DEMO_ADMIN_EMAIL || 'admin@formerealty.com', password: import.meta.env.VITE_DEMO_ADMIN_PASSWORD || 'forme-admin' }

let mem = null
const clone = (v) => (v === undefined ? v : JSON.parse(JSON.stringify(v)))
function load() {
  if (mem) return mem
  try { const raw = localStorage.getItem(KEY); if (raw) mem = JSON.parse(raw) } catch { /* ignore */ }
  if (!mem) { mem = clone(SEED); persist() }
  // backfill any tables added in later versions
  for (const k of Object.keys(SEED)) if (!mem[k]) mem[k] = clone(SEED[k])
  return mem
}
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(mem)) } catch (e) { console.warn('[demo db] could not persist (storage full?)', e) }
}
export function resetDemo() { mem = clone(SEED); persist() }

const now = () => new Date().toISOString()
const cmp = (a, b) => (a == null && b == null ? 0 : a == null ? -1 : b == null ? 1 : a < b ? -1 : a > b ? 1 : 0)

function run(table, o = {}) {
  let rows = [...(load()[table] || [])]
  if (o.eq) for (const [k, v] of Object.entries(o.eq)) rows = rows.filter((r) => (Array.isArray(v) ? v.includes(r[k]) : r[k] === v))
  if (o.neq) for (const [k, v] of Object.entries(o.neq)) rows = rows.filter((r) => r[k] !== v)
  if (o.in) for (const [k, v] of Object.entries(o.in)) rows = rows.filter((r) => v.includes(r[k]))
  if (o.gte) for (const [k, v] of Object.entries(o.gte)) rows = rows.filter((r) => r[k] != null && r[k] >= v)
  if (o.lte) for (const [k, v] of Object.entries(o.lte)) rows = rows.filter((r) => r[k] != null && r[k] <= v)
  if (o.search?.q) {
    const q = o.search.q.toLowerCase()
    rows = rows.filter((r) => o.search.cols.some((c) => String(r[c] ?? '').toLowerCase().includes(q)))
  }
  if (o.order) {
    const list = Array.isArray(o.order) ? o.order : [o.order]
    rows.sort((a, b) => { for (const { col, asc = true } of list) { const c = cmp(a[col], b[col]); if (c) return asc ? c : -c } return 0 })
  }
  const count = rows.length
  if (o.offset) rows = rows.slice(o.offset)
  if (o.limit) rows = rows.slice(0, o.limit)
  return { data: clone(rows), count }
}

const appByRef = (ref, email) => load().rental_applications.find((a) => a.ref?.toLowerCase() === String(ref).trim().toLowerCase() && a.email?.toLowerCase() === String(email).trim().toLowerCase())

const rpcs = {
  track_application({ p_ref, p_email }) {
    const a = appByRef(p_ref, p_email)
    if (!a) return null
    const s = load()
    const p = s.properties.find((x) => x.id === a.property_id)
    return clone({
      application: a,
      property: p ? { id: p.id, slug: p.slug, title: p.title, cover_image: p.cover_image, city: p.city, address: p.address, rent_pcm: p.rent_pcm, price_label: p.price_label } : null,
      messages: s.application_messages.filter((m) => m.application_id === a.id).sort((x, y) => cmp(x.created_at, y.created_at)),
      documents: s.application_documents.filter((m) => m.application_id === a.id).sort((x, y) => cmp(x.created_at, y.created_at)),
      requests: s.information_requests.filter((m) => m.application_id === a.id).sort((x, y) => cmp(x.created_at, y.created_at)),
    })
  },
  application_send_message({ p_ref, p_email, p_body }) {
    const a = appByRef(p_ref, p_email)
    if (!a) throw new Error('Application not found')
    const m = { id: uuid(), application_id: a.id, sender: 'applicant', body: p_body, created_at: now() }
    load().application_messages.push(m); a.updated_at = now(); persist(); return clone(m)
  },
  application_add_document({ p_ref, p_email, p_name, p_doc_type, p_file_path, p_file_url, p_request_doc_id }) {
    const a = appByRef(p_ref, p_email)
    if (!a) throw new Error('Application not found')
    const s = load()
    let d = p_request_doc_id && s.application_documents.find((x) => x.id === p_request_doc_id && x.application_id === a.id)
    if (d) Object.assign(d, { status: 'uploaded', file_path: p_file_path || '', file_url: p_file_url || '', name: p_name || d.name })
    else { d = { id: uuid(), application_id: a.id, name: p_name, doc_type: p_doc_type || 'other', file_path: p_file_path || '', file_url: p_file_url || '', status: 'uploaded', created_at: now() }; s.application_documents.push(d) }
    a.updated_at = now(); persist(); return clone(d)
  },
  application_respond_info({ p_ref, p_email, p_request_id, p_response }) {
    const a = appByRef(p_ref, p_email)
    if (!a) throw new Error('Application not found')
    const s = load()
    const r = s.information_requests.find((x) => x.id === p_request_id && x.application_id === a.id)
    if (!r) throw new Error('Request not found')
    r.response = p_response; r.status = 'provided'
    if (!s.information_requests.some((x) => x.application_id === a.id && x.status === 'open') && a.status === 'info_requested') a.status = 'under_review'
    a.updated_at = now(); persist(); return clone(r)
  },
  application_withdraw({ p_ref, p_email, p_reason }) {
    const a = appByRef(p_ref, p_email)
    if (!a) throw new Error('Application not found')
    a.status = 'withdrawn'; a.withdrawn_reason = p_reason || ''; a.updated_at = now(); persist(); return clone(a)
  },
  increment_property_views({ p_id }) {
    const p = load().properties.find((x) => x.id === p_id)
    if (p) { p.views = (p.views || 0) + 1; persist() }
    return null
  },
}

const listeners = new Set()
const readSession = () => { try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') } catch { return null } }
const emit = () => listeners.forEach((f) => f(readSession()))

export const demo = {
  isDemo: true,
  async list(table, o) { return run(table, o) },
  async get(table, match) {
    const row = (load()[table] || []).find((r) => Object.entries(match).every(([k, v]) => r[k] === v))
    return clone(row) || null
  },
  async insert(table, row) {
    const s = load(); if (!s[table]) s[table] = []
    const r = { id: uuid(), created_at: now(), updated_at: now(), ...row }
    s[table].push(r); persist(); return clone(r)
  },
  async update(table, id, patch) {
    const s = load(); const r = (s[table] || []).find((x) => x.id === id)
    if (!r) throw new Error('Row not found')
    Object.assign(r, patch, { updated_at: now() }); persist(); return clone(r)
  },
  async upsert(table, row, key = 'id') {
    const s = load(); if (!s[table]) s[table] = []
    const r = s[table].find((x) => x[key] === row[key])
    if (r) { Object.assign(r, row, { updated_at: now() }); persist(); return clone(r) }
    return demo.insert(table, row)
  },
  async remove(table, id) {
    const s = load()
    s[table] = (s[table] || []).filter((x) => x.id !== id)
    if (table === 'rental_applications') for (const t of ['application_messages', 'application_documents', 'information_requests']) s[t] = s[t].filter((x) => x.application_id !== id)
    persist(); return true
  },
  async rpc(name, args) {
    if (!rpcs[name]) throw new Error('Unknown rpc ' + name)
    return rpcs[name](args || {})
  },
  auth: {
    async getSession() { return readSession() },
    async signIn(email, password) {
      const pw = localStorage.getItem(PW_KEY) || DEMO_ADMIN.password
      if (email.trim().toLowerCase() !== DEMO_ADMIN.email.toLowerCase() || password !== pw) throw new Error('Invalid email or password.')
      const session = { user: { id: 'demo-admin', email: DEMO_ADMIN.email, role: 'admin', name: 'Administrator' } }
      localStorage.setItem(SESSION_KEY, JSON.stringify(session)); emit(); return session
    },
    async signOut() { localStorage.removeItem(SESSION_KEY); emit() },
    onChange(cb) { listeners.add(cb); return () => listeners.delete(cb) },
    async isAdmin() { return !!readSession() },
    async updatePassword(pw) { localStorage.setItem(PW_KEY, pw) },
  },
  storage: {
    async upload(bucket, file, prefix = '') {
      const url = await fileToDataUrl(file)
      return { path: `${prefix}${uuid()}-${file.name}`, url }
    },
    async signedUrl(bucket, path) { return path },
    async remove() { return true },
  },
}

// Down-scale images so they fit comfortably inside localStorage.
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onerror = () => reject(new Error('Could not read file'))
    fr.onload = () => {
      if (!file.type.startsWith('image/')) {
        if (file.size > 1.5 * 1024 * 1024) return reject(new Error('Demo mode: files are limited to 1.5 MB (connect Supabase for larger uploads).'))
        return resolve(fr.result)
      }
      const img = new Image()
      img.onload = () => {
        const max = 1600; const sc = Math.min(1, max / Math.max(img.width, img.height))
        const c = document.createElement('canvas'); c.width = Math.round(img.width * sc); c.height = Math.round(img.height * sc)
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
        resolve(c.toDataURL('image/jpeg', 0.82))
      }
      img.onerror = () => resolve(fr.result)
      img.src = fr.result
    }
    fr.readAsDataURL(file)
  })
}
