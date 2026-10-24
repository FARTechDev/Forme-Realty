// Helpers shared by the admin management pages.
import { useEffect, useState } from 'react'
import { db } from '../../lib/db'
import { titleCase } from '../ui'

export const refreshStats = () => window.dispatchEvent(new Event('admin:refresh-stats'))

export function downloadCsv(filename, columns, rows) {
  const esc = (v) => { const s = v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v); return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s }
  const csv = [columns.map((c) => esc(c.label)).join(','), ...rows.map((r) => columns.map((c) => esc(c.value ? c.value(r) : r[c.key])).join(','))].join('\n')
  const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }))
  const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/** Map of property id -> property (for linked-property display). */
export function usePropertyMap() {
  const [map, setMap] = useState({})
  useEffect(() => {
    let live = true
    db.list('properties', { limit: 500 }).then(({ data }) => live && setMap(Object.fromEntries((data || []).map((p) => [p.id, p])))).catch(() => {})
    return () => { live = false }
  }, [])
  return map
}

export function KV({ label, children }) {
  if (children === undefined || children === null || children === '') return null
  return (
    <div className="grid grid-cols-3 gap-3 py-2.5 border-b border-outline-variant/20 last:border-0">
      <dt className="font-label-caps text-[10.5px] uppercase tracking-[0.14em] text-outline pt-0.5">{label}</dt>
      <dd className="col-span-2 text-[14px] text-on-surface break-words whitespace-pre-wrap">{children}</dd>
    </div>
  )
}

export const SectionTitle = ({ children }) => <h4 className="font-label-caps text-[10.5px] uppercase tracking-[0.16em] text-secondary mt-7 mb-2">{children}</h4>

export function LinkedProperty({ property }) {
  if (!property) return null
  return (
    <a href={`/admin/properties/${property.id}`} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('admin:navigate', { detail: `/admin/properties/${property.id}` })) }}
      className="flex items-center gap-3 p-2 rounded-lg ring-1 ring-outline-variant/40 hover:ring-primary/50 transition">
      {property.cover_image && <img src={property.cover_image} alt="" className="w-14 h-10 object-cover rounded" />}
      <span className="min-w-0"><span className="block text-[14px] truncate">{property.title}</span><span className="block text-[12px] text-on-surface-variant truncate">{[property.neighborhood, property.city].filter(Boolean).join(', ')}</span></span>
    </a>
  )
}

export const mailto = (to, subject, body = '') => `mailto:${to}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`
export const payloadEntries = (p) => Object.entries(p || {}).filter(([k]) => k !== 'admin_notes').map(([k, v]) => [titleCase(k), Array.isArray(v) ? v.join(', ') : typeof v === 'object' && v ? JSON.stringify(v) : String(v)])
