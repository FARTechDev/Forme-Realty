# FORME REALTY — website + admin portal

A luxury real-estate website built from the Stitch "Forme" design export (all 49 screens), extended with GSAP scroll animation, a custom cursor, button/slide-up animation, a Three.js hero and 3D pavilion, an animated signature in the footer, and a full admin portal backed by Supabase.

**Stack:** React 18 · Vite · Tailwind · React Router · GSAP (ScrollTrigger, SplitText) · Lenis · Three.js · Supabase.

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build in dist/
```

With no environment variables the site runs in **demo mode**: all data is seeded into the browser's localStorage so everything (listings, enquiries, applications, the whole admin) works offline.

- Admin portal: `/admin` — demo login **admin@formerealty.com / forme-admin**
- Demo rental application to track: ref `APP-CAD-2026-9412`, email `helena.vance@example.com` (at `/rental-application/status`)
- Append `?plain` to any URL to switch off animations, cursor, smooth-scroll and WebGL (useful for debugging/accessibility). `prefers-reduced-motion` is also respected.

## Connect Supabase (production)

1. Create a project at supabase.com.
2. SQL Editor → run `supabase/schema.sql` (tables, RLS, applicant RPCs, storage buckets, triggers). Optionally run `supabase/seed.sql` for the demo content.
3. Authentication → Users → *Add user* (tick auto-confirm), then in the SQL editor:
   `update public.profiles set role = 'admin' where email = 'you@example.com';`
4. Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. `npm run build` and deploy `dist/` (Vercel, Netlify and Cloudflare Pages SPA fallbacks are included).

Security model: the public can read only *published* content and can only **insert** enquiries, viewing/valuation requests, newsletter sign-ups and rental applications. Applicants track their own application through `security definer` functions that require the reference **and** email. Everything else needs an admin profile. Application documents live in a private bucket.

## What's included

**Public site** — Home (Three.js shader hero, 3D pavilion), property catalogue and advanced search with shareable filters, property and rental detail (gallery lightbox, enquiry form, view tracking, similar homes), shortlist with compare table and share link, neighborhoods, journal, client experiences, team, viewings (with `.ics` download), valuation, services and legal pages, and the full rental-application journey (apply → review → confirm → status → documents → messages → clarifications → withdraw). All forms write to the database.

**Admin portal** (`/admin`) — dashboard with live stats; properties (create/edit with tabs, image upload, gallery, specs, publish/feature toggles, duplicate, delete); inquiries, viewing requests, valuation requests, newsletter subscribers (CSV export); rental applications with messaging, document verification and information requests; journal, neighborhoods, testimonials and team content managers; site settings.

**Motion** — Lenis smooth scroll wired into ScrollTrigger; split-text headings; staggered slide-ups; image clip reveals and parallax; magnetic, fill-on-hover buttons; ring-and-dot cursor with contextual labels; curtain page transitions; preloader; and the footer's giant wordmark plus an animated signature of the author's name in the copyright line.

## Project layout

```
src/pages/generated   auto-converted design screens (scripts/convert.mjs)
src/pages             hand-built data-driven pages (listings, detail, rental flow …)
src/admin             admin portal
src/lib               db layer (Supabase or demo), seed data, animation engine
src/components        layout, header, footer, cursor, Three.js scenes
supabase/             schema.sql, seed.sql
```
