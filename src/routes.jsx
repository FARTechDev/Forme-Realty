import { lazy } from 'react'

const g = (name) => lazy(() => import(`./pages/generated/${name}.jsx`))
const PAGES = import.meta.glob('./pages/*.jsx')
const RENTAL = import.meta.glob('./pages/rental/*.jsx')
const p = (name) => lazy(name.startsWith('rental/') ? RENTAL[`./pages/${name}.jsx`] : PAGES[`./pages/${name}.jsx`])

// [path, component, options]
export const PUBLIC_ROUTES = [
  ['/', p('Home')],
  // properties
  ['/properties', p('Properties')],
  ['/properties/:slug', p('PropertyDetail')],
  ['/residences', p('Residences')],
  ['/rentals', p('Rentals')],
  ['/rentals/:slug', p('RentalDetail')],
  ['/saved', p('Saved')],
  ['/neighborhoods', p('Neighborhoods')],
  ['/new-developments', g('NewDevelopmentsOffPlanPropertiesPage')],
  // services
  ['/buyer-services', g('BuyerServicesPage')],
  ['/seller-services', g('SellerServicesPage')],
  ['/landlord-services', g('LandlordServicesPage')],
  ['/tenant-services', g('TenantServicesPage')],
  ['/property-management', g('PropertyManagementServicesPage')],
  ['/valuation', g('PropertyValuationAssessmentPage')],
  ['/financing', g('MortgageFinancingGuidancePage')],
  ['/relocation', g('RelocationMovingGuidePage')],
  ['/investment-properties', g('InvestmentPropertiesPage')],
  ['/commercial', g('CommercialRealEstatePage')],
  ['/land-development', g('LandDevelopmentOpportunitiesPage')],
  ['/development-advisory', g('PropertyDevelopmentPlanningAdvisoryPage')],
  // company
  ['/our-approach', g('OurApproachPage')],
  ['/our-process', g('OurProcessHowItWorksPage')],
  ['/our-people', p('OurPeople')],
  ['/client-experiences', p('ClientExperiences')],
  ['/journal', p('Journal')],
  ['/journal/:slug', p('JournalPost')],
  ['/press', g('PressMediaPage')],
  ['/careers', g('CareersWorkWithUsPage')],
  ['/faq', g('FrequentlyAskedQuestionsPage')],
  ['/start-a-conversation', g('StartAConversationPage')],
  // viewings
  ['/schedule-viewing', p('ScheduleViewing')],
  ['/schedule-viewing/:slug', p('ScheduleViewing')],
  ['/arrange-viewing', p('ArrangeViewing')],
  ['/arrange-viewing/:slug', p('ArrangeViewing')],
  ['/viewing-confirmation', p('ViewingConfirmation')],
  // rental application
  ['/rental-application', p('rental/Apply')],
  ['/rental-application/review', p('rental/Review')],
  ['/rental-application/confirmation', p('rental/Confirmation')],
  ['/rental-application/status', p('rental/Status')],
  ['/rental-application/documents', p('rental/Documents')],
  ['/rental-application/messages', p('rental/Messages')],
  ['/rental-application/additional-information', p('rental/AdditionalInfo')],
  ['/rental-application/additional-information/confirmation', p('rental/AdditionalInfoConfirmation')],
  ['/rental-application/withdraw', p('rental/Withdraw')],
  ['/rental-application/withdraw/confirmation', p('rental/WithdrawConfirmation')],
  ['/rental-application/viewing-guide', g('RentalApplicationViewingGuidePage')],
  // legal
  ['/privacy-policy', g('PrivacyPolicyPage')],
  ['/terms', g('TermsConditionsPage')],
  ['/cookies', g('CookiePolicyPreferencesPage')],
  ['/accessibility', g('AccessibilityStatementPage')],
  ['/fair-housing', p('FairHousing')],
]
