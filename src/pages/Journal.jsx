import { useState } from 'react'
import { Link } from '../components/Link'
import { db } from '../lib/db'
import { useData, useDocumentTitle } from '../lib/hooks'
import { PageHead, lab } from './_shared'

export default function Journal() {
  useDocumentTitle('Journal')
  const { data: posts = [], loading } = useData(() => db.publishedPosts(), [], [])
  const [cat, setCat] = useState('All')
  const cats = ['All', ...new Set(posts.map((p) => p.category))]
  const list = posts.filter((p) => cat === 'All' || p.category === cat)
  const [lead, ...rest] = list
  const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <main className="w-full pt-20 bg-background min-h-screen">
      <PageHead eyebrow="The Journal" title={<>Perspectives on<br className="hidden sm:inline" /> architecture and living.</>} intro="Considered writing on homes, places and the decisions that shape them." />
      <section className="w-full bg-surface pb-space-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop space-y-space-lg">
          <div className="flex flex-wrap gap-2">{cats.map((c) => <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full font-label-caps text-label-caps uppercase tracking-[0.1em] border transition-colors ${cat === c ? 'bg-primary text-on-primary border-primary' : 'border-outline-variant text-on-surface-variant hover:border-primary'}`}>{c}</button>)}</div>
          {!loading && !lead && <p className="py-space-xl text-center text-on-surface-variant">No articles in this category yet.</p>}
          {lead && (
            <Link to={`/journal/${lead.slug}`} data-cursor="Read" className="group grid lg:grid-cols-12 gap-gutter-desktop items-center">
              <div className="lg:col-span-7 aspect-[16/10] overflow-hidden rounded-xl bg-surface-container"><img src={lead.cover_image} alt={lead.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <div className="lg:col-span-5 space-y-space-sm"><span className={lab}>{lead.category} · {lead.read_time} min read</span><h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-light">{lead.title}</h2><p className="font-body-md text-on-surface-variant font-light">{lead.excerpt}</p><span className="font-label-caps text-label-caps uppercase text-primary tracking-[0.14em] group-hover:text-secondary">Read article →</span></div>
            </Link>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop pt-space-lg">
            {rest.map((p) => (
              <Link key={p.id} to={`/journal/${p.slug}`} data-cursor="Read" className="group flex flex-col gap-space-sm">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface-container"><img src={p.cover_image} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                <span className={lab}>{p.category} · {fmt(p.published_at)}</span>
                <h3 className="font-headline-sm text-headline-sm text-primary tracking-tight group-hover:text-secondary transition-colors">{p.title}</h3>
                <p className="font-body-sm text-on-surface-variant font-light">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
