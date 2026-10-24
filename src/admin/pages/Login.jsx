import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { db, IS_DEMO } from '../../lib/db'
import { DEMO_ADMIN } from '../../lib/demo'
import { useAuth } from '../auth'
import { Button, Field, Input } from '../ui'

export default function Login() {
  const { admin, loading } = useAuth()
  const loc = useLocation()
  const [email, setEmail] = useState(IS_DEMO ? DEMO_ADMIN.email : '')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  if (!loading && admin) return <Navigate to={loc.state?.from || '/admin'} replace />

  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setErr('')
    try {
      await db.auth.signIn(email, password)
      if (!(await db.auth.isAdmin())) { await db.auth.signOut(); throw new Error('This account does not have admin access.') }
    } catch (ex) { setErr(ex.message || 'Sign-in failed') } finally { setBusy(false) }
  }

  return (
    <div className="min-h-screen bg-[#151715] flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-md bg-surface-container-lowest rounded-lg p-8 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)] admin-pop">
        <div className="font-headline-sm tracking-[0.18em] uppercase text-primary font-medium">FORME REALTY</div>
        <div className="font-label-caps text-label-caps uppercase tracking-[0.18em] text-secondary mt-1">Admin Portal</div>
        <h1 className="font-headline-md text-headline-md font-light mt-8 mb-6">Sign in</h1>
        <div className="space-y-4">
          <Field label="Email"><Input type="email" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" /></Field>
          <Field label="Password"><Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" /></Field>
        </div>
        {err && <p className="text-error text-[13px] mt-4" role="alert">{err}</p>}
        <Button type="submit" loading={busy} size="lg" className="w-full mt-6">Sign in</Button>
        {IS_DEMO && (
          <p className="text-[12px] text-on-surface-variant mt-5 leading-relaxed">
            <strong>Demo mode</strong> — no Supabase project is connected, so data lives in this browser. Sign in with <code className="bg-surface-container px-1 rounded">{DEMO_ADMIN.email}</code> / <code className="bg-surface-container px-1 rounded">{DEMO_ADMIN.password}</code>.
          </p>
        )}
        <a href="/" className="block text-center text-[12px] text-on-surface-variant hover:text-primary mt-6 uppercase tracking-[0.14em]">← Back to website</a>
      </form>
    </div>
  )
}
