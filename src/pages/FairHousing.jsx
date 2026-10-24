import { Link } from '../components/Link'

export default function FairHousing() {
  return (
    <main className="w-full pt-20 bg-surface min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-margin-desktop py-24">
        <span className="font-label-caps text-label-caps uppercase tracking-[0.2em] text-secondary block mb-4">Legal</span>
        <h1 className="font-display-lg text-display-lg font-light text-on-surface">Fair Housing Statement</h1>
        <div className="mt-10 space-y-6 font-body-lg text-body-lg text-on-surface-variant font-light leading-[1.8]">
          <p>FORME Realty is committed to the principles of equal housing opportunity. We market, show, sell and lease every residence in accordance with applicable fair housing legislation, without discrimination on the basis of race, colour, religion, sex, disability, familial status, national origin or any other protected characteristic.</p>
          <p>Our advisors are trained to apply the same standards of service to every client, and to respond to every enquiry with the same care and discretion. If you believe you have experienced discrimination in connection with a property we represent, please contact us in confidence at <a className="underline underline-offset-4" href="mailto:concierge@formerealty.com">concierge@formerealty.com</a>.</p>
          <p>Licensing and regulatory information is available on request. FORME Realty operates as a licensed real estate brokerage in each jurisdiction in which it represents clients.</p>
        </div>
        <Link to="/accessibility" className="inline-flex mt-12 items-center gap-2 font-label-caps text-label-caps uppercase tracking-[0.16em] text-primary border-b border-primary/40 pb-1 hover:text-secondary hover:border-secondary transition-colors">Accessibility statement <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
      </div>
    </main>
  )
}
