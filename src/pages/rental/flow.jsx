import { useCallback, useEffect, useState } from 'react'
import { Link } from '../../components/Link'
import { db } from '../../lib/db'
import { useDocumentTitle } from '../../lib/hooks'
import { lab, inp, btn, btn2 } from '../_shared'

const KEY = 'forme.app.session'
export const getSession = () => { try { return JSON.parse(localStorage.getItem(KEY)) } catch { return null } }
export const setSession = (s) => { try { s ? localStorage.setItem(KEY, JSON.stringify(s)) : localStorage.removeItem(KEY) } catch { /* ignore */ } }
export const DRAFT = 'forme.app.draft'
export const getDraft = () => { try { return JSON.parse(sessionStorage.getItem(DRAFT)) } catch { return null } }
export const setDraft = (d) => { try { d ? sessionStorage.setItem(DRAFT, JSON.stringify(d)) : sessionStorage.removeItem(DRAFT) } catch { /* ignore */ } }

export const STATUS = {
  submitted: ['Submitted', 'Your application has been received.'], under_review: ['Under review', 'An advisor is reviewing your application.'],
  info_requested: ['Information requested', 'We need a little more from you to proceed.'], approved: ['Approved', 'Congratulations — your application was approved.'],
  declined: ['Not proceeding', 'Unfortunately we are unable to proceed.'], withdrawn: ['Withdrawn', 'This application was withdrawn.'],
}

/** Loads the signed-in applicant's full application bundle (application, property, messages, documents, requests). */
export function useApplication() {
  const [session, setS] = useState(getSession)
  const [bundle, setBundle] = useState(null)
  const [loading, setLoading] = useState(!!getSession())
  const [error, setError] = useState('')
  const load = useCallback(async (s = getSession()) => {
    if (!s) { setBundle(null); setLoading(false); return null }
    setLoading(true)
    try { const b = await db.trackApplication(s.ref, s.email); if (!b) throw new Error('not found'); setBundle(b); setError(''); return b }
    catch { setError('We could not find that application.'); setBundle(null); return null }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { load() }, [load])
  const signIn = async (ref, email) => { const s = { ref: ref.trim().toUpperCase(), email: email.trim().toLowerCase() }; const b = await db.trackApplication(s.ref, s.email).catch(() => null); if (!b) return false; setSession(s); setS(s); setBundle(b); setError(''); return true }
  const signOut = () => { setSession(null); setS(null); setBundle(null) }
  return { session, bundle, loading, error, reload: load, signIn, signOut }
}

export function Shell({ title, eyebrow = 'Rental Application', intro, children, back = true, wide = false }) {
  useDocumentTitle(title)
  return (
    <main className="w-full pt-20 bg-background min-h-screen"><section className="bg-surface py-space-xl"><div className={`${wide ? 'max-w-5xl' : 'max-w-3xl'} mx-auto px-6 space-y-space-lg`}>
      <div className="space-y-space-sm">
        {back && <Link to="/rental-application/status" className={`${lab} hover:text-primary`}>← Application overview</Link>}
        <span className={`${lab} block`}>{eyebrow}</span>
        <h1 data-hero className="font-display-lg text-headline-lg sm:text-display-lg text-primary tracking-tight font-light leading-[1.08]">{title}</h1>
        {intro && <p className="font-body-lg text-on-surface-variant font-light">{intro}</p>}
      </div>
      {children}
    </div></section></main>
  )
}

/** Wraps pages that need a signed-in application. */
export function Gate({ app, children }) {
  if (app.loading) return <main className="min-h-screen bg-background pt-32" />
  if (!app.bundle) return <Shell title="Find your application" back={false}><div className="space-y-space-md"><p className="text-on-surface-variant">Enter the reference from your confirmation email to continue.</p><Lookup app={app} /></div></Shell>
  return children(app.bundle)
}

export function Lookup({ app, onDone }) {
  const [busy, setBusy] = useState(false); const [err, setErr] = useState('')
  const sub = async (e) => { e.preventDefault(); const f = new FormData(e.currentTarget); setBusy(true); setErr(''); const ok = await app.signIn(f.get('ref'), f.get('email')); setBusy(false); if (!ok) setErr('We could not match that reference and email. Please check and try again.'); else onDone?.() }
  return (
    <form onSubmit={sub} className="bg-surface-container-lowest rounded-xl p-space-lg space-y-space-md shadow-sm">
      <input name="ref" required placeholder="Application reference (e.g. APP-CAD-2026-9412)" className={inp} defaultValue={app.session?.ref || ''} />
      <input name="email" type="email" required placeholder="Email used on the application" className={inp} defaultValue={app.session?.email || ''} />
      {err && <p className="text-error text-[14px]" role="alert">{err}</p>}
      <button disabled={busy} className={`${btn} disabled:opacity-60`}>{busy ? 'Checking…' : 'View my application'}</button>
    </form>
  )
}

export const SubNav = ({ current }) => (
  <nav className="flex flex-wrap gap-2">{[['/rental-application/status', 'Overview'], ['/rental-application/documents', 'Documents'], ['/rental-application/messages', 'Messages'], ['/rental-application/additional-information', 'Clarifications']].map(([to, l]) => <Link key={to} to={to} className={`px-4 py-2 rounded-full font-label-caps text-label-caps uppercase tracking-[0.1em] border transition-colors ${current === to ? 'bg-primary text-on-primary border-primary' : 'border-outline-variant text-on-surface-variant hover:border-primary'}`}>{l}</Link>)}</nav>
)
export { btn, btn2, inp, lab }
