import { Link } from 'react-router-dom'

/** Simple CSS/SVG bar chart: [{ day:'YYYY-MM-DD', n }] */
export function InquiryChart({ series }) {
  const max = Math.max(1, ...series.map((s) => s.n))
  const total = series.reduce((a, s) => a + s.n, 0)
  const H = 150, W = 560, bw = W / series.length
  const ticks = [0, Math.ceil(max / 2), max].filter((v, i, a) => a.indexOf(v) === i)
  return (
    <div>
      <div className="text-[12px] text-on-surface-variant mb-3"><span className="text-[26px] font-light text-on-surface tabular-nums mr-2">{total}</span>inquiries in the last 14 days</div>
      <svg viewBox={`0 0 ${W + 28} ${H + 24}`} className="w-full h-auto" role="img" aria-label="Inquiries per day, last 14 days">
        {ticks.map((t) => {
          const y = H - (t / max) * H
          return <g key={t}><line x1="24" x2={W + 28} y1={y} y2={y} stroke="#c5c7c2" strokeOpacity=".4" /><text x="0" y={y + 4} fontSize="10" fill="#757873">{t}</text></g>
        })}
        {series.map((s, i) => {
          const h = (s.n / max) * H
          return (
            <g key={s.day} transform={`translate(${28 + i * (bw - 0.5)},0)`}>
              <title>{`${s.day}: ${s.n}`}</title>
              <rect x="3" y={H - h} width={Math.max(2, bw - 8)} height={h} rx="1.5" fill="#576155" opacity={s.n ? 1 : 0.15} />
              {s.n === 0 && <rect x="3" y={H - 2} width={Math.max(2, bw - 8)} height="2" fill="#c5c7c2" />}
              <text x={bw / 2} y={H + 15} fontSize="9.5" textAnchor="middle" fill="#757873">{s.day.slice(8)}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export function TopViewed({ rows }) {
  const max = Math.max(1, ...rows.map((r) => r.views || 0))
  if (!rows.length) return <div className="px-5 py-8 text-center text-[13px] text-on-surface-variant">No data.</div>
  return (
    <ol>
      {rows.map((p, i) => (
        <li key={p.id} className="border-b border-outline-variant/20 last:border-0">
          <Link to={`/admin/properties/${p.id}`} className="block px-5 py-3 hover:bg-surface-container-low transition-colors">
            <div className="flex justify-between gap-3 text-[13px]"><span className="truncate text-on-surface"><span className="text-outline mr-2 tabular-nums">{i + 1}</span>{p.title}</span><span className="tabular-nums text-on-surface-variant">{p.views || 0}</span></div>
            <div className="h-1 rounded-full bg-surface-container mt-2"><div className="h-1 rounded-full bg-secondary" style={{ width: `${((p.views || 0) / max) * 100}%` }} /></div>
          </Link>
        </li>
      ))}
    </ol>
  )
}
