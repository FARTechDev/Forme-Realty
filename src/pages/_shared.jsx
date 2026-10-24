import { Link } from '../components/Link'
export const lab = 'font-label-caps text-label-caps uppercase tracking-[0.14em] text-secondary'
export const inp = 'w-full bg-surface-container-low border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 px-0 py-3 font-body-md text-body-md outline-none transition-colors'
export const btn = 'cta inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-primary-container text-on-primary font-label-caps text-label-caps uppercase tracking-[0.14em]'
export const btn2 = 'inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg border border-primary text-primary font-label-caps text-label-caps uppercase tracking-[0.14em] hover:bg-primary hover:text-on-primary transition-colors'
export function PageHead({ eyebrow, title, intro, children }) {
  return (
    <section className="w-full bg-surface pt-space-xl pb-space-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop flex flex-col lg:flex-row lg:items-end justify-between gap-gutter-desktop">
        <div className="lg:w-7/12 space-y-space-sm">
          <div className="flex items-center gap-space-sm"><span className="inline-block w-2 h-2 rounded-full bg-secondary" /><span className={lab}>{eyebrow}</span></div>
          <h1 data-hero className="font-display-lg text-display-lg text-primary tracking-tight font-light leading-[1.08]">{title}</h1>
        </div>
        <div className="lg:w-4/12 space-y-space-md"><p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">{intro}</p>{children}</div>
      </div>
    </section>
  )
}
export const Empty = ({ title, text, to = '/properties', cta = 'Browse residences' }) => (
  <div className="text-center py-space-xl space-y-space-md"><p className="font-headline-sm text-headline-sm text-primary">{title}</p><p className="font-body-md text-on-surface-variant font-light">{text}</p><Link to={to} className={btn}>{cta}</Link></div>
)
