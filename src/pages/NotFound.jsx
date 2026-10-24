import { Link } from '../components/Link'

export default function NotFound() {
  return (
    <main className="w-full pt-20 min-h-screen bg-surface flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-margin-desktop py-28">
        <span className="font-label-caps text-label-caps uppercase tracking-[0.2em] text-secondary block mb-4">Error 404</span>
        <h1 className="font-display-xl text-display-xl font-light text-on-surface">This page could not be found.</h1>
        <p className="font-body-lg text-body-lg text-secondary mt-6 max-w-xl">The address may have changed, or the residence may no longer be on the market.</p>
        <Link to="/" className="cta inline-flex mt-10 items-center justify-center px-8 py-3.5 rounded-full bg-primary-container text-surface-bright font-label-md text-label-md tracking-wider hover:bg-secondary transition-all duration-300">Return Home</Link>
      </div>
    </main>
  )
}
