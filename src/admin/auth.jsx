import { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../lib/db'

const Ctx = createContext({ session: null, admin: false, loading: true, signOut: () => {} })
export const useAuth = () => useContext(Ctx)

export function AuthProvider({ children }) {
  const [state, setState] = useState({ session: null, admin: false, loading: true })
  useEffect(() => {
    let live = true
    const sync = async (session) => {
      const admin = session ? await db.auth.isAdmin().catch(() => false) : false
      if (live) setState({ session, admin, loading: false })
    }
    db.auth.getSession().then(sync)
    const off = db.auth.onChange(sync)
    return () => { live = false; off() }
  }, [])
  return <Ctx.Provider value={{ ...state, signOut: () => db.auth.signOut() }}>{children}</Ctx.Provider>
}
