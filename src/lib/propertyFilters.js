// Client-side property filtering/sorting shared by the listing, search and shortlist pages.
export const money = (n, currency = 'USD', opts = {}) =>
  n == null || n === '' ? '' : new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0, ...opts }).format(n)

export const priceText = (p) => {
  if (p.listing_type === 'rent') return p.rent_pcm ? `${money(p.rent_pcm, p.currency)} per month` : p.price_label || 'Rental price on enquiry'
  if (p.price_label && !/^[\$£€]|^CHF|^\d/.test(p.price_label)) return p.price_label
  return p.price ? money(p.price, p.currency) : p.price_label || 'Price on Request'
}
export const sqft = (n) => (n ? `${Number(n).toLocaleString('en-US')} sq ft` : '')
export const sqm = (n) => (n ? `${Number(n).toLocaleString('en-US')} sq m` : '')
export const bathsText = (n) => `${n} ${n === 1 ? 'Bath' : 'Baths'}`
export const locationText = (p) => [p.city, p.region].filter(Boolean).join(', ')

/** f: { q, listing_type, property_type, city, minPrice, maxPrice, beds, baths, features[], minArea, maxArea (sq m), newThisWeek, sort } */
export function filterProperties(rows, f = {}) {
  let r = rows.filter((p) => {
    if (f.listing_type && f.listing_type !== 'all' && p.listing_type !== f.listing_type) return false
    if (f.property_type && f.property_type !== 'all' && p.property_type !== f.property_type) return false
    if (f.city && f.city !== 'all' && p.city !== f.city && p.region !== f.city) return false
    if (f.q) {
      const hay = [p.title, p.subtitle, p.city, p.region, p.country, p.neighborhood, p.address, p.architect].join(' ').toLowerCase()
      if (!f.q.toLowerCase().split(/\s+/).every((w) => hay.includes(w))) return false
    }
    const val = p.listing_type === 'rent' ? p.rent_pcm : p.price
    if (f.minPrice && (val == null || val < f.minPrice)) return false
    if (f.maxPrice && val != null && val > f.maxPrice) return false
    if (f.beds && (p.bedrooms || 0) < f.beds) return false
    if (f.baths && (p.bathrooms || 0) < f.baths) return false
    if (f.minArea && (p.area_sqm || 0) < f.minArea) return false
    if (f.maxArea && (p.area_sqm || 0) > f.maxArea) return false
    if (f.features?.length && !f.features.every((x) => (p.features || []).includes(x))) return false
    if (f.newThisWeek && Date.now() - new Date(p.created_at).getTime() > 7 * 864e5) return false
    if (f.furnished && !p.furnished) return false
    return true
  })
  const val = (p) => (p.listing_type === 'rent' ? p.rent_pcm : p.price) ?? Infinity
  switch (f.sort) {
    case 'price_asc': r = [...r].sort((a, b) => val(a) - val(b)); break
    case 'price_desc': r = [...r].sort((a, b) => (val(b) === Infinity ? -1 : val(b)) - (val(a) === Infinity ? -1 : val(a))); break
    case 'newest': r = [...r].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); break
    case 'area': r = [...r].sort((a, b) => (b.area_sqm || 0) - (a.area_sqm || 0)); break
    case 'beds': r = [...r].sort((a, b) => (a.bedrooms || 0) - (b.bedrooms || 0)); break
    default: break
  }
  return r
}

export const ALL_FEATURES = ['Garden or Courtyard', 'Secure Parking / Garage', 'Outdoor Space / Pavilion', 'Home Study or Atelier', 'Balcony or Terrace', 'Recently Renovated / Restored']
export const PROPERTY_TYPES = [
  { value: 'residence', label: 'Residence' }, { value: 'penthouse', label: 'Penthouse' }, { value: 'estate', label: 'Estate' },
  { value: 'townhouse', label: 'Townhouse' }, { value: 'apartment', label: 'Apartment' }, { value: 'villa', label: 'Villa' },
  { value: 'land', label: 'Land' }, { value: 'commercial', label: 'Commercial' },
]
export const STATUS_LABEL = { available: 'Available', under_contract: 'Under Contract', sold: 'Sold', let: 'Let', coming_soon: 'Coming Soon' }

// Saved properties (shortlist) — stored per browser.
const SAVED_KEY = 'forme.saved'
export const getSaved = () => { try { return JSON.parse(localStorage.getItem(SAVED_KEY) || '[]') } catch { return [] } }
export const isSaved = (id) => getSaved().includes(id)
export function toggleSaved(id) {
  const cur = getSaved(); const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
  try { localStorage.setItem(SAVED_KEY, JSON.stringify(next)) } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent('forme:saved', { detail: next }))
  return next
}
