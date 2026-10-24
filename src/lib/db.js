// Single entry point for all data access. Picks Supabase when configured, otherwise the local demo backend.
import { isDemo } from './supabase'
import { demo } from './demo'
import { remote } from './remote'
import { makeRef, slugify } from './refs'

const adapter = isDemo ? demo : remote
export const IS_DEMO = isDemo

const nowIso = () => new Date().toISOString()

export const db = {
  ...adapter,
  isDemo,

  /* ---------- Public site helpers ---------- */
  /** Published properties. filters: { listing_type, status, featured, ids } — richer filtering lives in lib/propertyFilters.js */
  async publishedProperties(f = {}) {
    const eq = { published: true }
    if (f.listing_type) eq.listing_type = f.listing_type
    if (f.status) eq.status = f.status
    if (f.featured != null) eq.featured = f.featured
    const o = { eq, order: [{ col: 'featured', asc: false }, { col: 'created_at', asc: false }] }
    if (f.ids) o.in = { id: f.ids }
    if (f.limit) o.limit = f.limit
    return (await adapter.list('properties', o)).data
  },
  async propertyBySlug(slug) { return adapter.get('properties', { slug }) },
  async propertyById(id) { return adapter.get('properties', { id }) },
  async publishedPosts() { return (await adapter.list('journal_posts', { eq: { published: true }, order: { col: 'published_at', asc: false } })).data },
  async postBySlug(slug) { return adapter.get('journal_posts', { slug }) },
  async neighborhoods() { return (await adapter.list('neighborhoods', { eq: { published: true }, order: { col: 'sort' } })).data },
  async testimonials() { return (await adapter.list('testimonials', { eq: { published: true }, order: { col: 'sort' } })).data },
  async team() { return (await adapter.list('team_members', { eq: { published: true }, order: { col: 'sort' } })).data },
  async setting(key, fallback = null) { const r = await adapter.get('site_settings', { key }).catch(() => null); return r?.value ?? fallback },

  /* ---------- Public form submissions (anonymous inserts) ---------- */
  /** type: general | consultation | property | buyer | seller | landlord | tenant | investment | commercial | land | development | mortgage | relocation | management | press | careers | accessibility | new_development */
  async submitInquiry({ type = 'general', name, email, phone = '', subject = '', message = '', property_id = null, payload = {} }) {
    const row = { ref: makeRef('INQ'), type, name, email, phone, subject, message, property_id, payload, status: 'new', notes: '', created_at: nowIso() }
    return adapter.insert('inquiries', row)
  },
  async submitViewing(v) {
    const row = { ref: makeRef('VWR'), status: 'pending', viewing_type: 'in_person', attendees: 1, notes: '', admin_notes: '', created_at: nowIso(), ...v }
    return adapter.insert('viewing_requests', row)
  },
  async submitValuation(v) {
    const row = { ref: makeRef('VAL'), status: 'new', admin_notes: '', created_at: nowIso(), ...v }
    return adapter.insert('valuation_requests', row)
  },
  async subscribe(email, source = 'footer') {
    try { return await adapter.insert('subscribers', { email: email.trim().toLowerCase(), source, created_at: nowIso() }) }
    catch (e) { if (/duplicate|unique|23505/i.test(e.message || e.code || '')) return { duplicate: true }; throw e }
  },
  /** Creates a submitted rental application. The ref is created client side so anonymous users never need read access. */
  async submitApplication(a) {
    const prop = a.property_id ? await adapter.get('properties', { id: a.property_id }).catch(() => null) : null
    const code = (prop?.title || 'RNT').replace(/^(The|A)\s+/i, '').slice(0, 3).toUpperCase()
    const row = {
      ref: makeRef(`APP-${code}`), status: 'submitted', payload: {}, withdrawn_reason: '', special_notes: '', created_at: nowIso(), submitted_at: nowIso(),
      property_title: prop?.title || a.property_title || '', ...a,
    }
    return adapter.insert('rental_applications', row)
  },
  trackApplication: (ref, email) => adapter.rpc('track_application', { p_ref: ref, p_email: email }),
  sendApplicationMessage: (ref, email, body) => adapter.rpc('application_send_message', { p_ref: ref, p_email: email, p_body: body }),
  addApplicationDocument: (ref, email, d) => adapter.rpc('application_add_document', { p_ref: ref, p_email: email, p_name: d.name, p_doc_type: d.doc_type, p_file_path: d.file_path, p_file_url: d.file_url, p_request_doc_id: d.request_doc_id || null }),
  respondApplicationInfo: (ref, email, requestId, response) => adapter.rpc('application_respond_info', { p_ref: ref, p_email: email, p_request_id: requestId, p_response: response }),
  withdrawApplication: (ref, email, reason) => adapter.rpc('application_withdraw', { p_ref: ref, p_email: email, p_reason: reason }),
  trackPropertyView: (id) => adapter.rpc('increment_property_views', { p_id: id }).catch(() => {}),

  /* ---------- Admin helpers ---------- */
  async saveProperty(p) {
    const row = { ...p }
    if (!row.slug) row.slug = slugify(row.title)
    if (row.id) { const { id, ...rest } = row; return adapter.update('properties', id, rest) }
    return adapter.insert('properties', row)
  },
  async stats() {
    const c = async (t, eq) => (await adapter.list(t, { eq, limit: 1 })).count || 0
    const [props, sale, rent, newInq, openInq, pendingV, apps, newVal, subs, drafts] = await Promise.all([
      c('properties'), c('properties', { listing_type: 'sale', published: true }), c('properties', { listing_type: 'rent', published: true }),
      c('inquiries', { status: 'new' }), c('inquiries'), c('viewing_requests', { status: 'pending' }),
      c('rental_applications'), c('valuation_requests', { status: 'new' }), c('subscribers'), c('properties', { published: false }),
    ])
    return { properties: props, sale, rent, newInquiries: newInq, inquiries: openInq, pendingViewings: pendingV, applications: apps, newValuations: newVal, subscribers: subs, drafts }
  },
}

export default db
