// Site map used by the header menu overlay and footer.
export const PRIMARY_NAV = [
  { to: '/properties', label: 'Properties' },
  { to: '/residences', label: 'Residences' },
  { to: '/neighborhoods', label: 'Neighborhoods' },
  { to: '/our-approach', label: 'Our Approach' },
]

export const MENU_GROUPS = [
  { title: 'Properties', links: [
    { to: '/properties', label: 'Curated Properties' }, { to: '/residences', label: 'Property Search' }, { to: '/rentals', label: 'Rentals' },
    { to: '/saved', label: 'Saved Shortlist' }, { to: '/neighborhoods', label: 'Neighborhoods' }, { to: '/new-developments', label: 'New Developments' },
  ] },
  { title: 'Services', links: [
    { to: '/buyer-services', label: 'Buyer Services' }, { to: '/seller-services', label: 'Seller Services' }, { to: '/landlord-services', label: 'Landlord Services' },
    { to: '/tenant-services', label: 'Tenant Services' }, { to: '/property-management', label: 'Property Management' }, { to: '/valuation', label: 'Valuation & Assessment' },
    { to: '/financing', label: 'Financing Guidance' }, { to: '/relocation', label: 'Relocation & Moving' }, { to: '/investment-properties', label: 'Investment Properties' },
    { to: '/commercial', label: 'Commercial Real Estate' }, { to: '/land-development', label: 'Land & Development' }, { to: '/development-advisory', label: 'Development Advisory' },
  ] },
  { title: 'Company', links: [
    { to: '/our-approach', label: 'Our Approach' }, { to: '/our-process', label: 'Our Process' }, { to: '/our-people', label: 'Our People' },
    { to: '/client-experiences', label: 'Client Experiences' }, { to: '/journal', label: 'Journal' }, { to: '/press', label: 'Press & Media' },
    { to: '/careers', label: 'Careers' }, { to: '/faq', label: 'FAQs' },
  ] },
  { title: 'Clients', links: [
    { to: '/schedule-viewing', label: 'Schedule a Viewing' }, { to: '/arrange-viewing', label: 'Arrange a Private Viewing' }, { to: '/rental-application', label: 'Rental Application' },
    { to: '/rental-application/status', label: 'Application Status' }, { to: '/rental-application/viewing-guide', label: 'Viewing Guide' }, { to: '/start-a-conversation', label: 'Start a Conversation' },
  ] },
  { title: 'Legal', links: [
    { to: '/privacy-policy', label: 'Privacy Policy' }, { to: '/terms', label: 'Terms & Conditions' }, { to: '/cookies', label: 'Cookie Preferences' },
    { to: '/accessibility', label: 'Accessibility' }, { to: '/fair-housing', label: 'Fair Housing' },
  ] },
]
