// Supabase backend — same API as demo.js.
import { supabase } from './supabase'
import { uuid } from './refs'

const ANON_INSERT = new Set(['inquiries', 'viewing_requests', 'valuation_requests', 'subscribers', 'rental_applications'])
const unwrap = ({ data, error, count }) => { if (error) throw error; return { data, count } }
const clean = (q) => String(q).replace(/[,()%*]/g, ' ').trim()

export const remote = {
  isDemo: false,
  async list(table, o = {}) {
    let q = supabase.from(table).select('*', { count: 'exact' })
    if (o.eq) for (const [k, v] of Object.entries(o.eq)) q = Array.isArray(v) ? q.in(k, v) : q.eq(k, v)
    if (o.neq) for (const [k, v] of Object.entries(o.neq)) q = q.neq(k, v)
    if (o.in) for (const [k, v] of Object.entries(o.in)) q = q.in(k, v)
    if (o.gte) for (const [k, v] of Object.entries(o.gte)) q = q.gte(k, v)
    if (o.lte) for (const [k, v] of Object.entries(o.lte)) q = q.lte(k, v)
    if (o.search?.q) q = q.or(o.search.cols.map((c) => `${c}.ilike.%${clean(o.search.q)}%`).join(','))
    if (o.order) for (const { col, asc = true } of Array.isArray(o.order) ? o.order : [o.order]) q = q.order(col, { ascending: asc, nullsFirst: false })
    if (o.limit != null) { const from = o.offset || 0; q = q.range(from, from + o.limit - 1) }
    return unwrap(await q)
  },
  async get(table, match) {
    let q = supabase.from(table).select('*')
    for (const [k, v] of Object.entries(match)) q = q.eq(k, v)
    const { data, error } = await q.limit(1).maybeSingle()
    if (error) throw error
    return data
  },
  async insert(table, row) {
    const r = { id: row.id || uuid(), ...row }
    if (ANON_INSERT.has(table)) {
      const { error } = await supabase.from(table).insert(r)
      if (error) throw error
      return { created_at: new Date().toISOString(), ...r }
    }
    const { data, error } = await supabase.from(table).insert(r).select().single()
    if (error) throw error
    return data
  },
  async update(table, id, patch) {
    const { data, error } = await supabase.from(table).update({ ...patch, updated_at: new Date().toISOString() }).eq('id', id).select().single()
    if (error) throw error
    return data
  },
  async upsert(table, row, key = 'id') {
    const { data, error } = await supabase.from(table).upsert(row, { onConflict: key }).select().single()
    if (error) throw error
    return data
  },
  async remove(table, id) {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) throw error
    return true
  },
  async rpc(name, args) {
    const { data, error } = await supabase.rpc(name, args)
    if (error) throw error
    return data
  },
  auth: {
    async getSession() {
      const { data } = await supabase.auth.getSession()
      const u = data.session?.user
      return u ? { user: { id: u.id, email: u.email, name: u.user_metadata?.full_name || u.email } } : null
    },
    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return { user: { id: data.user.id, email: data.user.email } }
    },
    async signOut() { await supabase.auth.signOut() },
    onChange(cb) {
      const { data } = supabase.auth.onAuthStateChange((_e, session) => cb(session?.user ? { user: { id: session.user.id, email: session.user.email } } : null))
      return () => data.subscription.unsubscribe()
    },
    async isAdmin() {
      const { data: s } = await supabase.auth.getSession()
      if (!s.session) return false
      const { data } = await supabase.from('profiles').select('role').eq('id', s.session.user.id).maybeSingle()
      return !!data && ['admin', 'staff'].includes(data.role)
    },
    async updatePassword(pw) { const { error } = await supabase.auth.updateUser({ password: pw }); if (error) throw error },
  },
  storage: {
    async upload(bucket, file, prefix = '') {
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const path = `${prefix}${uuid()}-${safe}`
      const { error } = await supabase.storage.from(bucket).upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type })
      if (error) throw error
      const { data } = supabase.storage.from(bucket).getPublicUrl(path)
      return { path, url: data.publicUrl }
    },
    async signedUrl(bucket, path) {
      const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, 3600)
      if (error) throw error
      return data.signedUrl
    },
    async remove(bucket, paths) { await supabase.storage.from(bucket).remove(paths) },
  },
}
