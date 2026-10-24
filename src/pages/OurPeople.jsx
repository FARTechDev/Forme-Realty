import { db } from '../lib/db'
import { useData, useDocumentTitle } from '../lib/hooks'
import { PageHead, lab } from './_shared'
import { Link } from '../components/Link'
export default function OurPeople() {
  useDocumentTitle('Our People')
  const { data: list = [] } = useData(() => db.team(), [], [])
  return (
    <main className="w-full pt-20 bg-background min-h-screen">
      <PageHead eyebrow="Our People" title={<>Advisors who<br className="hidden sm:inline" /> listen first.</>} intro="A small, senior team with backgrounds in architecture, finance and design.">
        <Link to="/careers" className={`${lab} hover:text-primary`}>Join the team →</Link>
      </PageHead>
      <section className="w-full bg-surface pb-space-xl"><div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop grid sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
        {list.map((m) => (
          <div key={m.id} className="space-y-space-sm group">
            <div className="aspect-[3/4] overflow-hidden rounded-xl bg-surface-container"><img src={m.image} alt={m.name} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" /></div>
            <h3 className="font-headline-sm text-headline-sm text-primary">{m.name}</h3><div className={lab}>{m.role}</div>
            <p className="font-body-sm text-on-surface-variant font-light">{m.bio}</p>
          </div>
        ))}
      </div></section>
    </main>
  )
}
