import { Link } from '../components/Link'
import { db } from '../lib/db'
import { useData, useDocumentTitle } from '../lib/hooks'
import { PageHead, lab } from './_shared'
export default function Neighborhoods() {
  useDocumentTitle('Neighborhoods')
  const { data: list = [] } = useData(() => db.neighborhoods(), [], [])
  return (
    <main className="w-full pt-20 bg-background min-h-screen">
      <PageHead eyebrow="Neighborhoods" title={<>Know the place<br className="hidden sm:inline" /> before the house.</>} intro="Streetscapes, landscapes and local character — the setting is half of every home." />
      <section className="w-full bg-surface pb-space-xl"><div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop grid md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
        {list.map((n) => (
          <Link key={n.id} to={`/residences?city=${encodeURIComponent(n.city.split(',')[0])}`} data-cursor="Explore" className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-surface-container block">
            <img src={n.image} alt={n.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
            <div className="absolute bottom-0 p-space-lg text-on-primary space-y-2">
              <span className={`${lab} !text-on-primary/80`}>{n.city} · {n.tagline}</span>
              <h3 className="font-headline-md text-headline-md">{n.name}</h3>
              <p className="font-body-sm font-light opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500">{n.description}</p>
            </div>
          </Link>
        ))}
      </div></section>
    </main>
  )
}
