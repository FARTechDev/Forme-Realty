-- FORME REALTY demo content. Run after schema.sql. Safe to re-run (ON CONFLICT DO NOTHING).
-- Generated from src/lib/seed.js so the site looks identical with or without Supabase.

insert into public.properties ("subtitle", "description", "property_type", "status", "badge", "featured", "published", "price", "price_label", "currency", "rent_pcm", "region", "country", "neighborhood", "address", "latitude", "longitude", "bedrooms", "bathrooms", "area_sqft", "area_sqm", "lot_size", "year_built", "architect", "materials", "parking", "features", "gallery", "floor_plan_url", "specs", "available_from", "lease_term", "furnished", "views", "created_at", "updated_at", "id", "slug", "title", "listing_type", "summary", "city", "cover_image")
select "subtitle", "description", "property_type", "status", "badge", "featured", "published", "price", "price_label", "currency", "rent_pcm", "region", "country", "neighborhood", "address", "latitude", "longitude", "bedrooms", "bathrooms", "area_sqft", "area_sqm", "lot_size", "year_built", "architect", "materials", "parking", "features", "gallery", "floor_plan_url", "specs", "available_from", "lease_term", "furnished", "views", "created_at", "updated_at", "id", "slug", "title", "listing_type", "summary", "city", "cover_image" from jsonb_populate_recordset(null::public.properties, $json$
[
 {
  "subtitle": "A contemporary retreat shaped by natural light, thoughtful materials, and a seamless connection to the outdoors.",
  "description": "Organized around a tranquil central cloister, the residence presents an introverted sanctuary from the street while opening fully toward interior courtyards and private southern landscape vantages.\n\nThe Courtyard Residence brings architecture and landscape into close conversation. Expansive glazing welcomes natural light throughout the day, while carefully selected materials create a warm, understated atmosphere.\n\nConstructed of rough-cut local limestone, blackened structural steel, and reclaimed vertical cedar siding, the pavilion-style wings celebrate both permanence and lightness.",
  "property_type": "residence",
  "status": "available",
  "badge": "Private Portfolio · Available",
  "featured": true,
  "published": true,
  "price": null,
  "price_label": "Price on Request",
  "currency": "USD",
  "rent_pcm": null,
  "region": "Texas",
  "country": "United States",
  "neighborhood": "West Lake Hills",
  "address": "West Lake Hills, Austin, TX",
  "latitude": 30.2974,
  "longitude": -97.8097,
  "bedrooms": 4,
  "bathrooms": 4.5,
  "area_sqft": 3850,
  "area_sqm": 358,
  "lot_size": "0.82 acres",
  "year_built": 2023,
  "architect": "Alterstudio Architecture",
  "materials": "Texas Cordova Cream limestone, blackened steel, reclaimed cedar",
  "parking": "3-car climate garage",
  "features": [
   "Garden or Courtyard",
   "Secure Parking / Garage",
   "Outdoor Space / Pavilion",
   "Home Study or Atelier"
  ],
  "gallery": [
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCHAO8IGeoiNQHM5WV9644s4yXebnZPlDYll0DF9tQflTPDHbIhH58grN_HmcbdlZRqADMbDMZYFvTUQvWux1QiXUyQ50PuDJ_6saA8sdGYR9HOgIH2T8QCGRb0gHW3CUE2_750zyA4pJ0IKoU0S2thx5QdojNoxpwLgMsNvriWmMMeijKRN_gookQqucGDs55uA75J4nG8qxI8YSmrmGmX9_gtKEjmbB47Um_w3Uk8viFF5wQfAFL4",
    "caption": "South Elevation & Courtyard Water Basin"
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuARcqBoEQQV503xzKlvIX7xqLOgk2AKxPXyWlAG01Y0fSz4eFRhLfJrPJLgd5lShWKx4scTvZuuDL8dtM85LF19wSjIW_-iY_SLsnDs0ePVa87ZVmQUM_BlTtoC2Drl3HnPaVKzXmpLULbVT8deEBQPz1o6MZDZiVgFg0zO2CMbbWpuSFiQ-33cwXoE0kp3m0e2BjFAlh_iJqFG0lEMxfFLrLSTYKtz6Vd2-2QvebzXo5gfh11D4DGK",
    "caption": "Breezeway & Hand-Hewn Stone"
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDUyLK7M29jY0jsgsag9Klrz7_yJoi6Oc5upoEZ7Tr74bZs_wof7o02fc_oqcVKLG3Z5FczLLkaN5WRox8h6t_vFFQIB7-qTCI-Qr-q-AaXFmyYoRm06ZQAaST6D4MSzxzYkZEu1DPNW9zJZ5UcbVqO4wXRu_z5l9tPvgJ6yrSjN4lEgJwjBKvwQQJ1AuTIh9GJDvqM7csVeDjJKIbrwsUevEMM9azU8QEQfD-B8lHZjNm44V_MkyhF",
    "caption": "Reflecting Plunge Pool & Loggia"
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuALVazQaNGJeK5jIzLPf0EIa07Kmb4hMKLPeMPqWZxl5OKuMf639x-dUaI2o8g0boRqQGUVprOPIh2vF9geMpoUVuzAGaouW6Aq1IvnVfY4gX1Aty4-GzH9dBuggsEwuvwGgQLGM81YXhE2lzgS37Od15vSy3OoEuqWlxHD13X8lFKbYGCArtp4kfXxcycfp_Tm6WEdeoGs6izwbKsVF500NydbQBCdQNxHAl3viQMLW-y36vOW-y9k",
    "caption": "The Great Room"
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuC-_s8ndiPcNk5f0MlfVt15yBgaP_-80t3uwDMzGYdyWRzPiFnWMozqynjLASmH1in2tGrWo0sD7npMexEfTvzV2SqB0ucb4J48RLwxIMJPQXk_oPdkfPXGtVLcyma04HKAyfxkGipiIf_9vKx6xcJGYBY53_VW60XQT-2k_3LCA_1MwHMdmcTw35dHHzyys9NsGUk3_5WJDVGQv8mpoa1cPM5OMOByjrkgTAz5XybZcWGiC2lxK4or",
    "caption": "Kitchen & Dining Gallery"
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBqr7lVLJ7mCQmZRQHVyrpaDg8UdBDeSUL0pqbRW44_aEM2w2_mYSdJAyj6B42DamMiJrVtjrZhjAj3P8VCrheM4ZtV1-F6EzumKGGbSCDOYVPn8Fhzem6zBo9_xm3NDkJL3lXQkewh_7k5HsjxWUr0ZtBP8e1k73xbOWHfbB4tNqAtKB10lfv-0DpQyUivzKdawJS9vF13AqxZLTQROunsRg2W-RTwdK6RdciXvkyv9W90w0SoBKo_",
    "caption": "Primary Suite & Bath"
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuB37dJEKeTyUZ0ueOzy8JXkq0EfEmmC3uV4YswuRNEE2jrPPXMpz6LXsZ8uhIjgK74CrZWtvWlKqsX7Bgk-2HfOXDQp_rn5yDJ7A4h7U607Xl4fY0E_upBokwOffgTsV39voT0QMDgAMlffwk0mmDTzhJGUdNuh1eoIvWd42mA7qUxWSH4-M2sCgIayAHewcGur_RqGaeymLd3XbeJZnkZ-B21_C4yn17_Y_97qM_uvy80OHJwQtKzV",
    "caption": "Material study"
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDbJ3EJ6hW8O09dIoDrY8xwZekeNUvlN_8Qtw8WiqW2LlYuj0fOWUUZ59pRQpJQXQYELflGMpctuEVWw6VbYh9q8mTQHW0NX-mgbcZVvrHTgAdjgmA8sgu0lAyZW231HVxDbiC8g0txjK2CjQpKJxYiZ3yrqCqKKolvQq8AO7MP_hJ6kLnMc3S1-vxr2jdBAjMjAkrXOk5LtBN1G_YEGEY1AaFfmwjj6dhilvaKLJUNZyxfFLdWZiO_",
    "caption": "Landscape"
   }
  ],
  "floor_plan_url": "",
  "specs": [
   {
    "label": "Accommodations",
    "value": "4 En-Suite Suites"
   },
   {
    "label": "Baths & Powder",
    "value": "4 Full Baths · 1 Powder"
   },
   {
    "label": "Conditioned Area",
    "value": "3,850 Square Feet"
   },
   {
    "label": "Architectural Typology",
    "value": "Modern Courtyard Pavilion"
   },
   {
    "label": "Parcel & Grounds",
    "value": "0.82 Curated Acres"
   },
   {
    "label": "Vehicular Gallery",
    "value": "3-Car Climate Garage"
   },
   {
    "label": "Primary Stone",
    "value": "Texas Cordova Cream"
   },
   {
    "label": "Fenestration",
    "value": "Brombal Thermally Broken Steel"
   },
   {
    "label": "Ceiling Finish",
    "value": "Clear Douglas Fir Tongue-and-Groove"
   },
   {
    "label": "Climate Control",
    "value": "Concealed Variable-Refrigerant HVAC"
   }
  ],
  "available_from": null,
  "lease_term": "",
  "furnished": false,
  "views": 412,
  "created_at": "2026-09-23T14:07:46.523Z",
  "updated_at": "2026-10-18T14:07:46.523Z",
  "id": "debb6788-5438-461d-a422-d43d1745dfbf",
  "slug": "the-courtyard-residence",
  "title": "The Courtyard Residence",
  "listing_type": "sale",
  "summary": "Contemporary central courtyard design with extensive acoustic glazing and tactile cedar panels.",
  "city": "Austin",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuC8o6B_a8piZYY35lN4Rcjf5rKJ3CR8uZ5K6JaqSzMYGzPTLgIm30buOEZAUZ5g_RVANYlu08U_excUO6tgCceVmZgAMpKVG3uDm5xrh7mCMbjzxqa4vs6gAubZENIu-v_IkKm7nBMyq2ZXw2zr0ga30hQzTPzwRyGUZE7P99pCaA_mgHyDrm6gQfuycAHpFItsopYNhKfv_pJI5khgw64iWlZ5kOFl5qoYS-JZESEMbgBxMtAoc5Z3"
 },
 {
  "subtitle": "Rammed earth and framed horizons at the foot of Camelback Mountain.",
  "description": "A study in restraint. Thick rammed-earth walls temper the desert heat while deep overhangs frame long views toward the mountains.\n\nLiving spaces open to a reflecting pool and sheltered breezeways, making the transition between inside and out almost imperceptible at dusk.",
  "property_type": "residence",
  "status": "available",
  "badge": "Private Portfolio",
  "featured": true,
  "published": true,
  "price": 6450000,
  "price_label": "$6,450,000",
  "currency": "USD",
  "rent_pcm": null,
  "region": "Arizona",
  "country": "United States",
  "neighborhood": "Paradise Valley",
  "address": "",
  "latitude": 33.5311,
  "longitude": -111.9427,
  "bedrooms": 5,
  "bathrooms": 5,
  "area_sqft": 4600,
  "area_sqm": 427,
  "lot_size": "1.2 acres",
  "year_built": 2021,
  "architect": "Wendell Burnette Architects",
  "materials": "Rammed earth, weathering steel, native stone",
  "parking": "4-car gallery garage",
  "features": [
   "Garden or Courtyard",
   "Secure Parking / Garage",
   "Outdoor Space / Pavilion",
   "Balcony or Terrace"
  ],
  "gallery": [
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAvwXUcq9ma1fWKlvhPqFcpJT0ZDSYWisveM1ANIKqlpJYfqA7jzJX954uieff-unS81HOhKT3NdxNMow2NvBWww_mlHuszQNW44vWYnu-nWC_5c9c0fTvfRADv77EG6U18iPIdckFrgRO2jskNYUD-Q9KliY5Mu2N9J0l1WKLnYkfKhDn7n9hrA4XewzNCKa6gxkWeTGZut4a8NqXZ1KQPDczmX17xVLwWhM00Amxh-yRYR9-P277T",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDuAMuYVW4rCLbCy5EtUpmKsTf3hWje2Hoh7jDhmQ8lppv_f4VKOZ5TbsmJfc5ZUmBZfDuAroXwSMlAVXvzYgCSTpF4-QK6DrqHExrJevP1UbY0ZxLSYoNbrbqy6aoibIGpspFezyq9GgkPhWmkY9_8cape7lWps8IN-bY-2jp1MfpMMFfzFKY5wNspJxQJ7ftK_3yXT2Rzay_Jafdkc9eg2oEwWjYsf6E7TZm9A31nwwhqS9nuQWzG",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAjCdwb93QsJqoZsRsvCSt2Fw5-6cg1WxIExIpoAMLC7M5f2pVMs1AZtOjRgpyhO5zS-ouXbwhpG4-azQf3vT6uOFh8YdjjZ9NWFMURSlhJLtRq_udO0X1-2qBFqAgKYinvVBvoP3Ti1kUiNqSG9Sn4hHQCPrAcBhzs_wq1j2Fn_6gM4MgwnMZu0uAylbmlDjngPQjYVy8rXjmcPsEzmpVb2_Y0OtpqEG8s4LR7SSx4px9VtIb-bfZF",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBmtTaHN7AQ6yS4XnCXj9P_9qLDishtPxXbC0Dz4mcMG5geK1N36uf7_00kgaXWs2IYk9M8YDe173MsjUiMM_0nEP2t7amVoq7Hz6ooiAwsFrVK5BHp3qfPtKgGRf0K_9nb5S9K2TTH2YczRri3NbZaFzi07-sMp3DTAObmD8t7QEFjRfdJwTki95Gw5fnPxqDpy2_I-lY5iz7cdkrt14jo-GC0SA1KIYG9BI0L1id3Fq9HlaW_MJvd",
    "caption": ""
   }
  ],
  "floor_plan_url": "",
  "specs": [],
  "available_from": null,
  "lease_term": "",
  "furnished": false,
  "views": 301,
  "created_at": "2026-09-23T14:07:46.523Z",
  "updated_at": "2026-10-18T14:07:46.523Z",
  "id": "a07239d6-cc84-4a8e-a712-8ca4a7d358ce",
  "slug": "the-desert-house",
  "title": "Desert House",
  "listing_type": "sale",
  "summary": "Minimal desert architecture utilizing thermal mass stone walls, framed mountain vistas, and sheltered breezeways.",
  "city": "Scottsdale",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAvwXUcq9ma1fWKlvhPqFcpJT0ZDSYWisveM1ANIKqlpJYfqA7jzJX954uieff-unS81HOhKT3NdxNMow2NvBWww_mlHuszQNW44vWYnu-nWC_5c9c0fTvfRADv77EG6U18iPIdckFrgRO2jskNYUD-Q9KliY5Mu2N9J0l1WKLnYkfKhDn7n9hrA4XewzNCKa6gxkWeTGZut4a8NqXZ1KQPDczmX17xVLwWhM00Amxh-yRYR9-P277T"
 },
 {
  "subtitle": "Gallery volumes and a private wellness wing in Preston Hollow.",
  "description": "Strong structural geometry organizes this estate into a sequence of gallery volumes, each calibrated for natural light and long sightlines.\n\nA private wellness wing, mature landscape and a lap pool complete a residence designed for both retreat and entertaining.",
  "property_type": "residence",
  "status": "available",
  "badge": "Private Portfolio",
  "featured": true,
  "published": true,
  "price": 8900000,
  "price_label": "$8,900,000",
  "currency": "USD",
  "rent_pcm": null,
  "region": "Texas",
  "country": "United States",
  "neighborhood": "Preston Hollow",
  "address": "",
  "latitude": 32.8754,
  "longitude": -96.8105,
  "bedrooms": 5,
  "bathrooms": 6,
  "area_sqft": 5100,
  "area_sqm": 474,
  "lot_size": "1.05 acres",
  "year_built": 2020,
  "architect": "Specht Novak Architects",
  "materials": "Limestone, bronze, white oak",
  "parking": "3-car garage",
  "features": [
   "Garden or Courtyard",
   "Secure Parking / Garage",
   "Home Study or Atelier",
   "Balcony or Terrace"
  ],
  "gallery": [
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuB-dH_y9eP-YSEocMj7JRvOnUhkHb7yIUqAvi_7rZn5CwGd_x2BPa_bvHFGPXP-hpxX7eVdBDeFWS4MqbQGKqfGXYPtSh0BsaEWhu3VAgNG8WpxM8GNVWiIbGKnYw7hrDhMYExjNxT7H1t4zID-5rQ_iv5j8LhgBbKnXj_KzMUGQOTMDNdpvayJwVKsLmnBWA2O00bJ4mIRzSDO7YuzEj_17Mm77e6IFQ3AjJg8UA_veJqPWvgiYgh_",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBVHXw1elpDIBvr5AsnhSYJe4roXh9SGPlUy4_A07mALM-MJo7QmgzElTJZT61p4L1fOb4JYiGc113y7LZUEMqfmFBBsR8VBlWTEnQWD-5qg5Zr3ksWHt_um2rWP9XUYE7j0wUyY_JTtOyzxOXcqle7zyTRVXVao6ygF_zD8mZqWnwGZSlpb75ZgQWmK-_Grqn5ysAd-efAI6nD_l5gDlOtupYWUws0LeiSxQtroLl-2TwpiWRUzNUh",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDDh-EhsYRQ7RsxBslRRi6Rrp64p8ymJUE7_Lv2sQgVJ-cfVqkfMgGNOfDyJtf1gIGg_o2DgiUGLsjKFxJe0Yz1Ml419ZwL9iUUbqdcPOK7tabOW7w-hoSpxLwn3pG_7328juHOAgsaMnVODaCX62BlX3jn_hKL-Itne4txHKYj6wW4FTA_uyaD51K1Qnp7vdR91VnJbN_HzMkcPWXyTxq55oF3tHfV9vzahFxBzQ2jjSCuLFD86Qjl",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuByN3ARX0kcXfE4-5ycCLwHXlUPYsIrQx1YZNy57kUP_Y30KrT0RWaYyCt9g0hFd7Olib7os26fjlpfFU9QFUxEkMwa6UqN6T99EfVSNjNrmSGUaJx5br85sLYw5rvc4jiPOm1nP1__-n_En-kFvJqtybvb-9C-oHD28cz9cTR4_gVako_xOneJJwjQr6c-9NdgpZn_k3xsk46CsTVE_HyyU22mjDT2l3tz5jjikC98se8vL_UqTOUH",
    "caption": ""
   }
  ],
  "floor_plan_url": "",
  "specs": [],
  "available_from": null,
  "lease_term": "",
  "furnished": false,
  "views": 277,
  "created_at": "2026-09-23T14:07:46.523Z",
  "updated_at": "2026-10-18T14:07:46.523Z",
  "id": "3ede0038-15a8-43fd-ab3b-becb157a0436",
  "slug": "the-modern-estate",
  "title": "The Modern Estate",
  "listing_type": "sale",
  "summary": "Contemporary estate showcasing strong structural geometry, generous gallery volumes, and a private wellness wing.",
  "city": "Dallas",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuB-dH_y9eP-YSEocMj7JRvOnUhkHb7yIUqAvi_7rZn5CwGd_x2BPa_bvHFGPXP-hpxX7eVdBDeFWS4MqbQGKqfGXYPtSh0BsaEWhu3VAgNG8WpxM8GNVWiIbGKnYw7hrDhMYExjNxT7H1t4zID-5rQ_iv5j8LhgBbKnXj_KzMUGQOTMDNdpvayJwVKsLmnBWA2O00bJ4mIRzSDO7YuzEj_17Mm77e6IFQ3AjJg8UA_veJqPWvgiYgh_"
 },
 {
  "subtitle": "Stepped pavilions with canyon views above Barton Creek.",
  "description": "Stepped pavilions follow the contours of the hillside so that every principal room opens toward the canyon.\n\nBoard-formed concrete and glass dissolve into the landscape, with terraces cascading toward a quiet plunge pool.",
  "property_type": "residence",
  "status": "available",
  "badge": "New This Week",
  "featured": false,
  "published": true,
  "price": 4250000,
  "price_label": "$4,250,000",
  "currency": "USD",
  "rent_pcm": null,
  "region": "Texas",
  "country": "United States",
  "neighborhood": "Barton Creek",
  "address": "",
  "latitude": 30.2803,
  "longitude": -97.8688,
  "bedrooms": 4,
  "bathrooms": 3,
  "area_sqft": 3200,
  "area_sqm": 297,
  "lot_size": "0.9 acres",
  "year_built": 2019,
  "architect": "Lake|Flato",
  "materials": "Board-formed concrete, glass, ipe",
  "parking": "2-car garage",
  "features": [
   "Garden or Courtyard",
   "Outdoor Space / Pavilion",
   "Balcony or Terrace"
  ],
  "gallery": [
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuC_WxOeyWUNAhd7ad79Tfi6OyyZtxl2arTNknwrNMFMZ99nKAZkgyYmDNINA4RDnbXpvgSsO1L-rYv-cpLOKr-mL0bzI5f7wnV_faijL3daMt-9mnOUXwi79LV_eRbE9hDM7JCEsmHjCPZRfGTdH2HqPkECruAl6sUSSU7SiwFtl_GBWC3zz-GTvg2ZEBe3YPXJ5btvtLtwqXHKtDRmoQwvAbppx-l8BuVziZ84Hk23ToiruzcA098t",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuC8o6B_a8piZYY35lN4Rcjf5rKJ3CR8uZ5K6JaqSzMYGzPTLgIm30buOEZAUZ5g_RVANYlu08U_excUO6tgCceVmZgAMpKVG3uDm5xrh7mCMbjzxqa4vs6gAubZENIu-v_IkKm7nBMyq2ZXw2zr0ga30hQzTPzwRyGUZE7P99pCaA_mgHyDrm6gQfuycAHpFItsopYNhKfv_pJI5khgw64iWlZ5kOFl5qoYS-JZESEMbgBxMtAoc5Z3",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuB37dJEKeTyUZ0ueOzy8JXkq0EfEmmC3uV4YswuRNEE2jrPPXMpz6LXsZ8uhIjgK74CrZWtvWlKqsX7Bgk-2HfOXDQp_rn5yDJ7A4h7U607Xl4fY0E_upBokwOffgTsV39voT0QMDgAMlffwk0mmDTzhJGUdNuh1eoIvWd42mA7qUxWSH4-M2sCgIayAHewcGur_RqGaeymLd3XbeJZnkZ-B21_C4yn17_Y_97qM_uvy80OHJwQtKzV",
    "caption": ""
   }
  ],
  "floor_plan_url": "",
  "specs": [],
  "available_from": null,
  "lease_term": "",
  "furnished": false,
  "views": 190,
  "created_at": "2026-10-20T14:07:46.523Z",
  "updated_at": "2026-10-18T14:07:46.523Z",
  "id": "92ca4d63-7032-46ef-a3e9-8754d804a5ef",
  "slug": "the-hillside-residence",
  "title": "The Hillside Residence",
  "listing_type": "sale",
  "summary": "Stepped pavilions naturally embedded into the undulating hillside terrain with panoramic canyon exposures.",
  "city": "Austin",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuC_WxOeyWUNAhd7ad79Tfi6OyyZtxl2arTNknwrNMFMZ99nKAZkgyYmDNINA4RDnbXpvgSsO1L-rYv-cpLOKr-mL0bzI5f7wnV_faijL3daMt-9mnOUXwi79LV_eRbE9hDM7JCEsmHjCPZRfGTdH2HqPkECruAl6sUSSU7SiwFtl_GBWC3zz-GTvg2ZEBe3YPXJ5btvtLtwqXHKtDRmoQwvAbppx-l8BuVziZ84Hk23ToiruzcA098t"
 },
 {
  "subtitle": "Hand-cut limestone, water courtyards and skylit corridors in Old Town Scottsdale.",
  "description": "Hand-cut regional limestone walls enclose a series of quiet water courtyards, linked by skylit living corridors.\n\nThe house is designed for stillness: low light, thick walls, and the sound of water.",
  "property_type": "residence",
  "status": "available",
  "badge": "Private Portfolio",
  "featured": false,
  "published": true,
  "price": 5200000,
  "price_label": "$5,200,000",
  "currency": "USD",
  "rent_pcm": null,
  "region": "Arizona",
  "country": "United States",
  "neighborhood": "Old Town Scottsdale",
  "address": "",
  "latitude": 33.4942,
  "longitude": -111.9261,
  "bedrooms": 4,
  "bathrooms": 4,
  "area_sqft": 3700,
  "area_sqm": 344,
  "lot_size": "0.75 acres",
  "year_built": 2018,
  "architect": "Studio Ma",
  "materials": "Limestone, steel, travertine",
  "parking": "3-car garage",
  "features": [
   "Garden or Courtyard",
   "Secure Parking / Garage",
   "Recently Renovated / Restored"
  ],
  "gallery": [
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBXUXgiAa4lxmpg89EOIfJlWcBtJc8CY-wEtNcjFpQ9KOemwxyAoR2VEWtYudvbsYHrJkHJlycHf68Bua8MY3A0uaASjPF7bSYSXbZNVmwrjuIG9BLu-rwTBb_JJrJww74D5WDyUI0Nhg6KxAllSeWHQ9dE8s4FEjpam9m0hXhByDQFC3qBF5BVJJmm6EGQeM6-5eypNc0BvBXn3v_eL2PdoVGzrKiis9mwlKJm_7RU4gv3XHN-CnWW",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAjCdwb93QsJqoZsRsvCSt2Fw5-6cg1WxIExIpoAMLC7M5f2pVMs1AZtOjRgpyhO5zS-ouXbwhpG4-azQf3vT6uOFh8YdjjZ9NWFMURSlhJLtRq_udO0X1-2qBFqAgKYinvVBvoP3Ti1kUiNqSG9Sn4hHQCPrAcBhzs_wq1j2Fn_6gM4MgwnMZu0uAylbmlDjngPQjYVy8rXjmcPsEzmpVb2_Y0OtpqEG8s4LR7SSx4px9VtIb-bfZF",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBmtTaHN7AQ6yS4XnCXj9P_9qLDishtPxXbC0Dz4mcMG5geK1N36uf7_00kgaXWs2IYk9M8YDe173MsjUiMM_0nEP2t7amVoq7Hz6ooiAwsFrVK5BHp3qfPtKgGRf0K_9nb5S9K2TTH2YczRri3NbZaFzi07-sMp3DTAObmD8t7QEFjRfdJwTki95Gw5fnPxqDpy2_I-lY5iz7cdkrt14jo-GC0SA1KIYG9BI0L1id3Fq9HlaW_MJvd",
    "caption": ""
   }
  ],
  "floor_plan_url": "",
  "specs": [],
  "available_from": null,
  "lease_term": "",
  "furnished": false,
  "views": 164,
  "created_at": "2026-09-23T14:07:46.523Z",
  "updated_at": "2026-10-18T14:07:46.523Z",
  "id": "eed19599-5731-4565-aac4-df9fcf67ed5d",
  "slug": "the-limestone-house",
  "title": "The Limestone House",
  "listing_type": "sale",
  "summary": "Hand-cut regional limestone architecture harmonized with quiet outdoor water courtyards and skylit living corridors.",
  "city": "Scottsdale",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBXUXgiAa4lxmpg89EOIfJlWcBtJc8CY-wEtNcjFpQ9KOemwxyAoR2VEWtYudvbsYHrJkHJlycHf68Bua8MY3A0uaASjPF7bSYSXbZNVmwrjuIG9BLu-rwTBb_JJrJww74D5WDyUI0Nhg6KxAllSeWHQ9dE8s4FEjpam9m0hXhByDQFC3qBF5BVJJmm6EGQeM6-5eypNc0BvBXn3v_eL2PdoVGzrKiis9mwlKJm_7RU4gv3XHN-CnWW"
 },
 {
  "subtitle": "A pavilion wrapped around botanical courtyards in University Park.",
  "description": "A modern pavilion wraps around secluded botanical courtyards, giving every room a green outlook.\n\nIn the heart of University Park, the house is at once private and effortlessly connected to the neighborhood.",
  "property_type": "residence",
  "status": "under_contract",
  "badge": "Under Contract",
  "featured": false,
  "published": true,
  "price": 7100000,
  "price_label": "$7,100,000",
  "currency": "USD",
  "rent_pcm": null,
  "region": "Texas",
  "country": "United States",
  "neighborhood": "University Park",
  "address": "",
  "latitude": 32.8512,
  "longitude": -96.8003,
  "bedrooms": 5,
  "bathrooms": 5,
  "area_sqft": 4400,
  "area_sqm": 409,
  "lot_size": "0.6 acres",
  "year_built": 2022,
  "architect": "Buchanan Architecture",
  "materials": "Brick, steel, teak",
  "parking": "2-car garage",
  "features": [
   "Garden or Courtyard",
   "Secure Parking / Garage",
   "Home Study or Atelier"
  ],
  "gallery": [
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAkKMvVJNO1akHg_-gPTQHUJlIlLyqfbkyDL7FZxarAv1ZZSHbevv73dQ-eSG6JCfhu4K2b0Vc9ilY1d7E4-6PGSe0snwY_dQPyaMqvxmol55SYy8i34IyspJ7RbXMevlAYGYTfleERUdM8DUf7cc7632_aoXke4HBz_cmjHFTA6yUcoTJmk85IZRN7CfYAYdNOnNT3CT5KOB89Y4dOC7w7ZiezU5Ge8TJ6rPHLqQFvjCC-_m7klJci",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBVHXw1elpDIBvr5AsnhSYJe4roXh9SGPlUy4_A07mALM-MJo7QmgzElTJZT61p4L1fOb4JYiGc113y7LZUEMqfmFBBsR8VBlWTEnQWD-5qg5Zr3ksWHt_um2rWP9XUYE7j0wUyY_JTtOyzxOXcqle7zyTRVXVao6ygF_zD8mZqWnwGZSlpb75ZgQWmK-_Grqn5ysAd-efAI6nD_l5gDlOtupYWUws0LeiSxQtroLl-2TwpiWRUzNUh",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDDh-EhsYRQ7RsxBslRRi6Rrp64p8ymJUE7_Lv2sQgVJ-cfVqkfMgGNOfDyJtf1gIGg_o2DgiUGLsjKFxJe0Yz1Ml419ZwL9iUUbqdcPOK7tabOW7w-hoSpxLwn3pG_7328juHOAgsaMnVODaCX62BlX3jn_hKL-Itne4txHKYj6wW4FTA_uyaD51K1Qnp7vdR91VnJbN_HzMkcPWXyTxq55oF3tHfV9vzahFxBzQ2jjSCuLFD86Qjl",
    "caption": ""
   }
  ],
  "floor_plan_url": "",
  "specs": [],
  "available_from": null,
  "lease_term": "",
  "furnished": false,
  "views": 133,
  "created_at": "2026-09-23T14:07:46.523Z",
  "updated_at": "2026-10-18T14:07:46.523Z",
  "id": "3a0499fa-b553-411d-aba3-ab788e55fcab",
  "slug": "the-garden-residence",
  "title": "The Garden Residence",
  "listing_type": "sale",
  "summary": "Modern residential pavilion wrapped around secluded botanical courtyards, creating a serene urban retreat.",
  "city": "Dallas",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAkKMvVJNO1akHg_-gPTQHUJlIlLyqfbkyDL7FZxarAv1ZZSHbevv73dQ-eSG6JCfhu4K2b0Vc9ilY1d7E4-6PGSe0snwY_dQPyaMqvxmol55SYy8i34IyspJ7RbXMevlAYGYTfleERUdM8DUf7cc7632_aoXke4HBz_cmjHFTA6yUcoTJmk85IZRN7CfYAYdNOnNT3CT5KOB89Y4dOC7w7ZiezU5Ge8TJ6rPHLqQFvjCC-_m7klJci"
 },
 {
  "subtitle": "",
  "description": "A minimalist sanctuary of concrete and limestone arranged around a Zen courtyard. Exclusive mandate.\n\n3.40m ceiling clearances throughout the main pavilion; a private basin and pruned pine anchor the central court.",
  "property_type": "residence",
  "status": "available",
  "badge": "For Sale — Exclusive Mandate",
  "featured": true,
  "published": true,
  "price": 14200000,
  "price_label": "Price on Request",
  "currency": "CHF",
  "rent_pcm": null,
  "region": "Zürich",
  "country": "Switzerland",
  "neighborhood": "Zürich Environs",
  "address": "Zürich Environs, Switzerland",
  "latitude": 47.3769,
  "longitude": 8.5417,
  "bedrooms": 4,
  "bathrooms": 3,
  "area_sqft": 4520,
  "area_sqm": 420,
  "lot_size": "0.4 ha",
  "year_built": 2021,
  "architect": "Atelier Ruinelli",
  "materials": "Fair-faced concrete, Jura limestone",
  "parking": "Secure garage",
  "features": [
   "Garden or Courtyard",
   "Secure Parking / Garage",
   "Outdoor Space / Pavilion",
   "Home Study or Atelier"
  ],
  "gallery": [
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBBEtGkubOaQBPWAkRmc4AnKxSwIdRDiRnXPdhoZsV7WtUkz9VZv9kf-CL_wf3sJmU_rAnxosIprBwzQbkKk7So7bhzrp6wNHmvpIE8pmR-RpCTeiuRXaO8wYVUW7R9mYyqBGugM4HLSovmfDVXTnlzCgwuzAHhczW1kTX6Rw_R9RiZKK-oxS_oRu559ln0qEh2Iowe6mwRYPKglkAB-0x4G1lrnnUVCsSAb1pwxAIjhmju-NePH6F4",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuALVazQaNGJeK5jIzLPf0EIa07Kmb4hMKLPeMPqWZxl5OKuMf639x-dUaI2o8g0boRqQGUVprOPIh2vF9geMpoUVuzAGaouW6Aq1IvnVfY4gX1Aty4-GzH9dBuggsEwuvwGgQLGM81YXhE2lzgS37Od15vSy3OoEuqWlxHD13X8lFKbYGCArtp4kfXxcycfp_Tm6WEdeoGs6izwbKsVF500NydbQBCdQNxHAl3viQMLW-y36vOW-y9k",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuC-_s8ndiPcNk5f0MlfVt15yBgaP_-80t3uwDMzGYdyWRzPiFnWMozqynjLASmH1in2tGrWo0sD7npMexEfTvzV2SqB0ucb4J48RLwxIMJPQXk_oPdkfPXGtVLcyma04HKAyfxkGipiIf_9vKx6xcJGYBY53_VW60XQT-2k_3LCA_1MwHMdmcTw35dHHzyys9NsGUk3_5WJDVGQv8mpoa1cPM5OMOByjrkgTAz5XybZcWGiC2lxK4or",
    "caption": ""
   }
  ],
  "floor_plan_url": "",
  "specs": [
   {
    "label": "Reference",
    "value": "CH-8022"
   },
   {
    "label": "Title",
    "value": "Freehold"
   }
  ],
  "available_from": null,
  "lease_term": "",
  "furnished": false,
  "views": 220,
  "created_at": "2026-09-23T14:07:46.523Z",
  "updated_at": "2026-10-18T14:07:46.523Z",
  "id": "76531e1e-22cb-489f-a635-398a899ea431",
  "slug": "the-pavilion-villa-zurich",
  "title": "The Pavilion Villa — Minimalist Concrete & Limestone Sanctuary",
  "listing_type": "sale",
  "summary": "A minimalist concrete and limestone sanctuary with a Zen courtyard and basin.",
  "city": "Zürich Environs",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBBEtGkubOaQBPWAkRmc4AnKxSwIdRDiRnXPdhoZsV7WtUkz9VZv9kf-CL_wf3sJmU_rAnxosIprBwzQbkKk7So7bhzrp6wNHmvpIE8pmR-RpCTeiuRXaO8wYVUW7R9mYyqBGugM4HLSovmfDVXTnlzCgwuzAHhczW1kTX6Rw_R9RiZKK-oxS_oRu559ln0qEh2Iowe6mwRYPKglkAB-0x4G1lrnnUVCsSAb1pwxAIjhmju-NePH6F4"
 },
 {
  "subtitle": "",
  "description": "Natural travertine, coffered ceilings and a wraparound terrace frame views across the London skyline.\n\nShare of freehold (999 years).",
  "property_type": "penthouse",
  "status": "available",
  "badge": "For Sale",
  "featured": true,
  "published": true,
  "price": 11850000,
  "price_label": "Price on Request",
  "currency": "GBP",
  "rent_pcm": null,
  "region": "Kensington",
  "country": "United Kingdom",
  "neighborhood": "Kensington",
  "address": "Kensington, London, UK",
  "latitude": 51.5009,
  "longitude": -0.1925,
  "bedrooms": 3,
  "bathrooms": 3.5,
  "area_sqft": 3336,
  "area_sqm": 310,
  "lot_size": "",
  "year_built": 2019,
  "architect": "Chipperfield Studio",
  "materials": "Travertine, bronze, smoked oak",
  "parking": "Valet bay",
  "features": [
   "Secure Parking / Garage",
   "Home Study or Atelier",
   "Balcony or Terrace"
  ],
  "gallery": [
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAoYXHwoUGha7JfUFxJN8ttoT1u_vxhVAhwVnOnlAWitSogfD7N3ok1IYS8zrmLppddzeQTtXNEoZ6_svvxzHhAqYOo_5FBm5QKJ6fKiikhWa4nbYpGAQ8H8IVvoiA_qMdVsiQVN34_gs0ZplyPNE8hg-3WRdGIueOWc3gbJ6h_ZKKq4o9YXMAlhJ8MHgipXj5BwzZOLr3AbQ2vwwGqTGIyTzZkPQXBGAdQGYi7snXLKli7gulWVP7D",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuALVazQaNGJeK5jIzLPf0EIa07Kmb4hMKLPeMPqWZxl5OKuMf639x-dUaI2o8g0boRqQGUVprOPIh2vF9geMpoUVuzAGaouW6Aq1IvnVfY4gX1Aty4-GzH9dBuggsEwuvwGgQLGM81YXhE2lzgS37Od15vSy3OoEuqWlxHD13X8lFKbYGCArtp4kfXxcycfp_Tm6WEdeoGs6izwbKsVF500NydbQBCdQNxHAl3viQMLW-y36vOW-y9k",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuC-_s8ndiPcNk5f0MlfVt15yBgaP_-80t3uwDMzGYdyWRzPiFnWMozqynjLASmH1in2tGrWo0sD7npMexEfTvzV2SqB0ucb4J48RLwxIMJPQXk_oPdkfPXGtVLcyma04HKAyfxkGipiIf_9vKx6xcJGYBY53_VW60XQT-2k_3LCA_1MwHMdmcTw35dHHzyys9NsGUk3_5WJDVGQv8mpoa1cPM5OMOByjrkgTAz5XybZcWGiC2lxK4or",
    "caption": ""
   }
  ],
  "floor_plan_url": "",
  "specs": [
   {
    "label": "Reference",
    "value": "UK-4019"
   },
   {
    "label": "Title",
    "value": "Share of Freehold (999 yrs)"
   }
  ],
  "available_from": null,
  "lease_term": "",
  "furnished": false,
  "views": 198,
  "created_at": "2026-09-23T14:07:46.523Z",
  "updated_at": "2026-10-18T14:07:46.523Z",
  "id": "4ade2c0f-3b71-4388-a28f-df103777a79c",
  "slug": "the-travertine-penthouse-london",
  "title": "The Travertine Penthouse — Panoramic Skyline Residence",
  "listing_type": "sale",
  "summary": "A sky-high penthouse in natural stone with a wraparound skyline terrace.",
  "city": "London",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAoYXHwoUGha7JfUFxJN8ttoT1u_vxhVAhwVnOnlAWitSogfD7N3ok1IYS8zrmLppddzeQTtXNEoZ6_svvxzHhAqYOo_5FBm5QKJ6fKiikhWa4nbYpGAQ8H8IVvoiA_qMdVsiQVN34_gs0ZplyPNE8hg-3WRdGIueOWc3gbJ6h_ZKKq4o9YXMAlhJ8MHgipXj5BwzZOLr3AbQ2vwwGqTGIyTzZkPQXBGAdQGYi7snXLKli7gulWVP7D"
 },
 {
  "subtitle": "",
  "description": "A restored 19th-century limestone townhouse with original plasterwork, a new rear garden and a quiet sequence of salons.",
  "property_type": "townhouse",
  "status": "available",
  "badge": "For Sale — Heritage Archive",
  "featured": false,
  "published": true,
  "price": 18500000,
  "price_label": "Price on Request",
  "currency": "USD",
  "rent_pcm": null,
  "region": "New York",
  "country": "United States",
  "neighborhood": "Upper East Side",
  "address": "Upper East Side, New York, NY",
  "latitude": 40.7736,
  "longitude": -73.9566,
  "bedrooms": 5,
  "bathrooms": 4,
  "area_sqft": 6240,
  "area_sqm": 580,
  "lot_size": "",
  "year_built": 1892,
  "architect": "Restoration by Beyer Blinder Belle",
  "materials": "Indiana limestone, oak, plaster",
  "parking": "On request",
  "features": [
   "Garden or Courtyard",
   "Home Study or Atelier",
   "Recently Renovated / Restored"
  ],
  "gallery": [
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBknC0q-gattUNAmZnVQdSXlglVjpcEzxENK0O9G1FVtKJSiph4tALYxOf7jjyErd9qmq_plTfWLk4eQ6Ei5z2C1lvbdhfdvjjpCeYv7p_jIY08RbKFt1NXO4YAJaPZTvwGd_0Ji9sfT_yW1ckQl-inMQcLfujd3UCrtDrDjNFC-J9srYuJf4rwFqb9vnw3lzIdsDGYb1pV_eYo_za58MefzwseO3Osw5s3pg3_0yd0Bjg_Wu6yKJah",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuALVazQaNGJeK5jIzLPf0EIa07Kmb4hMKLPeMPqWZxl5OKuMf639x-dUaI2o8g0boRqQGUVprOPIh2vF9geMpoUVuzAGaouW6Aq1IvnVfY4gX1Aty4-GzH9dBuggsEwuvwGgQLGM81YXhE2lzgS37Od15vSy3OoEuqWlxHD13X8lFKbYGCArtp4kfXxcycfp_Tm6WEdeoGs6izwbKsVF500NydbQBCdQNxHAl3viQMLW-y36vOW-y9k",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuC-_s8ndiPcNk5f0MlfVt15yBgaP_-80t3uwDMzGYdyWRzPiFnWMozqynjLASmH1in2tGrWo0sD7npMexEfTvzV2SqB0ucb4J48RLwxIMJPQXk_oPdkfPXGtVLcyma04HKAyfxkGipiIf_9vKx6xcJGYBY53_VW60XQT-2k_3LCA_1MwHMdmcTw35dHHzyys9NsGUk3_5WJDVGQv8mpoa1cPM5OMOByjrkgTAz5XybZcWGiC2lxK4or",
    "caption": ""
   }
  ],
  "floor_plan_url": "",
  "specs": [],
  "available_from": null,
  "lease_term": "",
  "furnished": false,
  "views": 154,
  "created_at": "2026-09-23T14:07:46.523Z",
  "updated_at": "2026-10-18T14:07:46.523Z",
  "id": "e7db3bda-0766-4601-a073-6e77624aea01",
  "slug": "the-limestone-townhouse-new-york",
  "title": "The Limestone Townhouse — 19th-Century Restored Residence",
  "listing_type": "sale",
  "summary": "A meticulously restored 19th-century limestone townhouse on the Upper East Side.",
  "city": "New York",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBknC0q-gattUNAmZnVQdSXlglVjpcEzxENK0O9G1FVtKJSiph4tALYxOf7jjyErd9qmq_plTfWLk4eQ6Ei5z2C1lvbdhfdvjjpCeYv7p_jIY08RbKFt1NXO4YAJaPZTvwGd_0Ji9sfT_yW1ckQl-inMQcLfujd3UCrtDrDjNFC-J9srYuJf4rwFqb9vnw3lzIdsDGYb1pV_eYo_za58MefzwseO3Osw5s3pg3_0yd0Bjg_Wu6yKJah"
 },
 {
  "subtitle": "",
  "description": "A cantilevered water pavilion in blackened timber, with a private pier and mooring on the shore of Lake Como. Off-market — by advisory mandate only.",
  "property_type": "residence",
  "status": "available",
  "badge": "Private Off-Market",
  "featured": false,
  "published": true,
  "price": null,
  "price_label": "Advisory Mandate / Inquire",
  "currency": "EUR",
  "rent_pcm": null,
  "region": "Lombardy",
  "country": "Italy",
  "neighborhood": "Lake Como",
  "address": "Lake Como, Northern Italy",
  "latitude": 45.9936,
  "longitude": 9.2573,
  "bedrooms": 4,
  "bathrooms": 4,
  "area_sqft": 4950,
  "area_sqm": 460,
  "lot_size": "",
  "year_built": 2020,
  "architect": "Studio Zanon",
  "materials": "Charred larch, glass, local stone",
  "parking": "Private pier & mooring",
  "features": [
   "Garden or Courtyard",
   "Outdoor Space / Pavilion",
   "Balcony or Terrace"
  ],
  "gallery": [
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuD6hlA0LXJq2qJOS-hKZkJiBco9ff5qnTeKK1A-g0V-MAr39BjfFoeBEF3h_jEQmtFzxbHPhBZQ_kjU5ebx2ZlGxOLpQR7xRLuPG3fsh2QsF5x2ly00vvDcQIL5rIJFODNeuwQw8kzIMkJ7skUiJtHFYRWh9qLY5boIkpilA0gCHURCth4r4235qeNaDJCM5l0b_sRah4zn_5uTelPwcKr2M56KIcqtJZEScYpJSIUw0Xbd2iRx8eEk",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuByN3ARX0kcXfE4-5ycCLwHXlUPYsIrQx1YZNy57kUP_Y30KrT0RWaYyCt9g0hFd7Olib7os26fjlpfFU9QFUxEkMwa6UqN6T99EfVSNjNrmSGUaJx5br85sLYw5rvc4jiPOm1nP1__-n_En-kFvJqtybvb-9C-oHD28cz9cTR4_gVako_xOneJJwjQr6c-9NdgpZn_k3xsk46CsTVE_HyyU22mjDT2l3tz5jjikC98se8vL_UqTOUH",
    "caption": ""
   }
  ],
  "floor_plan_url": "",
  "specs": [
   {
    "label": "Reference",
    "value": "IT-2108"
   }
  ],
  "available_from": null,
  "lease_term": "",
  "furnished": false,
  "views": 177,
  "created_at": "2026-09-23T14:07:46.523Z",
  "updated_at": "2026-10-18T14:07:46.523Z",
  "id": "3e659769-44f0-4193-a8d3-ba39f718336e",
  "slug": "the-lakeside-timber-retreat-lake-como",
  "title": "The Lakeside Timber Retreat — Cantilevered Water Pavilion",
  "listing_type": "sale",
  "summary": "A cantilevered timber pavilion on Lake Como with a private pier and mooring.",
  "city": "Lake Como",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuD6hlA0LXJq2qJOS-hKZkJiBco9ff5qnTeKK1A-g0V-MAr39BjfFoeBEF3h_jEQmtFzxbHPhBZQ_kjU5ebx2ZlGxOLpQR7xRLuPG3fsh2QsF5x2ly00vvDcQIL5rIJFODNeuwQw8kzIMkJ7skUiJtHFYRWh9qLY5boIkpilA0gCHURCth4r4235qeNaDJCM5l0b_sRah4zn_5uTelPwcKr2M56KIcqtJZEScYpJSIUw0Xbd2iRx8eEk"
 },
 {
  "subtitle": "",
  "description": "A contemporary apartment in the Upper Pavilion of Cadogan Belvedere, with full-height glazing, a private terrace and acoustic-grade partitions.",
  "property_type": "apartment",
  "status": "available",
  "badge": "Available March",
  "featured": true,
  "published": true,
  "price": null,
  "price_label": "£9,800 per month",
  "currency": "GBP",
  "rent_pcm": 9800,
  "region": "Knightsbridge",
  "country": "United Kingdom",
  "neighborhood": "Cadogan Square",
  "address": "Unit 07 B, Upper Pavilion, Cadogan Square, SW1X",
  "latitude": 51.4975,
  "longitude": -0.1566,
  "bedrooms": 3,
  "bathrooms": 2,
  "area_sqft": 1830,
  "area_sqm": 170,
  "lot_size": "",
  "year_built": null,
  "architect": "",
  "materials": "",
  "parking": "",
  "features": [
   "Secure Parking / Garage",
   "Balcony or Terrace"
  ],
  "gallery": [
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDoFZtgXO6vDr11Sa_Da3JgJaQBkrAAYBx8keUqu_d1794iqNM8F3PdW9KDabK63C2EI_fU9qlOJlOT07NOQvSCLAPIa1iT4nLKJKr1i2BsKwHcbRhKjgm6uqRtQfjPRQa9A0lwRHheTxfBbVyHz9fCYoOdoBUksbkiMX4Z8DITHtqkhrSuYewhO8oBU1bKyH9upwVtDGKc3FimGCvFgYoHhcaeHUdFSkGZ4J-Yte9VNcCjFgiMsJbq",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBMLaG6kZaiHn16f4PYI0tObJmNRGbqUy_hpGTWEt0WF5D1AwKH9gvYkMzAYDFTsSfA87mKkJ5CXgMduZMkiv-74krk7kQWRMbPlRKBgFHrtPxkgsvpdg8oaUDmV2K6qsPfoOMrHeFeRjl5hjHa2pQEWKy8519lcX1ux8qB9DRp9N9E91ewuAOaXYmf2ZBfcp7_Y5Ocp0Pl_jyXFrZXCUTHU_-s33odazPJ820n5NBVvHKQfkJ7Cxmz",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBMF2rWBJz9cKMG8Ldhb_i_uPWCABr1v4sH-AcOn8u4e82ha7lixkrkyoSTc0oNyjuRhPUINzhV0DNuMsTrf80bUNff3bd3gFWtKW84vV9vCJaE_BcLf2pEqkqfZFc7VsbOlOLn_ioArcX1LxE4mLE5nb3n9B-vUxtUkSfNivsicBcbvHN0e8xusbPJ0x2UrMt6M2_IU54SMB_aViv0fce_gdaV6dNKW_rSAq6O5fE1zJ98ewtEW4BF",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCSYv_EFCM2POCadKobqI2y5FVxxJVo1nWDzXFnRA-j86RYMq8C147SpRq-T4vp1Uwcn3YtVVCFA3cWAk81CkxyGyjnfz7lnk9cVJW3MgChS7Q0CxcHfTyLDkbL6CV4MuW3P0YyqoxYgUBaAqHo9vZ1PJi0gUjeYDBJvANoQ965IOFE72CVLX6U5wxmAp4jeFpFIrBbDSNc7TkDORAd_O29BQx5ekZXFIC4N7hTCh9htbSxqQbywJPm",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAo63cS0WdgVv5FL-NAKHlKiBK4myauLW4q6Nv7GrYDWsR9zKhE9l5DQFYvRB0-pxLq2ziP_-7SbXv4R35Cc9-tY7tWo2tbHJSdedQIPrbyCQY2XllXNFMLf4tBx48yP6vjYOOYlwEh4nH75goxMSf4giHDtQgdvRQ2gtEADkUg8bDR7QT6FWaQ5z6GJ9_w40LgewcNDJdwWR8fC2F3ryM6WVRCdn_xvZUCwx5wH6QKq2aeORuwqLoX",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAWyiU3BMIfWK3Yrf3k2swzA1oUPITs31iLbGDPGFNnGpfmwOg9w-wGWHUp1-MUDD-vx03MtY0q77JRc3NCQhL72bNik-gn0Orc1DmhsklvTR7KhM6QfWTcQ5CjCAFzWiJFaphhe4vNW79LBDrT-gUey1mBI8WpPurBWOCNn4Szw2Yr1ZM03VFoFlUzgriFC9UwnSG6XfX4UoJjL_vOLzLWRQA98rNVbRUmjNVLZ7ohradlWJloAo6v",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAqnFjF3RypRsiBIujGBJZlb_s3hUkag6v_meGq2yQ2oSNADB6O9GTDsTnDKdkOwqk41r1qxlHYSUFvMQCBD4KKqLnXs-Bi20rNgoPmXnOXNh3vJar_de07bfiRMG0uvMp5vn1LUs2R02wkB4n9QshXH50DviTeiejhVFHxeqwbCpuvPW7SsVG2qvgs9SHvsK2CYDtK0KMXbyxiUwB6AU7-xDbzWyN_FGRbvUFj2wiGPIYSfQvkt7et",
    "caption": ""
   }
  ],
  "floor_plan_url": "",
  "specs": [],
  "available_from": "2026-12-03",
  "lease_term": "12–24 months",
  "furnished": true,
  "views": 98,
  "created_at": "2026-09-23T14:07:46.523Z",
  "updated_at": "2026-10-18T14:07:46.523Z",
  "id": "10bff221-8695-4c7f-ad92-ac6e5a723881",
  "slug": "the-glass-terraces-at-cadogan-belvedere",
  "title": "The Glass Terraces at Cadogan Belvedere",
  "listing_type": "rent",
  "summary": "Unit 07 B, Upper Pavilion — a light-filled apartment above Cadogan Square.",
  "city": "London",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuDoFZtgXO6vDr11Sa_Da3JgJaQBkrAAYBx8keUqu_d1794iqNM8F3PdW9KDabK63C2EI_fU9qlOJlOT07NOQvSCLAPIa1iT4nLKJKr1i2BsKwHcbRhKjgm6uqRtQfjPRQa9A0lwRHheTxfBbVyHz9fCYoOdoBUksbkiMX4Z8DITHtqkhrSuYewhO8oBU1bKyH9upwVtDGKc3FimGCvFgYoHhcaeHUdFSkGZ4J-Yte9VNcCjFgiMsJbq"
 },
 {
  "subtitle": "",
  "description": "A bright, modern two-bedroom residence a short walk from Lady Bird Lake, with a generous terrace and concierge services.",
  "property_type": "apartment",
  "status": "available",
  "badge": "Flexible Lease",
  "featured": false,
  "published": true,
  "price": null,
  "price_label": "$6,200 per month",
  "currency": "USD",
  "rent_pcm": 6200,
  "region": "Texas",
  "country": "United States",
  "neighborhood": "Downtown Austin",
  "address": "Downtown Austin, TX",
  "latitude": 30.2672,
  "longitude": -97.7431,
  "bedrooms": 2,
  "bathrooms": 2,
  "area_sqft": 1480,
  "area_sqm": 137,
  "lot_size": "",
  "year_built": null,
  "architect": "",
  "materials": "",
  "parking": "",
  "features": [
   "Secure Parking / Garage",
   "Balcony or Terrace"
  ],
  "gallery": [
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCmge4t02Sq9xQnpuMfCgopgoRM-YwCEfsX9ZmCsSYH6BaeoeH5U8pE7yp6uS6eIVnj9kvnxTUjpk-Tus3f5ogOYUCdTfRidj1IuRx_MlYSSPL5NBy1iLiQN63lslAZGjtf142CZdybTzmiQFbvZtgKYdynHnd7-4jtRIqKweZxF_V9UxWppVDsXYWPRlBV7_CdsHEieGfY4BWduj5Cf5EB0y1Od3rsoejPn-pfxzNdKW_gc-rGSnnj",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCzXF_aelupkz1DD5pIGbjQlA1jwSdq1rEzKB08_6Sj-ISWjIufD-4bckTT7sG1gVl10hBggeeWf3uDp50dBcMDQU8eZyvIzxNXIDApQaqTSD0IIWwMUcScl-TTFM1PDpc7xLQtHGB_sAhFFAKR7lZt27pl4R3004ymJD0OW9-pttlIPAk99KncVDO6rhHlqaYpIuFRtC1RJIvzHxteIL11jVHoYAanwPRis1v5n655aBDEmHn0Ts4o",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAHg4NhIT5r2GgIfm_Tw8lh11ymkCmg8LTR_3cvPooaH6_TGylTf4lVlWaLpkw7In4SdlkxdLkkk7zieMrEv0X40A5XyMccJcyp9B_soFjyraOxs-HOCZnUbvjQwiHY1fB98gMB0zYwYTjYRVvwzRdYzxT7R7T1SGwvoU9LMaFsy6BK5mGGa0LqVgvHwn6aQr8ZWI9WwzFD48ZJH9Hg4s-vacyybPf6s22pNgyRlzYyuJV7NCed8AgR",
    "caption": ""
   }
  ],
  "floor_plan_url": "",
  "specs": [],
  "available_from": null,
  "lease_term": "6–18 months",
  "furnished": false,
  "views": 61,
  "created_at": "2026-09-23T14:07:46.523Z",
  "updated_at": "2026-10-18T14:07:46.523Z",
  "id": "441aa19f-d8a8-419b-aff2-ff977a5ba020",
  "slug": "modern-urban-residence-austin",
  "title": "Modern Urban Residence",
  "listing_type": "rent",
  "summary": "A modern urban residence in downtown Austin with a private terrace.",
  "city": "Austin",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCmge4t02Sq9xQnpuMfCgopgoRM-YwCEfsX9ZmCsSYH6BaeoeH5U8pE7yp6uS6eIVnj9kvnxTUjpk-Tus3f5ogOYUCdTfRidj1IuRx_MlYSSPL5NBy1iLiQN63lslAZGjtf142CZdybTzmiQFbvZtgKYdynHnd7-4jtRIqKweZxF_V9UxWppVDsXYWPRlBV7_CdsHEieGfY4BWduj5Cf5EB0y1Od3rsoejPn-pfxzNdKW_gc-rGSnnj"
 },
 {
  "subtitle": "",
  "description": "A quiet four-bedroom family home in Highland Park with a private garden, home office and a calm, tree-lined setting.",
  "property_type": "residence",
  "status": "available",
  "badge": "Curated Tenancy",
  "featured": false,
  "published": true,
  "price": null,
  "price_label": "$8,400 per month",
  "currency": "USD",
  "rent_pcm": 8400,
  "region": "Texas",
  "country": "United States",
  "neighborhood": "Highland Park",
  "address": "Highland Park, Dallas, TX",
  "latitude": 32.8337,
  "longitude": -96.8007,
  "bedrooms": 4,
  "bathrooms": 3.5,
  "area_sqft": 3100,
  "area_sqm": 288,
  "lot_size": "",
  "year_built": null,
  "architect": "",
  "materials": "",
  "parking": "",
  "features": [
   "Garden or Courtyard",
   "Secure Parking / Garage",
   "Home Study or Atelier"
  ],
  "gallery": [
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAug7uJMhJPttvdkL4oN9vKWhwVNVvUxDA6MMJ5SBwhyQG8T0W9nuDFTXDybufS24focxc46GKZKdzaTaiwH88l5dFqtF0BkL7PyKGSEUfIKDBcHM51TaUSRxs7BVEveYwuxfqVT4TjqGHbHX7yL3VDSb71K_LgH0dZHSBbdC-P8sUVtQJjOeA4uMFkfbtvTcT5SII_zsjRHLiLX4nLjFSa9leRXyR2UhIq6u9c8DoQGQ49ZFYuGu68",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDS9_V0jxHcRtbX9X3fcG7dks82ekeZPmLElu-KZUkFFU1qEsOevZKMDwXIL5zR_xveZ8ddyRMB9vkZeG7mHZ9h2LRfBEE1w6NxfNzKEHUYrXq-lbMETSKw-rxIiTRpTZ1630dIOH8_m-GQ2xM3UnaFdr95RBrAMHZ3760HLSOlTRuX_UJkIcfQU6BKDDtCRn5osb-dVdAzHWBdqjUejLjiogsUocv53TgPbZ9noJj9SEKjxRNVk6o2",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAH2gNLqasAKhuQ2Y-PFPxIQ77s46UMWoOCEH7AV4Ro9VmlNhzA55XWt9e5XFD7pbhpBEHmBbe3eZBZEBc0ySIaHHdMr5KLCGJ1ayTFCiaJTSTkCfkI0Oi6AM2N-m-kwrSezJDPKRGyndbuLiZdvnsZgeSEzQ4Iypx9d3hMV38UrHlWNLFc2hkLkZdf9N9ORJZJ2PwiDhpw-hNXKYbjEW65vNNVbkp8SYWR21TR2qMmMrbGenXFVudE",
    "caption": ""
   }
  ],
  "floor_plan_url": "",
  "specs": [],
  "available_from": null,
  "lease_term": "12–36 months",
  "furnished": false,
  "views": 74,
  "created_at": "2026-09-23T14:07:46.524Z",
  "updated_at": "2026-10-18T14:07:46.524Z",
  "id": "b9030edb-42b7-48f4-a4da-381083a1ae1b",
  "slug": "considered-family-home-dallas",
  "title": "Considered Family Home",
  "listing_type": "rent",
  "summary": "A considered four-bedroom family home with a private garden in Highland Park.",
  "city": "Dallas",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAug7uJMhJPttvdkL4oN9vKWhwVNVvUxDA6MMJ5SBwhyQG8T0W9nuDFTXDybufS24focxc46GKZKdzaTaiwH88l5dFqtF0BkL7PyKGSEUfIKDBcHM51TaUSRxs7BVEveYwuxfqVT4TjqGHbHX7yL3VDSb71K_LgH0dZHSBbdC-P8sUVtQJjOeA4uMFkfbtvTcT5SII_zsjRHLiLX4nLjFSa9leRXyR2UhIq6u9c8DoQGQ49ZFYuGu68"
 },
 {
  "subtitle": "",
  "description": "A contemporary one-bedroom apartment in the Old Town arts district, with a private balcony, mountain views and secure parking.",
  "property_type": "apartment",
  "status": "available",
  "badge": "Available March",
  "featured": false,
  "published": true,
  "price": null,
  "price_label": "$4,300 per month",
  "currency": "USD",
  "rent_pcm": 4300,
  "region": "Arizona",
  "country": "United States",
  "neighborhood": "Old Town Scottsdale",
  "address": "Old Town Scottsdale, AZ",
  "latitude": 33.4942,
  "longitude": -111.9261,
  "bedrooms": 1,
  "bathrooms": 1.5,
  "area_sqft": 1050,
  "area_sqm": 98,
  "lot_size": "",
  "year_built": null,
  "architect": "",
  "materials": "",
  "parking": "",
  "features": [
   "Secure Parking / Garage",
   "Balcony or Terrace"
  ],
  "gallery": [
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuD8rAY8wlAtc582zt6j44EaipmcOlSN-aFavqPiSeg5BeRT3Xp4lN8nDC9XSeNz21AcLsahwT9ldSdJKDU-YUYkGmL7s6FdIl1867UAR0HCeYm8-tB-xhqlzQWrCE-4NIRkbn6XfJx_s0xQPST7EisZ8-pzfD2c8kvOTHXWWD8QLM-_B748tSKC-GTRzogAuhYEdwL5ghixp3LQL7dy5-IUUcI-0gZZ-58TnfEpgRPNjTFJ6eV1PQDa",
    "caption": ""
   },
   {
    "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCzXF_aelupkz1DD5pIGbjQlA1jwSdq1rEzKB08_6Sj-ISWjIufD-4bckTT7sG1gVl10hBggeeWf3uDp50dBcMDQU8eZyvIzxNXIDApQaqTSD0IIWwMUcScl-TTFM1PDpc7xLQtHGB_sAhFFAKR7lZt27pl4R3004ymJD0OW9-pttlIPAk99KncVDO6rhHlqaYpIuFRtC1RJIvzHxteIL11jVHoYAanwPRis1v5n655aBDEmHn0Ts4o",
    "caption": ""
   }
  ],
  "floor_plan_url": "",
  "specs": [],
  "available_from": null,
  "lease_term": "6–12 months",
  "furnished": true,
  "views": 49,
  "created_at": "2026-09-23T14:07:46.524Z",
  "updated_at": "2026-10-18T14:07:46.524Z",
  "id": "2d55350b-11f2-4236-a605-bd287114654c",
  "slug": "contemporary-apartment-scottsdale",
  "title": "Contemporary Apartment",
  "listing_type": "rent",
  "summary": "A contemporary desert-modern apartment in Old Town Scottsdale.",
  "city": "Scottsdale",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuD8rAY8wlAtc582zt6j44EaipmcOlSN-aFavqPiSeg5BeRT3Xp4lN8nDC9XSeNz21AcLsahwT9ldSdJKDU-YUYkGmL7s6FdIl1867UAR0HCeYm8-tB-xhqlzQWrCE-4NIRkbn6XfJx_s0xQPST7EisZ8-pzfD2c8kvOTHXWWD8QLM-_B748tSKC-GTRzogAuhYEdwL5ghixp3LQL7dy5-IUUcI-0gZZ-58TnfEpgRPNjTFJ6eV1PQDa"
 }
]
$json$::jsonb)
on conflict (id) do nothing;

insert into public.neighborhoods ("id", "slug", "name", "city", "tagline", "description", "image", "sort", "published")
select "id", "slug", "name", "city", "tagline", "description", "image", "sort", "published" from jsonb_populate_recordset(null::public.neighborhoods, $json$
[
 {
  "id": "ff9509a1-839f-4567-ad97-e65b2366bb44",
  "slug": "west-lake-hills",
  "name": "West Lake Hills",
  "city": "Austin, Texas",
  "tagline": "Hill Country Tranquility",
  "description": "A landscape-led residential setting known for its wooded hills, distinctive homes, and a close relationship with the outdoors.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuACy9BCan-bn56b5pPlpWvdHtwB2zy8QPhqL2dTJWku62VGv8VSvO5NlJOFsfA2lugTDnY8DprbBCkggxhJ5m8ihGHE_KyDCupk8UE7Yos9C034UTXkORzcMCySETt9VULRJ8vIRWAk2poeJ5AiPUGsvbsiH3srxfTHYWjM2QqamVXsy1Jm4JvgTQT6mhsjPzx4dmAQJYKpTk7ee-p0-X7eEbYcVM-efDBuv-R6WRTcsY27IDBp4mOz",
  "sort": 1,
  "published": true
 },
 {
  "id": "e62089ef-2755-4ff8-a781-1202ec79058f",
  "slug": "highland-park",
  "name": "Highland Park",
  "city": "Dallas, Texas",
  "tagline": "Established Streetscapes",
  "description": "A distinctive residential setting with established streetscapes, considered architecture, and a strong sense of neighborhood identity.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCV4kuI4VzyA7R9yg8S0c56PlSWtfclqHjMgsPFzWI4Uwe3E5cGNmxoRrigZI9_fds9aqPDRHL4TWmteFR4Dlb9NT5uQJJGcbro-b4ps3x3NNL2CiO2niQ08dxrWFzw_xj2FWV69vK1Y06w802iH4VBdPHB0UdHwxQfloNS29mLszwrtYULh2W9g23NTa2iF73w8mcY2nHYSgVBQoQXxO7tInu_CHJUCD001nJhf3fkzjMFaCwy-4O8",
  "sort": 2,
  "published": true
 },
 {
  "id": "363b0e38-f618-47f1-a87c-c0f86cdb8040",
  "slug": "paradise-valley",
  "name": "Paradise Valley",
  "city": "Arizona",
  "tagline": "Desert-Modern Sanctuary",
  "description": "A desert setting where architecture, open landscapes, and a quieter residential atmosphere come together.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuDhEeWyIdQXHhZxstmrjEzpUakPGPVaBuk2nEHd_1a1pEUsBoieAfS7Vf5U5NDgRybTm-FA9OtuaoRM7mwUmvylWbuaywUB5G_uzES-eo5SLsTUBwQ9HCHhvyrt-_bFsHQeFynJXfhV1Q9GBo9qyVGByIaTANbOrcOkN7If4xE27dOI-O_0BZdN_L1RK9StrAQhdDBCqvlM90-ylogGDdU1wxesv3My8hGs3Tgtq8tTKsJsz9p4QdfB",
  "sort": 3,
  "published": true
 },
 {
  "id": "7b53b036-3246-4615-a1c2-570e769335e4",
  "slug": "barton-creek",
  "name": "Barton Creek",
  "city": "Austin, Texas",
  "tagline": "Private Hillside & Golf Enclaves",
  "description": "Private hillside and golf enclaves just minutes from downtown Austin.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuALcCikK5c9MsNUBnCouJt2JJFEuuvrY-6bXv5gnLyMYftmpUoDrWFsgLtHwKTcOCzxwUkfoDxG49XjJ_0NDu8KF6zk_GpyDwSp70iH612j0vpETdTpiOQabxkNIdkVYsTOYJj21kLBBuaiceZitgOwS1nqzFLKp-Gq78pT8TEKDl17Dt9PWUgu2ytvbpkAFn-SNSLrEz4iZI0gNMzWdJWZ8WCboo_9Ft5h4Zq0KqyifplIymXS9sY_",
  "sort": 4,
  "published": true
 },
 {
  "id": "1c659699-183a-4a4e-a0b9-a6e223de17ef",
  "slug": "tarrytown",
  "name": "Tarrytown",
  "city": "Austin, Texas",
  "tagline": "Historic Oak Canopies & Lake Proximity",
  "description": "Historic oak canopies and a quiet proximity to Lake Austin.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuDTxs0xPNjOasBs5AsWJLg4uIxXjwx7uDXkAruuG921CF8bljYVBVpS_YpfXEQ2W_enLi2bKhoyNJMr1BpjhH_I1ZArhOYme5-j10qBRn9mx_OWcUO4JQ3vQ649BXCzYxZH9TsS-rY4sEanG5gKP6CfwEaO-IsZyUCkqMwtHyRmDMEMm5GB5QaY0FM3qsGu_h96ghZQQ67kn3n-bUgDOvvQDad-20sW_Tnd4APtX1tV5yu-ervSFzWf",
  "sort": 5,
  "published": true
 },
 {
  "id": "ec6328cd-3caa-41de-acae-036c641e5566",
  "slug": "preston-hollow",
  "name": "Preston Hollow",
  "city": "Dallas, Texas",
  "tagline": "Architecturally Significant Estates",
  "description": "Architecturally significant estates on generous, wooded parcels.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCNHJl7euHKH1x4p82IomQvhzGVH4GwqnfxLZgm9g9oezZfEId7Q_8OWeyZPFeXWFCu2iZAdvjUAQOjJ6PQJqqq-ItIGAUCNqlFKg1rnjb1BHzcWemXdDX75wjd4w7V60ZMGctQSj6OOIZ-lMD6GGWWNenfe-ra70I0C-DLS_1Ux4ffHCT8ldYqufExuaIs8na28uhwiKzbraq_MQY96ZrCMyp4ET7UW4UGZaVg2Kv5KTFhv-CQe1vU",
  "sort": 6,
  "published": true
 }
]
$json$::jsonb)
on conflict (id) do nothing;

insert into public.journal_posts ("id", "slug", "title", "category", "excerpt", "cover_image", "author", "read_time", "featured", "published", "published_at", "body")
select "id", "slug", "title", "category", "excerpt", "cover_image", "author", "read_time", "featured", "published", "published_at", "body" from jsonb_populate_recordset(null::public.journal_posts, $json$
[
 {
  "id": "f67de0c7-51a2-4b79-aac9-ae535138ce28",
  "slug": "what-makes-a-house-feel-like-home",
  "title": "What makes a house feel like home?",
  "category": "Architecture & Living",
  "excerpt": "Beyond floor plans and finishes, the right home is shaped by the details that influence how we live, gather, rest, and connect with the world around us.",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAEhiYG98fqkyodm_rMuzjYt0ZTuA1XdaFT6VKM1tcFzOEHwqDOiahBqdF6LYvDAIbNdbTgiJqkxxNI3d6-TdBQKpHaM5_0gLuneLfQmgVjOzFiUnjGAlHKHObQKCMi_DSNEObqBDmuEIU8Ii5aRtdryig3Cqumohhx9EFx7gwiff-7sJwBV9bkWGvXmcPaxB8Ux-hnB6DUUzeWjSvd-3aVtSucM7YnG1GET-C8zlgXEhxdZ5E981cV",
  "author": "FORME Editorial",
  "read_time": 6,
  "featured": true,
  "published": true,
  "published_at": "2026-09-28T14:07:46.524Z",
  "body": "A house becomes a home through accumulation: the way morning light crosses a kitchen table, the weight of a door, the sound of footsteps on stone.\n\nWhen we walk a property with clients, we pay as much attention to these thresholds as to square footage. They are the quiet details that decide whether a place will be lived in or merely occupied.\n\nThe best homes make room for ordinary life — and let it feel extraordinary."
 },
 {
  "id": "0d1cf0a6-b4d5-4634-ae93-7976afc5f1f0",
  "slug": "the-quiet-power-of-thoughtful-architecture",
  "title": "The quiet power of thoughtful architecture",
  "category": "Architecture",
  "excerpt": "How proportion, light, and material choices shape the way a space feels long after initial impressions fade.",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuB0TH6VPdcMt38jzSVRe2CHn1yidAa-TF0Hl8CKnMc29xMcFghIePJNgUobRUUPkfqq0Zlq6On5PXsn_UIXrVTAaTrBJLWJyW0KYrhe5MGB6lvTDstagrgkwHZ8dw5U5IJDioz-3ROq35zoibDABzYZz8HPb4-3CBuyN0RkU6KpyW0DWtnca3CspH21P8fOMyyvWPTCoBRRSfE4Xfxg0mV6WVnpQ5tEH0Y8pmTeHOmts0ARRvSyNbVv",
  "author": "FORME Editorial",
  "read_time": 5,
  "featured": false,
  "published": true,
  "published_at": "2026-10-02T14:07:46.524Z",
  "body": "Proportion is felt before it is understood. A ceiling a few inches higher, a window set a little lower — these decisions shape how we move through a space.\n\nLight does the rest. Orientation, depth of reveal and the colour of a surface determine whether a room feels calm at four in the afternoon.\n\nThoughtful architecture rarely announces itself. It simply makes everything else easier."
 },
 {
  "id": "ac59b12b-e7db-4080-a2f8-3661dd1b59d4",
  "slug": "finding-the-character-of-a-neighborhood",
  "title": "Finding the character of a neighborhood",
  "category": "Neighborhoods",
  "excerpt": "Looking beyond an address to understand the rhythm of everyday life, local craftsmanship, and pedestrian cadence.",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuDr6PSO6f12eRrXE8QzWWot5HIzIHSmCPv9ezUmPwyfZjAOQYxACffxPJ5AHoXjfcS8bG-Ops44xFuq9q_n5HInVv_qciX33pKIU4P_9ZDznrrMmTsTI_6F7wQDKuFWyuqDXw7F_wzASukGN-ltgEYhHss1OwIUVum-zTvhwhl_pttNLXzh6kqLDhVhYSoOmsHnv96qo5FOJ8AP7riDuKxVjLgfd1KQGTE35l8hUoxaKtTNvbR8Qr2D",
  "author": "FORME Editorial",
  "read_time": 4,
  "featured": false,
  "published": true,
  "published_at": "2026-10-05T14:07:46.524Z",
  "body": "Spend a morning, an evening and a weekend in the area before deciding. Notice who is out walking, where the lights are on, how traffic settles.\n\nNeighborhoods have a cadence. Understanding it is the surest way to know whether it will fit yours."
 },
 {
  "id": "f8d46c88-7caf-4708-a39f-ce29a0ea2d28",
  "slug": "questions-worth-asking-before-choosing-a-home",
  "title": "Questions worth asking before choosing a home",
  "category": "Property Insights",
  "excerpt": "A more considered framework to evaluate structural integrity, environmental microclimate, and the subtle friction points of layout before commitment.",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuABd_MTjTMeHR1XdUmhZv-ImGOCds-jKSH7DbLKwk__iF9EuJ8Tc1yV9TpJgwjhR2wsolxfSNzpivKymjc4sxiZDHdp5TpsZw6oQhoU9aBO3hkQPSXLAnr0XzoQm_M913FDISdaRM0LmVbT0KBkZ062LE8McUPwTtDkAVmr7j1Jnssh6FM-L7pbNBG8hKoryG1n4DJZiNxqKkLJN1OGtRYzBnWiKLmW2b2b17-v1W46uD8nLge6_aHy",
  "author": "FORME Editorial",
  "read_time": 7,
  "featured": false,
  "published": true,
  "published_at": "2026-10-09T14:07:46.524Z",
  "body": "Where does the sun fall in winter? How does the house sound when it rains? What happens at the front door when your hands are full?\n\nThese are not inspection items, but they are the questions that matter most after the first year."
 },
 {
  "id": "bd021d01-17c7-4039-aaa2-f0d0ebb37d10",
  "slug": "designing-a-home-around-the-way-you-live",
  "title": "Designing a home around the way you live",
  "category": "Considered Living",
  "excerpt": "Why daily routines and spatial acoustics can be far more impactful on well-being than sheer square footage.",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAmgdmPO0zpjuKGF_8-09nY0JdfEhJnMo3gmrhjwljLuEy6ojBuSumNCXVunhDCmMkwbsXiHYxWcche6SIqJF_BDoyOBHdp4KC6vXqDVHrKXJEYUsggSyXnev6BWNbHReoxrEHnLXJcfwysgi42ukF1ma_26jRdHrH0KLWcOfmZj4Ys20ehwFBmeiRJGpTROi7oBLKiIzk9qE9Ck3WgQV-PMqFey0C3aW5oVr7ivAo1ulN_Vw8Smbp1",
  "author": "FORME Editorial",
  "read_time": 5,
  "featured": false,
  "published": true,
  "published_at": "2026-10-13T14:07:46.524Z",
  "body": "Begin with routines, not rooms. Where do you read, cook, work, retreat?\n\nA home designed around these patterns will feel larger than its dimensions suggest."
 },
 {
  "id": "a5973b39-95d0-46d6-a3a9-4f706384d364",
  "slug": "natural-materials-lasting-character",
  "title": "Natural materials, lasting character",
  "category": "Architecture",
  "excerpt": "Exploring the appeal of timber, stone, texture, and honest finishes that age gracefully over decades.",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuA6v-LSAsdztFix7SqaUmmGl5j4xDgfUSK0IV1E5Jgrj3mOozi3nIikcBsJkdRWaxFICCKCag9cdB6BgaoSbYUOR8gvgvK2R7OJr_9mOpGFPDd5-Se48BIKmuH94aBS4BjrOqxQNl3mdM5xL8k0bXNl0mw4UOrsAQPjrazzcBiiLRiwqnoyoisEv17oNtpva3eNExzWhZVyZPgnaopsOoZaW9a-oT1cW3erUG7AsBIy2KXC4SNXmEJO",
  "author": "FORME Editorial",
  "read_time": 4,
  "featured": false,
  "published": true,
  "published_at": "2026-10-16T14:07:46.524Z",
  "body": "Stone softens with use. Timber darkens and deepens. Honest materials record the life of a house rather than hiding it."
 },
 {
  "id": "03b06dea-b54b-46d2-a069-3fe58ec62e57",
  "slug": "a-more-thoughtful-approach-to-property-discovery",
  "title": "A more thoughtful approach to property discovery",
  "category": "Property Insights",
  "excerpt": "How to quiet the noise of market saturation, narrow the search, and focus only on what genuinely fits your life.",
  "cover_image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBRB3uxHlpac7_WPnv_wtH3lM_tzfeuk5HR3w4ccHggt_vbtHP94R0FCPUeJYj2BxeKpn2kQtXO_giBUh8mQC-Kc6GFB76sp61Qk6EqafSmVABBsS5hG0_4ULqkRSQhYG_qdswaZEkbctqVQ2iJKb5Rj7_Pil6EHrs8ikPTeur8NfQZKRyfsQsW9Fuy2nN93-LR2UKa21XCGa1ydoFPK1upge2EsY3KI0y6b5lBPzOPH7HUwpKG5QMo",
  "author": "FORME Editorial",
  "read_time": 6,
  "featured": false,
  "published": true,
  "published_at": "2026-10-20T14:07:46.524Z",
  "body": "Fewer listings, better decisions. We begin by defining what a good day at home looks like, then work backwards to the places that make it possible."
 }
]
$json$::jsonb)
on conflict (id) do nothing;

insert into public.testimonials ("id", "client_name", "context", "ref", "quote", "image", "sort", "published")
select "id", "client_name", "context", "ref", "quote", "image", "sort", "published" from jsonb_populate_recordset(null::public.testimonials, $json$
[
 {
  "id": "b9ba0e11-0352-4857-a215-681c5c0809fa",
  "client_name": "M. & J. Hartley",
  "context": "Buying a Home · Historic Villa Restoration",
  "ref": "Ref. 091-B",
  "quote": "We never felt pressured. Every conversation was about understanding how we wanted to live — the house followed from that. The guidance throughout the acquisition was calm, precise and entirely free of noise.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAI7prBgQJDrltqtVVFZOOCeHzWrn6f3sm6k50JF-l81Did5MjhHfEwvqsX83voTul0HZqmkagzmYhos438jYHWeKIPNMJwfyCUMU0d0XVH8x42ngpoXIjWVIgBEy8z-ldZ-OUJD_-6iNa7_OwoOae17_4nJpU4N0WqL5_45m2vMOBItlD45AhUIw9JFkDxodXA29ENstvzS8N-kURkS5rqiPK1ZZCDJc-ZAbV6LX-kEXubp43iqRUo",
  "sort": 1,
  "published": true
 },
 {
  "id": "1232dff6-4dcd-4715-a040-e3adff81670b",
  "client_name": "A. Lindqvist",
  "context": "Selling a Property · Penthouse Realization",
  "ref": "Ref. 044-S",
  "quote": "Preparing the property with FORME was a revelation. The positioning was honest and measured, and the right buyer arrived without any theatre.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuDGQsQ8MvUyrbFWGOQL0pUxJixmCcCGoSCBl-_fMOTEg2DZmT_F6cJVl-JHDa2_QmdJDyO5R9ltPbxCBiS2_dMwK56mKgaR_FNDvo2cRNuw6BfUfWx1yk1kZ5gC0aAlEB9GDaSR2zdqiLi_JKjO_CfUUZlY98hZLpEIGp7_lw1wpvh5PGEoTeH4RDkgL175feQxHhlkSqoYOAM9vbY2-4vq1qLhZ0skIxLitRgDLdnq1zyUtljeDZOp",
  "sort": 2,
  "published": true
 },
 {
  "id": "16605f75-4537-42c7-aa97-9b34c2fce520",
  "client_name": "The Okafor Family",
  "context": "Property Advisory · Multi-Parcel Preservation",
  "ref": "Ref. 118-A",
  "quote": "Clear explanations, considered recommendations and an advisor who listened first. It made a complex, multi-generational decision feel manageable.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBcqsimKrDuX9-c4nfrBALpQ_tPs-QpUfKIV3skJc0Vft_Cji7FnTwruEAXh-qrAnbCII9zBEUBfrFqDHBulnnLJoCcGI_GBvmEFLYNwoSdvPSsYW5zEknfEmyI4DaTUAYZdQd7I1gtu3WrD4SH0mBZA0MtARMlTtxeeZ4jlG6h7qrH1kxd495IhAQi-4b8WLpEeEYsl3qG_lIdZ3Y-__EU6ldQpy07S-CENpn1T0k7x1IELvHQmsP1",
  "sort": 3,
  "published": true
 }
]
$json$::jsonb)
on conflict (id) do nothing;

insert into public.team_members ("id", "name", "role", "bio", "image", "sort", "published")
select "id", "name", "role", "bio", "image", "sort", "published" from jsonb_populate_recordset(null::public.team_members, $json$
[
 {
  "id": "6a2e63a3-b394-4b10-aeea-82660fa27c1a",
  "name": "Elena Marchetti",
  "role": "Founder & Principal Advisor",
  "bio": "Elena founded FORME after fifteen years advising on architecturally significant residences across Europe and the United States. She believes a good advisor listens first.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBCvhqXmXhYxZa7YTPkxgnMZkAE0NSrtPEgLkB-az-Nh9ED6CS6HhnXbdyJIAalp2l7o1d_jeZZuTqwy2HDpfFRhaILFAZ4M2gTGoHCxRbBDdIHi3g7yOodKDXkfomJNeimG7-K3c-PN8fztaVI8IdJ9LZ1S817zhAmoMwkn8b2mKtYOThNXfdnIcDL24YDBipjLS6b74u68U6GzyYgOK0A_6txNOa24g8ogzcGGypG66WUDEIdSclq",
  "sort": 1,
  "published": true
 },
 {
  "id": "f8f68489-030a-43bb-a4cd-0d41a3e70fd7",
  "name": "Julian Weiss",
  "role": "Director, Acquisitions",
  "bio": "Julian leads private acquisitions, sourcing off-market residences for clients across Zürich, Milan and New York.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuDrl6iWPVvjza7RJEL2RjWaHt3bPkmMcUGdPxot5GAgt2btjSPUMuol90ItvwPKQHBQ3qCgnDnuxOjxatG3HyaZrUUzAzb0YQXc5Mv6RshmSlHAZE_0DmsTIgDotXTV89F3r5hZwuoRWE3q-0Y-d0uxBLR9Vf8MqVgfvdqVm2szVgQeLsEnD3fipUxVjHlWskySNjgZy_MKfhL6D4335A3EnPp0Zr0fYXAP0hWRqfP93lY2szt37Qea",
  "sort": 2,
  "published": true
 },
 {
  "id": "f77ed5a9-ad36-4eb9-ad57-f6ed403bf73b",
  "name": "Priya Raman",
  "role": "Head of Property Management",
  "bio": "Priya oversees tenancy, leasing and long-term stewardship for landlords and tenants across the portfolio.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuDj_aCjB0APE7rKDyw7Tv5KRXkWZmcE6_RiQECfi1Ew6rEIKwnAo7P5bzW0BsGdetnqOoxpHgIIPhfjw_Xib9hqFOKFGH9c88fJlaZ7Ompoj2ajmZPh-Sm_IVRcRmUaEk9FOPk-FRCiH8STt41fic3Ziz1-IJvhdFsTX4HY6dju9k4cB4QiK7r7kTV3vHIzEs1ZocTQvmuc2IAqAOvo6icS-pEqBw47hVL09pLgzA1JFY0iswEePgck",
  "sort": 3,
  "published": true
 },
 {
  "id": "5fb2f735-efef-4adf-a80d-9e88b8ff7f9c",
  "name": "Marcus Lee",
  "role": "Architectural Curator",
  "bio": "A trained architect, Marcus vets each residence for spatial quality, materiality and provenance before it joins the portfolio.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCJT8Tdml-CxZuufHKmN6kChO6M9qaklDs9KCSzQCZYldIUGyL5F_UywmQ6MTzjuDXQOgA1K9E2g79n17PRHR-xUd_9Qs2obnPzZi7Juyj_wpcInXSz_rgP7Mest95SHFOj6BK69HAcSTI3I4tJhNxl4_WKUxV5AR52FZ68R8D0yoQrKepHqZ5C7v-VDEmB4p-_r-JCypyIzMcmUWJyZUdOsTCJiiC8EhgvHQhHIGidK27-gWMBQt4i",
  "sort": 4,
  "published": true
 }
]
$json$::jsonb)
on conflict (id) do nothing;

insert into public.site_settings ("key", "value")
select "key", "value" from jsonb_populate_recordset(null::public.site_settings, $json$
[
 {
  "key": "contact",
  "value": {
   "email": "concierge@formerealty.com",
   "phone": "+1 512 480 9100",
   "offices": [
    {
     "city": "Austin",
     "phone": "512.480.9100"
    },
    {
     "city": "Dallas",
     "phone": "214.520.4400"
    },
    {
     "city": "Scottsdale",
     "phone": "480.990.2200"
    }
   ]
  }
 },
 {
  "key": "brand",
  "value": {
   "name": "FORME REALTY",
   "tagline": "Space to live differently."
  }
 }
]
$json$::jsonb)
on conflict (key) do nothing;

insert into public.inquiries ("id", "status", "notes", "payload", "property_id", "phone", "subject", "created_at", "updated_at", "ref", "type", "name", "email", "message")
select "id", "status", "notes", "payload", "property_id", "phone", "subject", "created_at", "updated_at", "ref", "type", "name", "email", "message" from jsonb_populate_recordset(null::public.inquiries, $json$
[
 {
  "id": "3caab2f8-d5a7-47fb-a1c4-05b6635a07c2",
  "status": "new",
  "notes": "",
  "payload": {},
  "property_id": null,
  "phone": "+44 7700 900123",
  "subject": "Looking for a family home in Austin",
  "created_at": "2026-10-23T21:07:46.524Z",
  "updated_at": "2026-10-22T14:07:46.524Z",
  "ref": "INQ-2026-4821",
  "type": "general",
  "name": "Sophie Laurent",
  "email": "sophie.laurent@example.com",
  "message": "We are relocating from London in the spring and would like to discuss residences in West Lake Hills and Tarrytown."
 },
 {
  "id": "8e5986ff-cf68-451f-a34d-24579c7e2c83",
  "status": "in_progress",
  "notes": "",
  "payload": {},
  "property_id": "debb6788-5438-461d-a422-d43d1745dfbf",
  "phone": "",
  "subject": "The Courtyard Residence",
  "created_at": "2026-10-22T19:07:46.524Z",
  "updated_at": "2026-10-22T14:07:46.524Z",
  "ref": "INQ-2026-4790",
  "type": "property",
  "name": "Daniel Okoro",
  "email": "daniel.okoro@example.com",
  "message": "Could you share the property monograph and the architectural drawings?"
 },
 {
  "id": "29fc86d7-006b-427e-a046-798ffe135fa9",
  "status": "replied",
  "notes": "",
  "payload": {},
  "property_id": null,
  "phone": "+33 6 12 34 56 78",
  "subject": "Selling a heritage townhouse",
  "created_at": "2026-10-20T14:07:46.524Z",
  "updated_at": "2026-10-22T14:07:46.524Z",
  "ref": "INQ-2026-4755",
  "type": "seller",
  "name": "Marguerite Dubois",
  "email": "m.dubois@example.com",
  "message": "I would like a confidential conversation about positioning a restored 1890s townhouse."
 },
 {
  "id": "1662a29c-5407-42e2-a01a-9d774a131c89",
  "status": "new",
  "notes": "",
  "payload": {},
  "property_id": null,
  "phone": "",
  "subject": "Investment portfolio",
  "created_at": "2026-10-19T14:07:46.524Z",
  "updated_at": "2026-10-22T14:07:46.524Z",
  "ref": "INQ-2026-4702",
  "type": "investment",
  "name": "Tobias Brandt",
  "email": "tbrandt@example.com",
  "message": "Interested in multi-unit architecture-led investments in Texas."
 },
 {
  "id": "418c2d02-5260-4674-af15-5631ecea5573",
  "status": "closed",
  "notes": "",
  "payload": {},
  "property_id": null,
  "phone": "",
  "subject": "Financing guidance",
  "created_at": "2026-10-15T14:07:46.524Z",
  "updated_at": "2026-10-22T14:07:46.524Z",
  "ref": "INQ-2026-4688",
  "type": "mortgage",
  "name": "Aisha Rahman",
  "email": "aisha.rahman@example.com",
  "message": "First-time buyer in the luxury market — keen to understand financing structures."
 },
 {
  "id": "2ee4f2df-b37b-432f-afe8-353342fa0814",
  "status": "new",
  "notes": "",
  "payload": {},
  "property_id": null,
  "phone": "",
  "subject": "Introduction",
  "created_at": "2026-10-14T14:07:46.524Z",
  "updated_at": "2026-10-22T14:07:46.524Z",
  "ref": "INQ-2026-4650",
  "type": "careers",
  "name": "Lena Fischer",
  "email": "lena.fischer@example.com",
  "message": "Architect transitioning into property advisory — would love to introduce myself."
 }
]
$json$::jsonb)
on conflict (id) do nothing;

insert into public.viewing_requests ("id", "status", "viewing_type", "attendees", "notes", "admin_notes", "secondary_date", "phone", "created_at", "updated_at", "ref", "property_id", "name", "email", "preferred_date", "preferred_time")
select "id", "status", "viewing_type", "attendees", "notes", "admin_notes", "secondary_date", "phone", "created_at", "updated_at", "ref", "property_id", "name", "email", "preferred_date", "preferred_time" from jsonb_populate_recordset(null::public.viewing_requests, $json$
[
 {
  "id": "347d24eb-4bdd-497c-a8c2-2fa16f87e5d3",
  "status": "pending",
  "viewing_type": "in_person",
  "attendees": 2,
  "notes": "We would like to see the courtyard in morning light.",
  "admin_notes": "",
  "secondary_date": null,
  "phone": "+1 415 555 0114",
  "created_at": "2026-10-22T14:07:46.524Z",
  "updated_at": "2026-10-22T14:07:46.524Z",
  "ref": "VWR-2026-1093",
  "property_id": "debb6788-5438-461d-a422-d43d1745dfbf",
  "name": "Daniel Okoro",
  "email": "daniel.okoro@example.com",
  "preferred_date": "2026-10-27",
  "preferred_time": "10:00"
 },
 {
  "id": "00928f76-284f-4d17-a83a-d505c2d665b3",
  "status": "confirmed",
  "viewing_type": "virtual",
  "attendees": 1,
  "notes": "",
  "admin_notes": "",
  "secondary_date": null,
  "phone": "",
  "created_at": "2026-10-22T14:07:46.524Z",
  "updated_at": "2026-10-22T14:07:46.524Z",
  "ref": "VWR-2026-1071",
  "property_id": "a07239d6-cc84-4a8e-a712-8ca4a7d358ce",
  "name": "Isabelle Moreau",
  "email": "i.moreau@example.com",
  "preferred_date": "2026-10-29",
  "preferred_time": "14:00"
 },
 {
  "id": "e8ee5108-9323-4695-a555-77abd7c3f806",
  "status": "completed",
  "viewing_type": "in_person",
  "attendees": 1,
  "notes": "",
  "admin_notes": "",
  "secondary_date": null,
  "phone": "",
  "created_at": "2026-10-22T14:07:46.524Z",
  "updated_at": "2026-10-22T14:07:46.524Z",
  "ref": "VWR-2026-1042",
  "property_id": "3ede0038-15a8-43fd-ab3b-becb157a0436",
  "name": "Raj Patel",
  "email": "raj.patel@example.com",
  "preferred_date": "2026-10-22",
  "preferred_time": "11:30"
 },
 {
  "id": "64babdd5-f350-4af9-a18f-6157c8b57f50",
  "status": "pending",
  "viewing_type": "in_person",
  "attendees": 1,
  "notes": "",
  "admin_notes": "",
  "secondary_date": null,
  "phone": "",
  "created_at": "2026-10-22T14:07:46.524Z",
  "updated_at": "2026-10-22T14:07:46.524Z",
  "ref": "VWR-2026-1015",
  "property_id": "10bff221-8695-4c7f-ad92-ac6e5a723881",
  "name": "Helena Vance-Whitmore",
  "email": "helena.vance@example.com",
  "preferred_date": "2026-10-31",
  "preferred_time": "16:00"
 }
]
$json$::jsonb)
on conflict (id) do nothing;

insert into public.valuation_requests ("id", "ref", "name", "email", "phone", "property_address", "property_type", "reason", "timeline", "notes", "status", "admin_notes", "created_at", "updated_at")
select "id", "ref", "name", "email", "phone", "property_address", "property_type", "reason", "timeline", "notes", "status", "admin_notes", "created_at", "updated_at" from jsonb_populate_recordset(null::public.valuation_requests, $json$
[
 {
  "id": "edfe955f-7e83-4f6d-a2de-f227bd8ad67b",
  "ref": "VAL-2026-2210",
  "name": "Oliver Grant",
  "email": "oliver.grant@example.com",
  "phone": "+1 512 555 0188",
  "property_address": "14 Windsor Road, Austin, TX",
  "property_type": "Residence",
  "reason": "Considering selling",
  "timeline": "3–6 months",
  "notes": "Original 1960s mid-century with later extension.",
  "status": "new",
  "admin_notes": "",
  "created_at": "2026-10-21T14:07:46.524Z",
  "updated_at": "2026-10-21T14:07:46.524Z"
 },
 {
  "id": "f41f5c55-9265-457e-a393-534b65fa699f",
  "ref": "VAL-2026-2187",
  "name": "Camille Roux",
  "email": "camille.roux@example.com",
  "phone": "",
  "property_address": "Penthouse 12, Turtle Creek, Dallas, TX",
  "property_type": "Penthouse",
  "reason": "Portfolio review",
  "timeline": "Exploring",
  "notes": "",
  "status": "scheduled",
  "admin_notes": "Site visit booked.",
  "created_at": "2026-10-17T14:07:46.524Z",
  "updated_at": "2026-10-19T14:07:46.524Z"
 }
]
$json$::jsonb)
on conflict (id) do nothing;

insert into public.subscribers ("id", "email", "source", "created_at")
select "id", "email", "source", "created_at" from jsonb_populate_recordset(null::public.subscribers, $json$
[
 {
  "id": "f82fb4a6-6671-4a11-af31-94030b67e867",
  "email": "reader.one@example.com",
  "source": "footer",
  "created_at": "2026-10-11T14:07:46.524Z"
 },
 {
  "id": "81fbac95-f2ef-4705-afd9-9180a009fe5e",
  "email": "reader.two@example.com",
  "source": "journal",
  "created_at": "2026-10-17T14:07:46.524Z"
 },
 {
  "id": "f8369a19-c1b7-426f-a300-e57712a8290c",
  "email": "reader.three@example.com",
  "source": "footer",
  "created_at": "2026-10-21T14:07:46.524Z"
 }
]
$json$::jsonb)
on conflict (id) do nothing;

insert into public.rental_applications ("id", "ref", "property_id", "property_title", "status", "applicant_name", "email", "phone", "preferred_contact", "move_in_date", "tenancy_term", "occupants", "special_notes", "employment_status", "employer", "references_text", "payload", "withdrawn_reason", "created_at", "updated_at", "submitted_at")
select "id", "ref", "property_id", "property_title", "status", "applicant_name", "email", "phone", "preferred_contact", "move_in_date", "tenancy_term", "occupants", "special_notes", "employment_status", "employer", "references_text", "payload", "withdrawn_reason", "created_at", "updated_at", "submitted_at" from jsonb_populate_recordset(null::public.rental_applications, $json$
[
 {
  "id": "29ad3c48-5e00-4fcf-a18d-3f5fd5080db1",
  "ref": "APP-CAD-2026-9412",
  "property_id": "10bff221-8695-4c7f-ad92-ac6e5a723881",
  "property_title": "The Glass Terraces at Cadogan Belvedere",
  "status": "info_requested",
  "applicant_name": "Helena Vance-Whitmore",
  "email": "helena.vance@example.com",
  "phone": "+44 7700 900456",
  "preferred_contact": "email",
  "move_in_date": "2026-12-08",
  "tenancy_term": "12 Months (Standard Fixed)",
  "occupants": 2,
  "special_notes": "Two adults, one small dog.",
  "employment_status": "Employed (Corporate / Professional)",
  "employer": "Studio Marlow Architecture",
  "references_text": "Previous landlord: Cadogan Estates Ltd.",
  "payload": {},
  "withdrawn_reason": "",
  "created_at": "2026-10-17T14:07:46.524Z",
  "updated_at": "2026-10-22T14:07:46.524Z",
  "submitted_at": "2026-10-17T14:07:46.524Z"
 },
 {
  "id": "1608203c-5792-44a5-ad37-743806e35636",
  "ref": "APP-URB-2026-7731",
  "property_id": "441aa19f-d8a8-419b-aff2-ff977a5ba020",
  "property_title": "Modern Urban Residence",
  "status": "under_review",
  "applicant_name": "Theo Nakamura",
  "email": "theo.nakamura@example.com",
  "phone": "+1 512 555 0142",
  "preferred_contact": "phone",
  "move_in_date": "2026-11-23",
  "tenancy_term": "6 Months",
  "occupants": 1,
  "special_notes": "",
  "employment_status": "Self-employed",
  "employer": "Nakamura Design",
  "references_text": "",
  "payload": {},
  "withdrawn_reason": "",
  "created_at": "2026-10-19T14:07:46.524Z",
  "updated_at": "2026-10-20T14:07:46.524Z",
  "submitted_at": "2026-10-19T14:07:46.524Z"
 },
 {
  "id": "b346f96c-6317-42ae-a452-b8d889e1f973",
  "ref": "APP-FAM-2026-6120",
  "property_id": "b9030edb-42b7-48f4-a4da-381083a1ae1b",
  "property_title": "Considered Family Home",
  "status": "submitted",
  "applicant_name": "Grace Whitfield",
  "email": "grace.whitfield@example.com",
  "phone": "",
  "preferred_contact": "email",
  "move_in_date": "2026-12-23",
  "tenancy_term": "24 Months",
  "occupants": 4,
  "special_notes": "Two children.",
  "employment_status": "Employed (Corporate / Professional)",
  "employer": "Meridian Partners",
  "references_text": "",
  "payload": {},
  "withdrawn_reason": "",
  "created_at": "2026-10-22T14:07:46.524Z",
  "updated_at": "2026-10-22T14:07:46.524Z",
  "submitted_at": "2026-10-22T14:07:46.524Z"
 }
]
$json$::jsonb)
on conflict (id) do nothing;

insert into public.application_messages ("id", "application_id", "sender", "body", "created_at")
select "id", "application_id", "sender", "body", "created_at" from jsonb_populate_recordset(null::public.application_messages, $json$
[
 {
  "id": "bfdca0a9-38e5-4f4d-a39a-97f5c4c7497c",
  "application_id": "29ad3c48-5e00-4fcf-a18d-3f5fd5080db1",
  "sender": "advisor",
  "body": "Welcome, Helena — your application has been received. A principal advisor will review it within two working days.",
  "created_at": "2026-10-17T14:07:46.524Z"
 },
 {
  "id": "9a7ad111-932c-4311-a3af-97655b192a1f",
  "application_id": "29ad3c48-5e00-4fcf-a18d-3f5fd5080db1",
  "sender": "applicant",
  "body": "Thank you. Please let me know if anything further is needed.",
  "created_at": "2026-10-18T14:07:46.524Z"
 },
 {
  "id": "9a97aa00-4e53-45b9-aa04-4130c5c38ac7",
  "application_id": "29ad3c48-5e00-4fcf-a18d-3f5fd5080db1",
  "sender": "advisor",
  "body": "We need two further items — please see the Application Clarifications section.",
  "created_at": "2026-10-22T14:07:46.524Z"
 }
]
$json$::jsonb)
on conflict (id) do nothing;

insert into public.application_documents ("id", "application_id", "name", "doc_type", "file_path", "file_url", "status", "created_at")
select "id", "application_id", "name", "doc_type", "file_path", "file_url", "status", "created_at" from jsonb_populate_recordset(null::public.application_documents, $json$
[
 {
  "id": "8526f676-1856-4897-a3a0-23a2d66fc829",
  "application_id": "29ad3c48-5e00-4fcf-a18d-3f5fd5080db1",
  "name": "Photo identification",
  "doc_type": "identity",
  "file_path": "",
  "file_url": "",
  "status": "verified",
  "created_at": "2026-10-18T14:07:46.524Z"
 },
 {
  "id": "0c8cd789-edff-4901-ad24-7b38b042bfdf",
  "application_id": "29ad3c48-5e00-4fcf-a18d-3f5fd5080db1",
  "name": "Proof of income (3 months)",
  "doc_type": "income",
  "file_path": "",
  "file_url": "",
  "status": "requested",
  "created_at": "2026-10-22T14:07:46.524Z"
 },
 {
  "id": "c4241e46-f59d-4a08-a165-c0be3ac526f4",
  "application_id": "29ad3c48-5e00-4fcf-a18d-3f5fd5080db1",
  "name": "Previous landlord reference",
  "doc_type": "reference",
  "file_path": "",
  "file_url": "",
  "status": "requested",
  "created_at": "2026-10-22T14:07:46.524Z"
 }
]
$json$::jsonb)
on conflict (id) do nothing;

insert into public.information_requests ("id", "application_id", "title", "detail", "due_date", "status", "response", "created_at")
select "id", "application_id", "title", "detail", "due_date", "status", "response", "created_at" from jsonb_populate_recordset(null::public.information_requests, $json$
[
 {
  "id": "63407e04-8caf-4fd8-ab68-05b838da4ac9",
  "application_id": "29ad3c48-5e00-4fcf-a18d-3f5fd5080db1",
  "title": "Proof of income",
  "detail": "Please provide your last three payslips or an employer letter confirming salary.",
  "due_date": "2026-10-28",
  "status": "open",
  "response": "",
  "created_at": "2026-10-22T14:07:46.524Z"
 },
 {
  "id": "36fbfe87-af6e-406c-a333-bbda2c7792bf",
  "application_id": "29ad3c48-5e00-4fcf-a18d-3f5fd5080db1",
  "title": "Landlord reference",
  "detail": "Contact details for your previous landlord, including phone and email.",
  "due_date": "2026-10-28",
  "status": "open",
  "response": "",
  "created_at": "2026-10-22T14:07:46.524Z"
 }
]
$json$::jsonb)
on conflict (id) do nothing;

