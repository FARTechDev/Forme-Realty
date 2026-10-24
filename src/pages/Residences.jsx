import Listing from './Listing'
export default function Residences() {
  return <Listing mode="all" advanced eyebrow="Property Search" title={<>Search every residence,<br className="hidden sm:inline" /> sale and rent.</>}
    intro="Refine by place, architecture, size and the details that matter — then shortlist what moves you and compare side by side."
    heading="Matching Residences" headingIntro="Filters are saved in the address bar, so any search can be shared with a single link." />
}
