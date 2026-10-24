// Demo-mode seed data. Mirrors supabase/seed.sql so the site looks identical with or without a backend.
import { IMAGES as I } from './images'

const L = I.properties_listing
const S = I.property_search_advanced_filters
const C = I.the_courtyard_residence
const R = I.rental_listings_available_homes
const RD = I.rental_property_detail
const J = I.journal_insights
const N = I.neighborhoods
const PPL = I.our_people

const d = (daysAgo, h = 10) => new Date(Date.now() - daysAgo * 864e5 - h * 36e5).toISOString()
const gal = (arr, caps = []) => arr.map((url, i) => ({ url, caption: caps[i] || '' }))
const FEATURES = ['Garden or Courtyard', 'Secure Parking / Garage', 'Outdoor Space / Pavilion', 'Home Study or Atelier', 'Balcony or Terrace', 'Recently Renovated / Restored']

const base = (o) => ({
  subtitle: '', description: '', property_type: 'residence', status: 'available', badge: '', featured: false, published: true,
  price: null, price_label: 'Price on Request', currency: 'USD', rent_pcm: null, region: '', country: 'United States', neighborhood: '',
  address: '', latitude: null, longitude: null, bedrooms: 0, bathrooms: 0, area_sqft: null, area_sqm: null, lot_size: '',
  year_built: null, architect: '', materials: '', parking: '', features: [], gallery: [], floor_plan_url: '', specs: [],
  available_from: null, lease_term: '', furnished: false, views: 0, created_at: d(30), updated_at: d(5), ...o,
})

export const properties = [
  base({
    id: 'p-courtyard', slug: 'the-courtyard-residence', title: 'The Courtyard Residence', listing_type: 'sale', featured: true, badge: 'Private Portfolio · Available',
    summary: 'Contemporary central courtyard design with extensive acoustic glazing and tactile cedar panels.',
    subtitle: 'A contemporary retreat shaped by natural light, thoughtful materials, and a seamless connection to the outdoors.',
    description: 'Organized around a tranquil central cloister, the residence presents an introverted sanctuary from the street while opening fully toward interior courtyards and private southern landscape vantages.\n\nThe Courtyard Residence brings architecture and landscape into close conversation. Expansive glazing welcomes natural light throughout the day, while carefully selected materials create a warm, understated atmosphere.\n\nConstructed of rough-cut local limestone, blackened structural steel, and reclaimed vertical cedar siding, the pavilion-style wings celebrate both permanence and lightness.',
    city: 'Austin', region: 'Texas', neighborhood: 'West Lake Hills', address: 'West Lake Hills, Austin, TX', latitude: 30.2974, longitude: -97.8097,
    bedrooms: 4, bathrooms: 4.5, area_sqft: 3850, area_sqm: 358, lot_size: '0.82 acres', year_built: 2023, architect: 'Alterstudio Architecture',
    materials: 'Texas Cordova Cream limestone, blackened steel, reclaimed cedar', parking: '3-car climate garage',
    features: [FEATURES[0], FEATURES[1], FEATURES[2], FEATURES[3]], cover_image: L[1],
    gallery: gal([C[0], C[1], C[2], C[3], C[4], C[5], C[6], C[7]], ['South Elevation & Courtyard Water Basin', 'Breezeway & Hand-Hewn Stone', 'Reflecting Plunge Pool & Loggia', 'The Great Room', 'Kitchen & Dining Gallery', 'Primary Suite & Bath', 'Material study', 'Landscape']),
    specs: [
      { label: 'Accommodations', value: '4 En-Suite Suites' }, { label: 'Baths & Powder', value: '4 Full Baths · 1 Powder' },
      { label: 'Conditioned Area', value: '3,850 Square Feet' }, { label: 'Architectural Typology', value: 'Modern Courtyard Pavilion' },
      { label: 'Parcel & Grounds', value: '0.82 Curated Acres' }, { label: 'Vehicular Gallery', value: '3-Car Climate Garage' },
      { label: 'Primary Stone', value: 'Texas Cordova Cream' }, { label: 'Fenestration', value: 'Brombal Thermally Broken Steel' },
      { label: 'Ceiling Finish', value: 'Clear Douglas Fir Tongue-and-Groove' }, { label: 'Climate Control', value: 'Concealed Variable-Refrigerant HVAC' },
    ],
    views: 412,
  }),
  base({
    id: 'p-desert', slug: 'the-desert-house', title: 'Desert House', listing_type: 'sale', featured: true, badge: 'Private Portfolio',
    summary: 'Minimal desert architecture utilizing thermal mass stone walls, framed mountain vistas, and sheltered breezeways.',
    subtitle: 'Rammed earth and framed horizons at the foot of Camelback Mountain.',
    description: 'A study in restraint. Thick rammed-earth walls temper the desert heat while deep overhangs frame long views toward the mountains.\n\nLiving spaces open to a reflecting pool and sheltered breezeways, making the transition between inside and out almost imperceptible at dusk.',
    city: 'Scottsdale', region: 'Arizona', neighborhood: 'Paradise Valley', latitude: 33.5311, longitude: -111.9427,
    bedrooms: 5, bathrooms: 5, area_sqft: 4600, area_sqm: 427, lot_size: '1.2 acres', year_built: 2021, architect: 'Wendell Burnette Architects',
    materials: 'Rammed earth, weathering steel, native stone', parking: '4-car gallery garage', features: [FEATURES[0], FEATURES[1], FEATURES[2], FEATURES[4]],
    cover_image: L[2], gallery: gal([L[2], L[8], L[9], C[8]]), price: 6450000, price_label: '$6,450,000', views: 301,
  }),
  base({
    id: 'p-modern', slug: 'the-modern-estate', title: 'The Modern Estate', listing_type: 'sale', featured: true, badge: 'Private Portfolio',
    summary: 'Contemporary estate showcasing strong structural geometry, generous gallery volumes, and a private wellness wing.',
    subtitle: 'Gallery volumes and a private wellness wing in Preston Hollow.',
    description: 'Strong structural geometry organizes this estate into a sequence of gallery volumes, each calibrated for natural light and long sightlines.\n\nA private wellness wing, mature landscape and a lap pool complete a residence designed for both retreat and entertaining.',
    city: 'Dallas', region: 'Texas', neighborhood: 'Preston Hollow', latitude: 32.8754, longitude: -96.8105,
    bedrooms: 5, bathrooms: 6, area_sqft: 5100, area_sqm: 474, lot_size: '1.05 acres', year_built: 2020, architect: 'Specht Novak Architects',
    materials: 'Limestone, bronze, white oak', parking: '3-car garage', features: [FEATURES[0], FEATURES[1], FEATURES[3], FEATURES[4]],
    cover_image: L[3], gallery: gal([L[3], L[7], C[9], C[10]]), price: 8900000, price_label: '$8,900,000', views: 277,
  }),
  base({
    id: 'p-hillside', slug: 'the-hillside-residence', title: 'The Hillside Residence', listing_type: 'sale', badge: 'New This Week',
    summary: 'Stepped pavilions naturally embedded into the undulating hillside terrain with panoramic canyon exposures.',
    subtitle: 'Stepped pavilions with canyon views above Barton Creek.',
    description: 'Stepped pavilions follow the contours of the hillside so that every principal room opens toward the canyon.\n\nBoard-formed concrete and glass dissolve into the landscape, with terraces cascading toward a quiet plunge pool.',
    city: 'Austin', region: 'Texas', neighborhood: 'Barton Creek', latitude: 30.2803, longitude: -97.8688,
    bedrooms: 4, bathrooms: 3, area_sqft: 3200, area_sqm: 297, lot_size: '0.9 acres', year_built: 2019, architect: 'Lake|Flato',
    materials: 'Board-formed concrete, glass, ipe', parking: '2-car garage', features: [FEATURES[0], FEATURES[2], FEATURES[4]],
    cover_image: L[4], gallery: gal([L[4], L[1], C[6]]), price: 4250000, price_label: '$4,250,000', views: 190, created_at: d(3),
  }),
  base({
    id: 'p-limestone', slug: 'the-limestone-house', title: 'The Limestone House', listing_type: 'sale', badge: 'Private Portfolio',
    summary: 'Hand-cut regional limestone architecture harmonized with quiet outdoor water courtyards and skylit living corridors.',
    subtitle: 'Hand-cut limestone, water courtyards and skylit corridors in Old Town Scottsdale.',
    description: 'Hand-cut regional limestone walls enclose a series of quiet water courtyards, linked by skylit living corridors.\n\nThe house is designed for stillness: low light, thick walls, and the sound of water.',
    city: 'Scottsdale', region: 'Arizona', neighborhood: 'Old Town Scottsdale', latitude: 33.4942, longitude: -111.9261,
    bedrooms: 4, bathrooms: 4, area_sqft: 3700, area_sqm: 344, lot_size: '0.75 acres', year_built: 2018, architect: 'Studio Ma',
    materials: 'Limestone, steel, travertine', parking: '3-car garage', features: [FEATURES[0], FEATURES[1], FEATURES[5]],
    cover_image: L[5], gallery: gal([L[5], L[9], C[8]]), price: 5200000, price_label: '$5,200,000', views: 164,
  }),
  base({
    id: 'p-garden', slug: 'the-garden-residence', title: 'The Garden Residence', listing_type: 'sale', badge: 'Under Contract', status: 'under_contract',
    summary: 'Modern residential pavilion wrapped around secluded botanical courtyards, creating a serene urban retreat.',
    subtitle: 'A pavilion wrapped around botanical courtyards in University Park.',
    description: 'A modern pavilion wraps around secluded botanical courtyards, giving every room a green outlook.\n\nIn the heart of University Park, the house is at once private and effortlessly connected to the neighborhood.',
    city: 'Dallas', region: 'Texas', neighborhood: 'University Park', latitude: 32.8512, longitude: -96.8003,
    bedrooms: 5, bathrooms: 5, area_sqft: 4400, area_sqm: 409, lot_size: '0.6 acres', year_built: 2022, architect: 'Buchanan Architecture',
    materials: 'Brick, steel, teak', parking: '2-car garage', features: [FEATURES[0], FEATURES[1], FEATURES[3]],
    cover_image: L[6], gallery: gal([L[6], L[7], C[9]]), price: 7100000, price_label: '$7,100,000', views: 133,
  }),
  base({
    id: 'p-pavilion', slug: 'the-pavilion-villa-zurich', title: 'The Pavilion Villa — Minimalist Concrete & Limestone Sanctuary', listing_type: 'sale', featured: true, badge: 'For Sale — Exclusive Mandate',
    summary: 'A minimalist concrete and limestone sanctuary with a Zen courtyard and basin.',
    description: 'A minimalist sanctuary of concrete and limestone arranged around a Zen courtyard. Exclusive mandate.\n\n3.40m ceiling clearances throughout the main pavilion; a private basin and pruned pine anchor the central court.',
    city: 'Zürich Environs', region: 'Zürich', country: 'Switzerland', neighborhood: 'Zürich Environs', address: 'Zürich Environs, Switzerland', currency: 'CHF', price: 14200000, price_label: 'Price on Request',
    bedrooms: 4, bathrooms: 3, area_sqft: 4520, area_sqm: 420, lot_size: '0.4 ha', year_built: 2021, architect: 'Atelier Ruinelli', materials: 'Fair-faced concrete, Jura limestone',
    parking: 'Secure garage', features: [FEATURES[0], FEATURES[1], FEATURES[2], FEATURES[3]], latitude: 47.3769, longitude: 8.5417,
    cover_image: S[0], gallery: gal([S[0], C[3], C[4]]), views: 220, specs: [{ label: 'Reference', value: 'CH-8022' }, { label: 'Title', value: 'Freehold' }],
  }),
  base({
    id: 'p-travertine', slug: 'the-travertine-penthouse-london', title: 'The Travertine Penthouse — Panoramic Skyline Residence', listing_type: 'sale', featured: true, badge: 'For Sale', property_type: 'penthouse',
    summary: 'A sky-high penthouse in natural stone with a wraparound skyline terrace.',
    description: 'Natural travertine, coffered ceilings and a wraparound terrace frame views across the London skyline.\n\nShare of freehold (999 years).',
    city: 'London', region: 'Kensington', country: 'United Kingdom', neighborhood: 'Kensington', address: 'Kensington, London, UK', currency: 'GBP', price: 11850000, price_label: 'Price on Request',
    bedrooms: 3, bathrooms: 3.5, area_sqft: 3336, area_sqm: 310, year_built: 2019, architect: 'Chipperfield Studio', materials: 'Travertine, bronze, smoked oak',
    parking: 'Valet bay', features: [FEATURES[1], FEATURES[3], FEATURES[4]], latitude: 51.5009, longitude: -0.1925,
    cover_image: S[1], gallery: gal([S[1], C[3], C[4]]), views: 198, specs: [{ label: 'Reference', value: 'UK-4019' }, { label: 'Title', value: 'Share of Freehold (999 yrs)' }],
  }),
  base({
    id: 'p-townhouse', slug: 'the-limestone-townhouse-new-york', title: 'The Limestone Townhouse — 19th-Century Restored Residence', listing_type: 'sale', badge: 'For Sale — Heritage Archive', property_type: 'townhouse',
    summary: 'A meticulously restored 19th-century limestone townhouse on the Upper East Side.',
    description: 'A restored 19th-century limestone townhouse with original plasterwork, a new rear garden and a quiet sequence of salons.',
    city: 'New York', region: 'New York', neighborhood: 'Upper East Side', address: 'Upper East Side, New York, NY', price: 18500000, price_label: 'Price on Request',
    bedrooms: 5, bathrooms: 4, area_sqft: 6240, area_sqm: 580, year_built: 1892, architect: 'Restoration by Beyer Blinder Belle', materials: 'Indiana limestone, oak, plaster',
    parking: 'On request', features: [FEATURES[0], FEATURES[3], FEATURES[5]], latitude: 40.7736, longitude: -73.9566,
    cover_image: S[2], gallery: gal([S[2], C[3], C[4]]), views: 154,
  }),
  base({
    id: 'p-lakeside', slug: 'the-lakeside-timber-retreat-lake-como', title: 'The Lakeside Timber Retreat — Cantilevered Water Pavilion', listing_type: 'sale', badge: 'Private Off-Market',
    summary: 'A cantilevered timber pavilion on Lake Como with a private pier and mooring.',
    description: 'A cantilevered water pavilion in blackened timber, with a private pier and mooring on the shore of Lake Como. Off-market — by advisory mandate only.',
    city: 'Lake Como', region: 'Lombardy', country: 'Italy', neighborhood: 'Lake Como', address: 'Lake Como, Northern Italy', currency: 'EUR', price: null, price_label: 'Advisory Mandate / Inquire',
    bedrooms: 4, bathrooms: 4, area_sqft: 4950, area_sqm: 460, year_built: 2020, architect: 'Studio Zanon', materials: 'Charred larch, glass, local stone', parking: 'Private pier & mooring',
    features: [FEATURES[0], FEATURES[2], FEATURES[4]], latitude: 45.9936, longitude: 9.2573, cover_image: S[3], gallery: gal([S[3], C[10]]), views: 177, specs: [{ label: 'Reference', value: 'IT-2108' }],
  }),
  // Rentals
  base({
    id: 'r-glass', slug: 'the-glass-terraces-at-cadogan-belvedere', title: 'The Glass Terraces at Cadogan Belvedere', listing_type: 'rent', badge: 'Available March', property_type: 'apartment', featured: true,
    summary: 'Unit 07 B, Upper Pavilion — a light-filled apartment above Cadogan Square.',
    description: 'A contemporary apartment in the Upper Pavilion of Cadogan Belvedere, with full-height glazing, a private terrace and acoustic-grade partitions.',
    city: 'London', region: 'Knightsbridge', country: 'United Kingdom', neighborhood: 'Cadogan Square', address: 'Unit 07 B, Upper Pavilion, Cadogan Square, SW1X', currency: 'GBP', rent_pcm: 9800, price_label: '£9,800 per month',
    bedrooms: 3, bathrooms: 2, area_sqft: 1830, area_sqm: 170, furnished: true, features: [FEATURES[1], FEATURES[4]], lease_term: '12–24 months', available_from: new Date(Date.now() + 40 * 864e5).toISOString().slice(0, 10),
    cover_image: RD[0], gallery: gal([RD[0], RD[1], RD[2], RD[3], RD[4], RD[5], RD[6]]), latitude: 51.4975, longitude: -0.1566, views: 98,
  }),
  base({
    id: 'r-urban', slug: 'modern-urban-residence-austin', title: 'Modern Urban Residence', listing_type: 'rent', badge: 'Flexible Lease', property_type: 'apartment',
    summary: 'A modern urban residence in downtown Austin with a private terrace.',
    description: 'A bright, modern two-bedroom residence a short walk from Lady Bird Lake, with a generous terrace and concierge services.',
    city: 'Austin', region: 'Texas', neighborhood: 'Downtown Austin', address: 'Downtown Austin, TX', rent_pcm: 6200, price_label: '$6,200 per month',
    bedrooms: 2, bathrooms: 2, area_sqft: 1480, area_sqm: 137, furnished: false, lease_term: '6–18 months', features: [FEATURES[1], FEATURES[4]],
    cover_image: R[2], gallery: gal([R[2], R[3], R[4]]), latitude: 30.2672, longitude: -97.7431, views: 61,
  }),
  base({
    id: 'r-family', slug: 'considered-family-home-dallas', title: 'Considered Family Home', listing_type: 'rent', badge: 'Curated Tenancy', property_type: 'residence',
    summary: 'A considered four-bedroom family home with a private garden in Highland Park.',
    description: 'A quiet four-bedroom family home in Highland Park with a private garden, home office and a calm, tree-lined setting.',
    city: 'Dallas', region: 'Texas', neighborhood: 'Highland Park', address: 'Highland Park, Dallas, TX', rent_pcm: 8400, price_label: '$8,400 per month',
    bedrooms: 4, bathrooms: 3.5, area_sqft: 3100, area_sqm: 288, furnished: false, lease_term: '12–36 months', features: [FEATURES[0], FEATURES[1], FEATURES[3]],
    cover_image: R[1], gallery: gal([R[1], R[5], R[6]]), latitude: 32.8337, longitude: -96.8007, views: 74,
  }),
  base({
    id: 'r-apartment', slug: 'contemporary-apartment-scottsdale', title: 'Contemporary Apartment', listing_type: 'rent', badge: 'Available March', property_type: 'apartment',
    summary: 'A contemporary desert-modern apartment in Old Town Scottsdale.',
    description: 'A contemporary one-bedroom apartment in the Old Town arts district, with a private balcony, mountain views and secure parking.',
    city: 'Scottsdale', region: 'Arizona', neighborhood: 'Old Town Scottsdale', address: 'Old Town Scottsdale, AZ', rent_pcm: 4300, price_label: '$4,300 per month',
    bedrooms: 1, bathrooms: 1.5, area_sqft: 1050, area_sqm: 98, furnished: true, lease_term: '6–12 months', features: [FEATURES[1], FEATURES[4]],
    cover_image: R[0], gallery: gal([R[0], R[3]]), latitude: 33.4942, longitude: -111.9261, views: 49,
  }),
]

export const neighborhoods = [
  { id: 'n1', slug: 'west-lake-hills', name: 'West Lake Hills', city: 'Austin, Texas', tagline: 'Hill Country Tranquility', description: 'A landscape-led residential setting known for its wooded hills, distinctive homes, and a close relationship with the outdoors.', image: N[0], sort: 1, published: true },
  { id: 'n2', slug: 'highland-park', name: 'Highland Park', city: 'Dallas, Texas', tagline: 'Established Streetscapes', description: 'A distinctive residential setting with established streetscapes, considered architecture, and a strong sense of neighborhood identity.', image: N[1], sort: 2, published: true },
  { id: 'n3', slug: 'paradise-valley', name: 'Paradise Valley', city: 'Arizona', tagline: 'Desert-Modern Sanctuary', description: 'A desert setting where architecture, open landscapes, and a quieter residential atmosphere come together.', image: N[2], sort: 3, published: true },
  { id: 'n4', slug: 'barton-creek', name: 'Barton Creek', city: 'Austin, Texas', tagline: 'Private Hillside & Golf Enclaves', description: 'Private hillside and golf enclaves just minutes from downtown Austin.', image: N[3], sort: 4, published: true },
  { id: 'n5', slug: 'tarrytown', name: 'Tarrytown', city: 'Austin, Texas', tagline: 'Historic Oak Canopies & Lake Proximity', description: 'Historic oak canopies and a quiet proximity to Lake Austin.', image: N[4], sort: 5, published: true },
  { id: 'n6', slug: 'preston-hollow', name: 'Preston Hollow', city: 'Dallas, Texas', tagline: 'Architecturally Significant Estates', description: 'Architecturally significant estates on generous, wooded parcels.', image: N[5], sort: 6, published: true },
]

const body = (...p) => p.join('\n\n')
export const journal_posts = [
  { id: 'j1', slug: 'what-makes-a-house-feel-like-home', title: 'What makes a house feel like home?', category: 'Architecture & Living', excerpt: 'Beyond floor plans and finishes, the right home is shaped by the details that influence how we live, gather, rest, and connect with the world around us.', cover_image: J[0], author: 'FORME Editorial', read_time: 6, featured: true, published: true, published_at: d(25),
    body: body('A house becomes a home through accumulation: the way morning light crosses a kitchen table, the weight of a door, the sound of footsteps on stone.', 'When we walk a property with clients, we pay as much attention to these thresholds as to square footage. They are the quiet details that decide whether a place will be lived in or merely occupied.', 'The best homes make room for ordinary life — and let it feel extraordinary.') },
  { id: 'j2', slug: 'the-quiet-power-of-thoughtful-architecture', title: 'The quiet power of thoughtful architecture', category: 'Architecture', excerpt: 'How proportion, light, and material choices shape the way a space feels long after initial impressions fade.', cover_image: J[1], author: 'FORME Editorial', read_time: 5, featured: false, published: true, published_at: d(21),
    body: body('Proportion is felt before it is understood. A ceiling a few inches higher, a window set a little lower — these decisions shape how we move through a space.', 'Light does the rest. Orientation, depth of reveal and the colour of a surface determine whether a room feels calm at four in the afternoon.', 'Thoughtful architecture rarely announces itself. It simply makes everything else easier.') },
  { id: 'j3', slug: 'finding-the-character-of-a-neighborhood', title: 'Finding the character of a neighborhood', category: 'Neighborhoods', excerpt: 'Looking beyond an address to understand the rhythm of everyday life, local craftsmanship, and pedestrian cadence.', cover_image: J[2], author: 'FORME Editorial', read_time: 4, featured: false, published: true, published_at: d(18),
    body: body('Spend a morning, an evening and a weekend in the area before deciding. Notice who is out walking, where the lights are on, how traffic settles.', 'Neighborhoods have a cadence. Understanding it is the surest way to know whether it will fit yours.') },
  { id: 'j4', slug: 'questions-worth-asking-before-choosing-a-home', title: 'Questions worth asking before choosing a home', category: 'Property Insights', excerpt: 'A more considered framework to evaluate structural integrity, environmental microclimate, and the subtle friction points of layout before commitment.', cover_image: J[3], author: 'FORME Editorial', read_time: 7, featured: false, published: true, published_at: d(14),
    body: body('Where does the sun fall in winter? How does the house sound when it rains? What happens at the front door when your hands are full?', 'These are not inspection items, but they are the questions that matter most after the first year.') },
  { id: 'j5', slug: 'designing-a-home-around-the-way-you-live', title: 'Designing a home around the way you live', category: 'Considered Living', excerpt: 'Why daily routines and spatial acoustics can be far more impactful on well-being than sheer square footage.', cover_image: J[4], author: 'FORME Editorial', read_time: 5, featured: false, published: true, published_at: d(10),
    body: body('Begin with routines, not rooms. Where do you read, cook, work, retreat?', 'A home designed around these patterns will feel larger than its dimensions suggest.') },
  { id: 'j6', slug: 'natural-materials-lasting-character', title: 'Natural materials, lasting character', category: 'Architecture', excerpt: 'Exploring the appeal of timber, stone, texture, and honest finishes that age gracefully over decades.', cover_image: J[5], author: 'FORME Editorial', read_time: 4, featured: false, published: true, published_at: d(7),
    body: body('Stone softens with use. Timber darkens and deepens. Honest materials record the life of a house rather than hiding it.') },
  { id: 'j7', slug: 'a-more-thoughtful-approach-to-property-discovery', title: 'A more thoughtful approach to property discovery', category: 'Property Insights', excerpt: 'How to quiet the noise of market saturation, narrow the search, and focus only on what genuinely fits your life.', cover_image: J[6], author: 'FORME Editorial', read_time: 6, featured: false, published: true, published_at: d(3),
    body: body('Fewer listings, better decisions. We begin by defining what a good day at home looks like, then work backwards to the places that make it possible.') },
]

export const testimonials = [
  { id: 't1', client_name: 'M. & J. Hartley', context: 'Buying a Home · Historic Villa Restoration', ref: 'Ref. 091-B', quote: 'We never felt pressured. Every conversation was about understanding how we wanted to live — the house followed from that. The guidance throughout the acquisition was calm, precise and entirely free of noise.', image: I.client_experiences[0], sort: 1, published: true },
  { id: 't2', client_name: 'A. Lindqvist', context: 'Selling a Property · Penthouse Realization', ref: 'Ref. 044-S', quote: 'Preparing the property with FORME was a revelation. The positioning was honest and measured, and the right buyer arrived without any theatre.', image: I.client_experiences[1], sort: 2, published: true },
  { id: 't3', client_name: 'The Okafor Family', context: 'Property Advisory · Multi-Parcel Preservation', ref: 'Ref. 118-A', quote: 'Clear explanations, considered recommendations and an advisor who listened first. It made a complex, multi-generational decision feel manageable.', image: I.client_experiences[2], sort: 3, published: true },
]

export const team_members = [
  { id: 'tm1', name: 'Elena Marchetti', role: 'Founder & Principal Advisor', bio: 'Elena founded FORME after fifteen years advising on architecturally significant residences across Europe and the United States. She believes a good advisor listens first.', image: PPL[0], sort: 1, published: true },
  { id: 'tm2', name: 'Julian Weiss', role: 'Director, Acquisitions', bio: 'Julian leads private acquisitions, sourcing off-market residences for clients across Zürich, Milan and New York.', image: PPL[1], sort: 2, published: true },
  { id: 'tm3', name: 'Priya Raman', role: 'Head of Property Management', bio: 'Priya oversees tenancy, leasing and long-term stewardship for landlords and tenants across the portfolio.', image: PPL[2], sort: 3, published: true },
  { id: 'tm4', name: 'Marcus Lee', role: 'Architectural Curator', bio: 'A trained architect, Marcus vets each residence for spatial quality, materiality and provenance before it joins the portfolio.', image: PPL[3], sort: 4, published: true },
]

export const site_settings = [
  { key: 'contact', value: { email: 'concierge@formerealty.com', phone: '+1 512 480 9100', offices: [{ city: 'Austin', phone: '512.480.9100' }, { city: 'Dallas', phone: '214.520.4400' }, { city: 'Scottsdale', phone: '480.990.2200' }] } },
  { key: 'brand', value: { name: 'FORME REALTY', tagline: 'Space to live differently.' } },
]

const A = (id, o) => ({ id, status: 'new', assigned_to: null, notes: '', payload: {}, property_id: null, phone: '', subject: '', created_at: d(1), updated_at: d(1), ...o })
export const inquiries = [
  A('i1', { ref: 'INQ-2026-4821', type: 'general', name: 'Sophie Laurent', email: 'sophie.laurent@example.com', phone: '+44 7700 900123', subject: 'Looking for a family home in Austin', message: 'We are relocating from London in the spring and would like to discuss residences in West Lake Hills and Tarrytown.', created_at: d(0, 3) }),
  A('i2', { ref: 'INQ-2026-4790', type: 'property', name: 'Daniel Okoro', email: 'daniel.okoro@example.com', subject: 'The Courtyard Residence', message: 'Could you share the property monograph and the architectural drawings?', property_id: 'p-courtyard', status: 'in_progress', created_at: d(1, 5) }),
  A('i3', { ref: 'INQ-2026-4755', type: 'seller', name: 'Marguerite Dubois', email: 'm.dubois@example.com', phone: '+33 6 12 34 56 78', subject: 'Selling a heritage townhouse', message: 'I would like a confidential conversation about positioning a restored 1890s townhouse.', status: 'replied', created_at: d(3) }),
  A('i4', { ref: 'INQ-2026-4702', type: 'investment', name: 'Tobias Brandt', email: 'tbrandt@example.com', subject: 'Investment portfolio', message: 'Interested in multi-unit architecture-led investments in Texas.', status: 'new', created_at: d(4) }),
  A('i5', { ref: 'INQ-2026-4688', type: 'mortgage', name: 'Aisha Rahman', email: 'aisha.rahman@example.com', subject: 'Financing guidance', message: 'First-time buyer in the luxury market — keen to understand financing structures.', status: 'closed', created_at: d(8) }),
  A('i6', { ref: 'INQ-2026-4650', type: 'careers', name: 'Lena Fischer', email: 'lena.fischer@example.com', subject: 'Introduction', message: 'Architect transitioning into property advisory — would love to introduce myself.', status: 'new', created_at: d(9) }),
]

const V = (id, o) => ({ id, status: 'pending', viewing_type: 'in_person', attendees: 1, notes: '', admin_notes: '', secondary_date: null, phone: '', created_at: d(1), updated_at: d(1), ...o })
const day = (n) => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10)
export const viewing_requests = [
  V('v1', { ref: 'VWR-2026-1093', property_id: 'p-courtyard', name: 'Daniel Okoro', email: 'daniel.okoro@example.com', phone: '+1 415 555 0114', preferred_date: day(3), preferred_time: '10:00', attendees: 2, notes: 'We would like to see the courtyard in morning light.' }),
  V('v2', { ref: 'VWR-2026-1071', property_id: 'p-desert', name: 'Isabelle Moreau', email: 'i.moreau@example.com', preferred_date: day(5), preferred_time: '14:00', viewing_type: 'virtual', status: 'confirmed' }),
  V('v3', { ref: 'VWR-2026-1042', property_id: 'p-modern', name: 'Raj Patel', email: 'raj.patel@example.com', preferred_date: day(-2), preferred_time: '11:30', status: 'completed' }),
  V('v4', { ref: 'VWR-2026-1015', property_id: 'r-glass', name: 'Helena Vance-Whitmore', email: 'helena.vance@example.com', preferred_date: day(7), preferred_time: '16:00', status: 'pending' }),
]

export const valuation_requests = [
  { id: 'val1', ref: 'VAL-2026-2210', name: 'Oliver Grant', email: 'oliver.grant@example.com', phone: '+1 512 555 0188', property_address: '14 Windsor Road, Austin, TX', property_type: 'Residence', reason: 'Considering selling', timeline: '3–6 months', notes: 'Original 1960s mid-century with later extension.', status: 'new', admin_notes: '', created_at: d(2), updated_at: d(2) },
  { id: 'val2', ref: 'VAL-2026-2187', name: 'Camille Roux', email: 'camille.roux@example.com', phone: '', property_address: 'Penthouse 12, Turtle Creek, Dallas, TX', property_type: 'Penthouse', reason: 'Portfolio review', timeline: 'Exploring', notes: '', status: 'scheduled', admin_notes: 'Site visit booked.', created_at: d(6), updated_at: d(4) },
]

export const subscribers = [
  { id: 's1', email: 'reader.one@example.com', source: 'footer', created_at: d(12) },
  { id: 's2', email: 'reader.two@example.com', source: 'journal', created_at: d(6) },
  { id: 's3', email: 'reader.three@example.com', source: 'footer', created_at: d(2) },
]

export const rental_applications = [
  { id: 'app1', ref: 'APP-CAD-2026-9412', property_id: 'r-glass', property_title: 'The Glass Terraces at Cadogan Belvedere', status: 'info_requested', applicant_name: 'Helena Vance-Whitmore', email: 'helena.vance@example.com', phone: '+44 7700 900456', preferred_contact: 'email', move_in_date: day(45), tenancy_term: '12 Months (Standard Fixed)', occupants: 2, special_notes: 'Two adults, one small dog.', employment_status: 'Employed (Corporate / Professional)', employer: 'Studio Marlow Architecture', references_text: 'Previous landlord: Cadogan Estates Ltd.', payload: {}, withdrawn_reason: '', created_at: d(6), updated_at: d(1), submitted_at: d(6) },
  { id: 'app2', ref: 'APP-URB-2026-7731', property_id: 'r-urban', property_title: 'Modern Urban Residence', status: 'under_review', applicant_name: 'Theo Nakamura', email: 'theo.nakamura@example.com', phone: '+1 512 555 0142', preferred_contact: 'phone', move_in_date: day(30), tenancy_term: '6 Months', occupants: 1, special_notes: '', employment_status: 'Self-employed', employer: 'Nakamura Design', references_text: '', payload: {}, withdrawn_reason: '', created_at: d(4), updated_at: d(3), submitted_at: d(4) },
  { id: 'app3', ref: 'APP-FAM-2026-6120', property_id: 'r-family', property_title: 'Considered Family Home', status: 'submitted', applicant_name: 'Grace Whitfield', email: 'grace.whitfield@example.com', phone: '', preferred_contact: 'email', move_in_date: day(60), tenancy_term: '24 Months', occupants: 4, special_notes: 'Two children.', employment_status: 'Employed (Corporate / Professional)', employer: 'Meridian Partners', references_text: '', payload: {}, withdrawn_reason: '', created_at: d(1), updated_at: d(1), submitted_at: d(1) },
]

export const application_messages = [
  { id: 'm1', application_id: 'app1', sender: 'advisor', body: 'Welcome, Helena — your application has been received. A principal advisor will review it within two working days.', created_at: d(6) },
  { id: 'm2', application_id: 'app1', sender: 'applicant', body: 'Thank you. Please let me know if anything further is needed.', created_at: d(5) },
  { id: 'm3', application_id: 'app1', sender: 'advisor', body: 'We need two further items — please see the Application Clarifications section.', created_at: d(1) },
]

export const application_documents = [
  { id: 'doc1', application_id: 'app1', name: 'Photo identification', doc_type: 'identity', file_path: '', file_url: '', status: 'verified', created_at: d(5) },
  { id: 'doc2', application_id: 'app1', name: 'Proof of income (3 months)', doc_type: 'income', file_path: '', file_url: '', status: 'requested', created_at: d(1) },
  { id: 'doc3', application_id: 'app1', name: 'Previous landlord reference', doc_type: 'reference', file_path: '', file_url: '', status: 'requested', created_at: d(1) },
]

export const information_requests = [
  { id: 'ir1', application_id: 'app1', title: 'Proof of income', detail: 'Please provide your last three payslips or an employer letter confirming salary.', due_date: day(4), status: 'open', response: '', created_at: d(1) },
  { id: 'ir2', application_id: 'app1', title: 'Landlord reference', detail: 'Contact details for your previous landlord, including phone and email.', due_date: day(4), status: 'open', response: '', created_at: d(1) },
]

export const SEED = {
  properties, neighborhoods, journal_posts, testimonials, team_members, site_settings, inquiries, viewing_requests,
  valuation_requests, subscribers, rental_applications, application_messages, application_documents, information_requests,
}
