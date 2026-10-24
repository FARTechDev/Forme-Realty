import { useEffect, useState } from 'react'

export default function Toaster() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const on = (e) => {
      const id = Math.random()
      setItems((l) => [...l, { id, ...e.detail }])
      setTimeout(() => setItems((l) => l.filter((x) => x.id !== id)), 4200)
    }
    window.addEventListener('forme:toast', on)
    return () => window.removeEventListener('forme:toast', on)
  }, [])
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex flex-col gap-2 items-center pointer-events-none" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className={`toast-in px-5 py-3 rounded-lg shadow-lg font-label-md text-label-md tracking-wide flex items-center gap-2 pointer-events-auto ${t.type === 'error' ? 'bg-error text-on-error' : 'bg-primary-container text-surface-bright'}`}>
          <span className="material-symbols-outlined text-[18px]">{t.type === 'error' ? 'error' : 'check_circle'}</span>
          {t.message}
        </div>
      ))}
    </div>
  )
}
