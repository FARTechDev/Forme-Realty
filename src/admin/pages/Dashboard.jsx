import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth'
import { Badge, Button, Card, PageHeader, StatCard, StatusBadge, fmtDate, timeAgo, titleCase, useAdminList } from '../ui'
import { useData } from '../../lib/hooks'
import { db } from '../../lib/db'

function Bars({ data }) {
  const max = Math.max(1, ...data.map((d) => d.n))
  return (
    <div className="flex items-end gap-1.5 h-40">
      {data.map((d) => (
        <div key={d.day} className="flex-1 h-full justify-end flex flex-col items-center gap-1 group">
          <span className="text-[10px] text-on-surface-variant opacity-0 group-hover:opacity-100">{d.n}</span>
          <div className="w-full rounded-t bg-secondary/70 group-hover:bg-secondary transition-all" style={{ height: `${Math.max(3, (d.n / max) * 100)}%` }} title={`${d.day}: ${d.n}`} />
          <span className="text-[10px] text-outline">{d.day.slice(8)}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { session } = useAuth()
  const { data: stats } = useData(() => db.stats(), [])
  const inq = useAdminList('inquiries', { order: { col: 'created_at', asc: false }, limit: 200 })
  const vw = useAdminList('viewing_requests', { order: { col: 'preferred_date', asc: true }, limit: 100 })
  const apps = useAdminList('rental_applications', { order: { col: 'created_at', asc: false }, limit: 5 })
  const props = useAdminList('properties', { order: { col: 'views', asc: false }, limit: 100 })

  const series = useMemo(() => {
    const days = Array.from({ length: 14 }, (_, i) => new Date(Date.now() - (13 - i) * 864e5).toISOString().slice(0, 10))
    return days.map((day) => ({ day, n: inq.rows.filter((r) => (r.created_at || '').slice(0, 10) === day).length }))
  }, [inq.rows])
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = vw.rows.filter((v) => v.preferred_date >= today && ['pending', 'confirmed', 'rescheduled'].includes(v.status)).slice(0, 5)
  const propName = Object.fromEntries(props.rows.map((p) => [p.id, p.title]))
  const latest = [...props.rows].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4)

  return (
    <>
      <PageHeader title={`Welcome back${session?.user?.name ? ', ' + session.user.name.split(' ')[0] : ''}`} subtitle="Here is what needs your attention today."
        actions={<><Button as={Link} to="/admin/properties/new" icon="add">Add property</Button><Button as={Link} to="/admin/inquiries" variant="secondary" icon="mail">Inbox</Button></>} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Live listings" value={stats && stats.sale + stats.rent} hint={stats && `${stats.sale} sale · ${stats.rent} rent · ${stats.drafts} drafts`} icon="home_work" to="/admin/properties" />
        <StatCard label="New inquiries" value={stats?.newInquiries} hint={stats && `${stats.inquiries} in total`} icon="mail" to="/admin/inquiries" />
        <StatCard label="Pending viewings" value={stats?.pendingViewings} hint="Awaiting confirmation" icon="event" to="/admin/viewings" />
        <StatCard label="Applications" value={stats?.applications} hint={stats && `${stats.newValuations} new valuations · ${stats.subscribers} subscribers`} icon="description" to="/admin/applications" />
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card title="Inquiries — last 14 days" className="lg:col-span-2"><Bars data={series} /></Card>
        <Card title="Most viewed" padded={false}>
          <ul className="divide-y divide-outline-variant/20">{props.rows.slice(0, 5).map((p) => <li key={p.id}><Link to={`/admin/properties/${p.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-surface-container-low"><img src={p.cover_image} alt="" className="w-12 h-9 rounded object-cover" /><span className="flex-1 text-[14px] truncate">{p.title.split(' — ')[0]}</span><span className="text-[13px] tabular-nums text-on-surface-variant">{p.views || 0}</span></Link></li>)}</ul>
        </Card>
        <Card title="Recent inquiries" padded={false} actions={<Link to="/admin/inquiries" className="text-[12px] underline">View all</Link>}>
          <ul className="divide-y divide-outline-variant/20">{inq.rows.slice(0, 5).map((r) => <li key={r.id} className="px-5 py-3 flex items-center gap-3"><div className="flex-1 min-w-0"><div className="text-[14px] truncate">{r.name} <span className="text-on-surface-variant">· {r.subject || titleCase(r.type)}</span></div><div className="text-[12px] text-on-surface-variant">{timeAgo(r.created_at)}</div></div><StatusBadge status={r.status} /></li>)}</ul>
        </Card>
        <Card title="Upcoming viewings" padded={false} actions={<Link to="/admin/viewings" className="text-[12px] underline">View all</Link>}>
          <ul className="divide-y divide-outline-variant/20">{upcoming.length === 0 && <li className="px-5 py-6 text-[14px] text-on-surface-variant">Nothing scheduled.</li>}{upcoming.map((v) => <li key={v.id} className="px-5 py-3 flex items-center gap-3"><div className="flex-1 min-w-0"><div className="text-[14px] truncate">{propName[v.property_id] || 'Viewing'}</div><div className="text-[12px] text-on-surface-variant">{fmtDate(v.preferred_date)} · {v.preferred_time} · {v.name}</div></div><StatusBadge status={v.status} /></li>)}</ul>
        </Card>
        <Card title="Rental applications" padded={false} actions={<Link to="/admin/applications" className="text-[12px] underline">View all</Link>}>
          <ul className="divide-y divide-outline-variant/20">{apps.rows.map((a) => <li key={a.id}><Link to={`/admin/applications/${a.id}`} className="px-5 py-3 flex items-center gap-3 hover:bg-surface-container-low"><div className="flex-1 min-w-0"><div className="text-[14px] truncate">{a.applicant_name}</div><div className="text-[12px] text-on-surface-variant truncate">{a.property_title}</div></div><StatusBadge status={a.status} /></Link></li>)}</ul>
        </Card>
        <Card title="Latest listings" className="lg:col-span-3" padded={false}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">{latest.map((p) => <Link key={p.id} to={`/admin/properties/${p.id}`} className="group"><div className="aspect-[4/3] rounded-lg overflow-hidden bg-surface-container"><img src={p.cover_image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div><div className="mt-2 text-[14px] font-medium truncate">{p.title.split(' — ')[0]}</div><div className="flex gap-2 mt-1"><Badge tone={p.published ? 'green' : 'neutral'}>{p.published ? 'Live' : 'Draft'}</Badge><Badge>{p.listing_type}</Badge></div></Link>)}</div>
        </Card>
      </div>
    </>
  )
}
