import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { db } from '../../lib/db'
import { slugify } from '../../lib/refs'
import { ALL_FEATURES, PROPERTY_TYPES, STATUS_LABEL } from '../../lib/propertyFilters'
import { toast } from '../../components/toast'
import { Button, Card, Field, ImageUploader, Input, PageHeader, Select, Spinner, Tabs, Textarea, Toggle, IconButton, useConfirm } from '../ui'

const EMPTY = { title: '', slug: '', subtitle: '', summary: '', description: '', badge: '', listing_type: 'sale', property_type: 'residence', status: 'available', featured: false, published: false,
  price: null, price_label: 'Price on Request', currency: 'USD', rent_pcm: null, lease_term: '', furnished: false, available_from: null,
  city: '', region: '', country: 'United States', neighborhood: '', address: '', latitude: null, longitude: null,
  bedrooms: 0, bathrooms: 0, area_sqft: null, area_sqm: null, lot_size: '', year_built: null, architect: '', materials: '', parking: '',
  features: [], cover_image: '', gallery: [], floor_plan_url: '', specs: [] }
const num = (v) => (v === '' || v == null ? null : Number(v))

export default function PropertyForm() {
  const { id } = useParams(); const nav = useNavigate(); const confirm = useConfirm()
  const isNew = !id
  const [p, setP] = useState(isNew ? EMPTY : null)
  const [tab, setTab] = useState('basics'); const [dirty, setDirty] = useState(false); const [saving, setSaving] = useState(false)
  const [slugTouched, setSlugTouched] = useState(false); const [custom, setCustom] = useState('')
  const saved = useRef(false)

  useEffect(() => { if (!isNew) db.get('properties', { id }).then((r) => (r ? (setP({ ...EMPTY, ...r }), setSlugTouched(true)) : setP(false))) }, [id, isNew])
  useEffect(() => { const h = (e) => { if (dirty && !saved.current) { e.preventDefault(); e.returnValue = '' } }; window.addEventListener('beforeunload', h); return () => window.removeEventListener('beforeunload', h) }, [dirty])

  if (p === null) return <div className="py-20 text-center"><Spinner size={26} /></div>
  if (p === false) return <p>Property not found. <Link className="underline" to="/admin/properties">Back</Link></p>

  const set = (k, v) => { setDirty(true); setP((s) => ({ ...s, [k]: v, ...(k === 'title' && !slugTouched ? { slug: slugify(v) } : {}) })) }
  const errors = { title: !p.title.trim() && 'Title is required', city: !p.city.trim() && 'City is required', cover_image: !p.cover_image && 'Add a cover image to publish' }
  const sqft2sqm = (v) => v && Math.round(v * 0.092903); const sqm2sqft = (v) => v && Math.round(v / 0.092903)

  const save = async (publish) => {
    if (errors.title || errors.city) { toast(errors.title || errors.city, 'error'); setTab('basics'); return }
    if (publish && errors.cover_image) { toast(errors.cover_image, 'error'); setTab('media'); return }
    setSaving(true)
    try {
      const row = { ...p, published: publish == null ? p.published : publish, slug: p.slug || slugify(p.title) }
      if (row.listing_type === 'rent' && row.rent_pcm && !row.price_label) row.price_label = ''
      const r = await db.saveProperty(row)
      saved.current = true; setDirty(false); toast(publish ? 'Property published' : 'Property saved'); window.dispatchEvent(new CustomEvent('admin:refresh-stats'))
      isNew ? nav(`/admin/properties/${r.id}`, { replace: true }) : setP({ ...EMPTY, ...r })
      setTimeout(() => { saved.current = false }, 300)
    } catch (e) { toast(e.message || 'Could not save', 'error') } finally { setSaving(false) }
  }
  const del = async () => { if (await confirm({ title: 'Delete property?', message: `“${p.title}” will be removed permanently.`, confirmLabel: 'Delete' })) { saved.current = true; await db.remove('properties', p.id); toast('Deleted'); nav('/admin/properties') } }
  const toggleFeature = (f) => set('features', p.features.includes(f) ? p.features.filter((x) => x !== f) : [...p.features, f])
  const g = p.gallery || []

  const T = ({ k, label }) => <Field key={k} label={label} error={errors[k]}><Input value={p[k] ?? ''} onChange={(e) => set(k, e.target.value)} /></Field>
  const N = ({ k, label, step }) => <Field key={k} label={label}><Input type="number" step={step} value={p[k] ?? ''} onChange={(e) => set(k, num(e.target.value))} /></Field>

  return (
    <>
      <PageHeader title={isNew ? 'New property' : p.title || 'Edit property'} subtitle={isNew ? 'Create a sale or rental listing.' : `/${p.listing_type === 'rent' ? 'rentals' : 'properties'}/${p.slug}`}
        back={<Link to="/admin/properties" className="text-[12px] uppercase tracking-[0.14em] text-on-surface-variant hover:text-primary">← Properties</Link>}
        actions={!isNew && <Button variant="secondary" icon="open_in_new" as="a" href={`/${p.listing_type === 'rent' ? 'rentals' : 'properties'}/${p.slug}`} target="_blank" rel="noreferrer">View on site</Button>} />
      <Tabs value={tab} onChange={setTab} tabs={[{ value: 'basics', label: 'Basics' }, { value: 'pricing', label: 'Pricing' }, { value: 'location', label: 'Location' }, { value: 'details', label: 'Details' }, { value: 'features', label: 'Features' }, { value: 'media', label: `Media (${g.length + (p.cover_image ? 1 : 0)})` }, { value: 'specs', label: `Specs (${p.specs.length})` }]} />

      <Card className="mb-24">
        {tab === 'basics' && (
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Title" required error={errors.title} className="md:col-span-2"><Input value={p.title} onChange={(e) => set('title', e.target.value)} /></Field>
            <Field label="URL slug"><Input value={p.slug} onChange={(e) => { setSlugTouched(true); set('slug', slugify(e.target.value)) }} /></Field>
            <Field label="Badge" hint="e.g. Private Portfolio, New This Week"><Input value={p.badge} onChange={(e) => set('badge', e.target.value)} /></Field>
            <Field label="Listing type"><Select value={p.listing_type} onChange={(e) => set('listing_type', e.target.value)} options={[{ value: 'sale', label: 'For sale' }, { value: 'rent', label: 'For rent' }]} /></Field>
            <Field label="Property type"><Select value={p.property_type} onChange={(e) => set('property_type', e.target.value)} options={PROPERTY_TYPES} /></Field>
            <Field label="Status"><Select value={p.status} onChange={(e) => set('status', e.target.value)} options={Object.entries(STATUS_LABEL).map(([value, label]) => ({ value, label }))} /></Field>
            <div className="flex gap-8 items-end pb-1"><Toggle checked={p.featured} onChange={(v) => set('featured', v)} label="Featured" /><Toggle checked={p.published} onChange={(v) => set('published', v)} label="Published" /></div>
            <Field label="Subtitle" className="md:col-span-2"><Input value={p.subtitle} onChange={(e) => set('subtitle', e.target.value)} /></Field>
            <Field label="Card summary" hint="One or two sentences shown on listing cards" className="md:col-span-2"><Textarea rows={2} value={p.summary} onChange={(e) => set('summary', e.target.value)} /></Field>
            <Field label="Description" hint="Separate paragraphs with a blank line" className="md:col-span-2"><Textarea rows={9} value={p.description} onChange={(e) => set('description', e.target.value)} /></Field>
          </div>
        )}
        {tab === 'pricing' && (
          <div className="grid md:grid-cols-3 gap-5">
            <Field label="Currency"><Select value={p.currency} onChange={(e) => set('currency', e.target.value)} options={['USD', 'GBP', 'EUR', 'CHF']} /></Field>
            {p.listing_type === 'sale' ? <>
              {N({ k: 'price', label: 'Price' })}<Field label="Display label" hint="Overrides the price, e.g. “Price on Request”"><Input value={p.price_label} onChange={(e) => set('price_label', e.target.value)} /></Field>
            </> : <>
              {N({ k: 'rent_pcm', label: 'Rent per month' })}<Field label="Lease term"><Input value={p.lease_term} onChange={(e) => set('lease_term', e.target.value)} placeholder="12–24 months" /></Field>
              <Field label="Available from"><Input type="date" value={p.available_from || ''} onChange={(e) => set('available_from', e.target.value || null)} /></Field>
              <div className="flex items-end pb-1"><Toggle checked={p.furnished} onChange={(v) => set('furnished', v)} label="Furnished" /></div>
            </>}
          </div>
        )}
        {tab === 'location' && (
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="City" required error={errors.city}><Input value={p.city} onChange={(e) => set('city', e.target.value)} /></Field>
            {T({ k: 'region', label: 'State / region' })}{T({ k: 'country', label: 'Country' })}{T({ k: 'neighborhood', label: 'Neighborhood' })}
            <Field label="Address" className="md:col-span-2"><Input value={p.address} onChange={(e) => set('address', e.target.value)} /></Field>
            {N({ k: 'latitude', label: 'Latitude', step: 'any' })}{N({ k: 'longitude', label: 'Longitude', step: 'any' })}
          </div>
        )}
        {tab === 'details' && (
          <div className="grid md:grid-cols-3 gap-5">
            {N({ k: 'bedrooms', label: 'Bedrooms' })}{N({ k: 'bathrooms', label: 'Bathrooms', step: '0.5' })}{N({ k: 'year_built', label: 'Year built' })}
            <Field label="Area (sq ft)"><Input type="number" value={p.area_sqft ?? ''} onChange={(e) => { const v = num(e.target.value); setDirty(true); setP((s) => ({ ...s, area_sqft: v, area_sqm: sqft2sqm(v) })) }} /></Field>
            <Field label="Area (sq m)"><Input type="number" value={p.area_sqm ?? ''} onChange={(e) => { const v = num(e.target.value); setDirty(true); setP((s) => ({ ...s, area_sqm: v, area_sqft: sqm2sqft(v) })) }} /></Field>
            {T({ k: 'lot_size', label: 'Lot size' })}{T({ k: 'architect', label: 'Architect' })}{T({ k: 'materials', label: 'Materials' })}{T({ k: 'parking', label: 'Parking' })}
          </div>
        )}
        {tab === 'features' && (
          <div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[...new Set([...ALL_FEATURES, ...p.features])].map((f) => (
                <label key={f} className="flex items-center gap-3 p-3 rounded-lg ring-1 ring-outline-variant/40 hover:ring-primary/40 cursor-pointer text-[14px]"><input type="checkbox" checked={p.features.includes(f)} onChange={() => toggleFeature(f)} />{f}</label>
              ))}
            </div>
            <div className="flex gap-2 mt-5 max-w-md"><Input value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Add a custom feature" /><Button variant="secondary" onClick={() => { if (custom.trim()) { toggleFeature(custom.trim()); setCustom('') } }}>Add</Button></div>
          </div>
        )}
        {tab === 'media' && (
          <div className="space-y-8">
            <Field label="Cover image" error={errors.cover_image && !p.published ? undefined : errors.cover_image}><div className="max-w-sm"><ImageUploader value={p.cover_image} onChange={(v) => set('cover_image', v)} label="Upload cover" /></div></Field>
            <div>
              <span className="block font-label-caps text-[10.5px] uppercase tracking-[0.14em] text-outline mb-1.5">Gallery</span>
              <ImageUploader multiple value={g.map((x) => x.url)} onChange={(urls) => set('gallery', urls.map((u) => g.find((x) => x.url === u) || { url: u, caption: '' }))} />
              {g.length > 0 && <div className="mt-5 grid md:grid-cols-2 gap-3">{g.map((x, i) => <div key={x.url + i} className="flex items-center gap-3"><img src={x.url} alt="" className="w-14 h-10 object-cover rounded" /><Input value={x.caption} placeholder="Caption" onChange={(e) => set('gallery', g.map((y, k) => (k === i ? { ...y, caption: e.target.value } : y)))} /></div>)}</div>}
            </div>
            <Field label="Floor plan image URL" hint="Optional — shown in the Spatial Composition section"><Input value={p.floor_plan_url} onChange={(e) => set('floor_plan_url', e.target.value)} /></Field>
          </div>
        )}
        {tab === 'specs' && (
          <div className="space-y-3 max-w-3xl">
            {p.specs.map((s, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input value={s.label} placeholder="Label (e.g. Primary Stone)" onChange={(e) => set('specs', p.specs.map((x, k) => (k === i ? { ...x, label: e.target.value } : x)))} />
                <Input value={s.value} placeholder="Value" onChange={(e) => set('specs', p.specs.map((x, k) => (k === i ? { ...x, value: e.target.value } : x)))} />
                <IconButton icon="arrow_upward" label="Up" onClick={() => { const a = [...p.specs]; if (i) { [a[i - 1], a[i]] = [a[i], a[i - 1]]; set('specs', a) } }} />
                <IconButton icon="delete" label="Remove" onClick={() => set('specs', p.specs.filter((_, k) => k !== i))} />
              </div>
            ))}
            <Button variant="secondary" icon="add" onClick={() => set('specs', [...p.specs, { label: '', value: '' }])}>Add specification</Button>
          </div>
        )}
      </Card>

      <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-30 bg-surface/95 backdrop-blur border-t border-outline-variant/40 px-6 py-3 flex items-center justify-between">
        <span className="text-[13px] text-on-surface-variant">{dirty ? '● Unsaved changes' : 'All changes saved'}</span>
        <div className="flex gap-2">
          {!isNew && <Button variant="ghost" icon="delete" onClick={del}>Delete</Button>}
          <Button variant="secondary" loading={saving} onClick={() => save(p.published ? undefined : false)}>Save draft</Button>
          <Button loading={saving} onClick={() => save(true)}>{p.published ? 'Save & keep live' : 'Publish'}</Button>
        </div>
      </div>
    </>
  )
}
