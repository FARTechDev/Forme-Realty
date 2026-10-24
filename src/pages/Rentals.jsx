import Listing from './Listing'
export default function Rentals() {
  return <Listing mode="rent" eyebrow="Rentals" title={<>Homes to live in,<br className="hidden sm:inline" /> beautifully let.</>}
    intro="Architect-designed residences available for considered tenancies, with a clear application process from first viewing to keys."
    heading="Available Homes" headingIntro="Apply online, upload your documents and follow your application's progress at any time." />
}
