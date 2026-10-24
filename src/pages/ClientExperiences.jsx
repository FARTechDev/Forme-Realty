import { Link } from '../components/Link'
import { db } from '../lib/db'
import { useData, useDocumentTitle } from '../lib/hooks'
import { PageHead, lab, btn } from './_shared'
export default function ClientExperiences() {
  useDocumentTitle('Client Experiences')
  const { data: list = [] } = useData(() => db.testimonials(), [], [])
  return (
    <main className="w-full pt-20 bg-background min-h-screen">
      <PageHead eyebrow="Client Experiences" title={<>In their<br className="hidden sm:inline" /> own words.</>} intro="Quiet, considered service is best described by the people we have worked with." />
      <section className="w-full bg-surface pb-space-xl"><div className="max-w-6xl mx-auto px-6 lg:px-margin-desktop space-y-space-xl">
        {list.map((t, i) => (
          <figure key={t.id} className={`grid md:grid-cols-12 gap-gutter-desktop items-center ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
            <div className="md:col-span-5 aspect-[4/5] overflow-hidden rounded-xl bg-surface-container"><img src={t.image} alt={t.client_name} loading="lazy" className="w-full h-full object-cover" /></div>
            <div className="md:col-span-7 space-y-space-md"><span className="material-symbols-outlined text-secondary text-[40px]">format_quote</span>
              <blockquote className="font-headline-md text-headline-md text-primary font-light leading-snug">{t.quote}</blockquote>
              <figcaption className="space-y-1"><div className="font-body-md text-primary font-medium">{t.client_name}</div><div className={lab}>{t.context} · {t.ref}</div></figcaption></div>
          </figure>
        ))}
        <div className="text-center pt-space-lg"><Link to="/start-a-conversation" className={btn}>Begin your own conversation</Link></div>
      </div></section>
    </main>
  )
}
