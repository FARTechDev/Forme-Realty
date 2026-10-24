import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from '../components/Link'
import NotFound from './NotFound'
import { db } from '../lib/db'
import { useData, useDocumentTitle } from '../lib/hooks'
import { lab, btn } from './_shared'
import { toast } from '../components/toast'

export default function JournalPost() {
  const { slug } = useParams()
  const { data: post, loading } = useData(() => db.postBySlug(slug), [slug])
  const { data: all = [] } = useData(() => db.publishedPosts(), [], [])
  const [pct, setPct] = useState(0)
  useDocumentTitle(post?.title)
  useEffect(() => {
    const on = () => { const h = document.documentElement; setPct(Math.min(100, (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100)) }
    window.addEventListener('scroll', on, { passive: true }); return () => window.removeEventListener('scroll', on)
  }, [])
  if (loading) return <main className="min-h-screen bg-background" />
  if (!post || post.published === false) return <NotFound />
  const paras = Array.isArray(post.body) ? post.body : String(post.body || '').split(/\n\n+/)
  const more = (all || []).filter((p) => p.id !== post.id).slice(0, 3)
  return (
    <main className="w-full pt-20 bg-background min-h-screen">
      <div className="fixed top-0 left-0 h-[3px] bg-secondary z-[90]" style={{ width: `${pct}%` }} />
      <article className="bg-surface">
        <header className="max-w-3xl mx-auto px-6 pt-space-xl pb-space-lg space-y-space-sm">
          <Link to="/journal" className={`${lab} hover:text-primary`}>← The Journal</Link>
          <span className={`${lab} block`}>{post.category} · {post.read_time} min read</span>
          <h1 data-hero className="font-display-lg text-display-lg text-primary tracking-tight font-light leading-[1.08]">{post.title}</h1>
          <p className="font-body-lg text-on-surface-variant font-light">{post.excerpt}</p>
          <p className="font-body-sm text-on-surface-variant">By {post.author} · {new Date(post.published_at).toLocaleDateString('en-GB', { dateStyle: 'long' })}</p>
        </header>
        {post.cover_image && <div className="max-w-6xl mx-auto px-6"><div className="aspect-[16/8] rounded-xl overflow-hidden bg-surface-container"><img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" /></div></div>}
        <div className="max-w-2xl mx-auto px-6 py-space-xl space-y-space-md font-body-lg text-body-lg text-on-surface font-light leading-[1.8]">
          {paras.map((t, i) => <p key={i} className={i === 0 ? 'first-letter:font-display-lg first-letter:text-[3.4rem] first-letter:float-left first-letter:mr-3 first-letter:leading-[0.9] first-letter:text-secondary' : ''}>{t}</p>)}
          <div className="flex flex-wrap gap-space-sm pt-space-md">
            <button type="button" className={btn} onClick={() => { navigator.clipboard?.writeText(location.href); toast('Link copied') }}>Share article</button>
            <Link to="/start-a-conversation" className="font-label-caps text-label-caps uppercase tracking-[0.14em] text-primary py-3 underline underline-offset-4">Talk to an advisor</Link>
          </div>
        </div>
      </article>
      {more.length > 0 && (
        <section className="bg-surface-container-low py-space-xl"><div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop space-y-space-lg">
          <h2 className="font-headline-lg text-headline-lg text-primary font-light">Continue reading</h2>
          <div className="grid md:grid-cols-3 gap-gutter-desktop">{more.map((p) => <Link key={p.id} to={`/journal/${p.slug}`} className="group space-y-space-sm"><div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface-container"><img src={p.cover_image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div><h3 className="font-headline-sm text-headline-sm text-primary">{p.title}</h3></Link>)}</div>
        </div></section>
      )}
    </main>
  )
}
