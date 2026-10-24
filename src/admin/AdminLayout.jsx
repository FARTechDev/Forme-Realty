import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { db, IS_DEMO } from '../lib/db'
import { useAuth } from './auth'
import { ConfirmProvider, cx } from './ui'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/admin/properties', label: 'Properties', icon: 'home_work' },
  { to: '/admin/inquiries', label: 'Inquiries', icon: 'mail', badge: 'newInquiries' },
  { to: '/admin/viewings', label: 'Viewings', icon: 'event', badge: 'pendingViewings' },
  { to: '/admin/applications', label: 'Rental Applications', icon: 'description', badge: null },
  { to: '/admin/valuations', label: 'Valuations', icon: 'request_quote', badge: 'newValuations' },
  { sep: 'Content' },
  { to: '/admin/journal', label: 'Journal', icon: 'article' },
  { to: '/admin/neighborhoods', label: 'Neighborhoods', icon: 'location_city' },
  { to: '/admin/testimonials', label: 'Testimonials', icon: 'format_quote' },
  { to: '/admin/team', label: 'Team', icon: 'groups' },
  { sep: 'Audience' },
  { to: '/admin/subscribers', label: 'Subscribers', icon: 'campaign' },
  { to: '/admin/settings', label: 'Settings', icon: 'settings' },
]

export default function AdminLayout() {
  const { session, signOut } = useAuth()
  const [stats, setStats] = useState({})
  const [open, setOpen] = useState(false)
  const nav = useNavigate()

  useEffect(() => {
    let live = true
    const load = () => db.stats().then((s) => live && setStats(s)).catch(() => {})
    load()
    const t = setInterval(load, 30000)
    const on = (e) => nav(e.detail)
    window.addEventListener('admin:navigate', on)
    window.addEventListener('admin:refresh-stats', load)
    return () => { live = false; clearInterval(t); window.removeEventListener('admin:navigate', on); window.removeEventListener('admin:refresh-stats', load) }
  }, [nav])

  return (
    <ConfirmProvider>
      <div className="min-h-screen bg-surface flex admin-root">
        {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}
        <aside className={cx('fixed lg:sticky top-0 h-screen w-64 shrink-0 bg-[#151715] text-surface-bright flex flex-col z-40 transition-transform', open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')}>
          <div className="px-6 h-20 flex flex-col justify-center border-b border-white/10">
            <span className="font-headline-sm tracking-[0.18em] uppercase font-medium text-[15px]">FORME REALTY</span>
            <span className="font-label-caps text-[10px] uppercase tracking-[0.2em] text-on-primary-container">Admin Portal</span>
          </div>
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
            {NAV.map((n, i) => n.sep ? (
              <div key={i} className="px-3 pt-5 pb-2 font-label-caps text-[10px] uppercase tracking-[0.2em] text-on-primary-container">{n.sep}</div>
            ) : (
              <NavLink key={n.to} to={n.to} end={n.end} onClick={() => setOpen(false)}
                className={({ isActive }) => cx('flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] transition-colors', isActive ? 'bg-white/10 text-white' : 'text-white/65 hover:text-white hover:bg-white/5')}>
                <span className="material-symbols-outlined text-[20px]">{n.icon}</span>
                <span className="flex-1">{n.label}</span>
                {n.badge && stats[n.badge] > 0 && <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-secondary text-on-secondary text-[11px] leading-5 text-center font-semibold">{stats[n.badge]}</span>}
              </NavLink>
            ))}
          </nav>
          <div className="p-4 border-t border-white/10 text-[12px]">
            <div className="text-white/80 truncate">{session?.user?.email}</div>
            <div className="flex gap-4 mt-2">
              <a href="/" target="_blank" rel="noreferrer" className="text-on-primary-container hover:text-white uppercase tracking-[0.12em] text-[10.5px]">View site ↗</a>
              <button onClick={signOut} className="text-on-primary-container hover:text-white uppercase tracking-[0.12em] text-[10.5px]">Sign out</button>
            </div>
          </div>
        </aside>
        <div className="flex-1 min-w-0 flex flex-col">
          {IS_DEMO && (
            <div className="bg-secondary-container text-on-secondary-container text-[12px] px-6 py-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">science</span>
              Demo mode — changes are saved in this browser only. Add your Supabase keys to <code className="bg-white/50 px-1 rounded">.env</code> to go live.
            </div>
          )}
          <header className="lg:hidden h-14 bg-surface border-b border-outline-variant/40 flex items-center px-4 gap-3 sticky top-0 z-20">
            <button onClick={() => setOpen(true)} aria-label="Open menu" className="material-symbols-outlined">menu</button>
            <span className="font-headline-sm tracking-[0.16em] uppercase text-[14px]">FORME REALTY</span>
          </header>
          <main className="flex-1 p-5 md:p-8 lg:p-10 max-w-[1400px] w-full mx-auto"><Outlet /></main>
        </div>
      </div>
    </ConfirmProvider>
  )
}
