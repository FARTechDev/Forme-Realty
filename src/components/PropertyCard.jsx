import { Link } from './Link'
import { useSaved } from '../lib/hooks'
import { toggleSaved, priceText, sqft, locationText, bathsText } from '../lib/propertyFilters'
import { toast } from './toast'

export function SaveButton({ id, className = '' }) {
  const saved = useSaved().includes(id)
  return (
    <button
      type="button"
      aria-label={saved ? 'Remove from shortlist' : 'Save to shortlist'}
      data-cursor="Save"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSaved(id); toast(saved ? 'Removed from your shortlist' : 'Saved to your shortlist') }}
      className={`w-10 h-10 rounded-full bg-surface/90 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors ${className}`}
    >
      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: `'FILL' ${saved ? 1 : 0}` }}>favorite</span>
    </button>
  )
}

export const detailPath = (p) => (p.listing_type === 'rent' ? `/rentals/${p.slug}` : `/properties/${p.slug}`)

export default function PropertyCard({ p }) {
  const rent = p.listing_type === 'rent'
  return (
    <article className="relative flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
      <SaveButton id={p.id} className="absolute top-3 right-3 z-10" />
      <Link to={detailPath(p)} data-cursor="View" className="relative aspect-[4/3] overflow-hidden bg-surface-container block">
        {p.cover_image && <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={p.cover_image} alt={p.title} loading="lazy" decoding="async" />}
        <div className="absolute bottom-3 left-3"><span className="px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-sm font-label-caps text-label-caps uppercase tracking-[0.12em] text-primary">{locationText(p)}</span></div>
        {p.status !== 'available' && <div className="absolute top-3 left-3"><span className="px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-[0.12em]">{p.status.replace('_', ' ')}</span></div>}
      </Link>
      
      <div className="p-space-lg flex flex-col flex-1 justify-between gap-space-md">
        <div className="space-y-space-xs">
          <h3 className="font-headline-sm text-headline-sm text-primary tracking-tight">{p.title}</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant font-light">{p.summary}</p>
        </div>
        <div className="pt-space-sm space-y-space-sm">
          <div className="flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps uppercase tracking-[0.12em]">
            <span>{p.bedrooms} Beds · {bathsText(p.bathrooms)}</span>
            <span className="text-primary font-medium">{sqft(p.area_sqft)}</span>
          </div>
          <div className="font-body-sm text-body-sm text-secondary font-medium">{priceText(p)}</div>
          <Link to={detailPath(p)} className="inline-flex items-center justify-between w-full pt-space-xs font-label-caps text-label-caps uppercase tracking-[0.14em] text-primary hover:text-secondary transition-colors">
            <span>{rent ? 'View Rental' : 'View Residence'}</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
