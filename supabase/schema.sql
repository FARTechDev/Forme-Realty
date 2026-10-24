-- =====================================================================
--  FORME REALTY — Supabase schema
--  Run this whole file once in: Supabase Dashboard → SQL Editor → New query.
--  Safe to re-run (uses IF NOT EXISTS / CREATE OR REPLACE / DROP POLICY IF EXISTS).
--  Afterwards: run supabase/seed.sql (optional demo content) and
--  promote your first admin (see the bottom of this file).
-- =====================================================================


-- ---------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ---------------------------------------------------------------------
-- Profiles (one per auth user; role = 'admin' unlocks the admin portal)
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  full_name   text default '',
  role        text not null default 'user' check (role in ('user', 'admin')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin');
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- Properties (sale + rent)
-- ---------------------------------------------------------------------
create table if not exists public.properties (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  title          text not null,
  subtitle       text default '',
  summary        text default '',
  description    text default '',
  listing_type   text not null default 'sale' check (listing_type in ('sale', 'rent')),
  property_type  text not null default 'residence',
  status         text not null default 'available' check (status in ('available', 'under_contract', 'sold', 'let', 'coming_soon')),
  badge          text default '',
  featured       boolean not null default false,
  published      boolean not null default true,
  price          numeric(14, 2),
  price_label    text default 'Price on Request',
  currency       text not null default 'USD',
  rent_pcm       numeric(12, 2),
  city           text default '',
  region         text default '',
  country        text default 'United States',
  neighborhood   text default '',
  address        text default '',
  latitude       double precision,
  longitude      double precision,
  bedrooms       integer not null default 0,
  bathrooms      numeric(4, 1) not null default 0,
  area_sqft      integer,
  area_sqm       integer,
  lot_size       text default '',
  year_built     integer,
  architect      text default '',
  materials      text default '',
  parking        text default '',
  features       text[] not null default '{}',
  cover_image    text default '',
  gallery        jsonb not null default '[]'::jsonb,   -- [{ "url": "...", "caption": "..." }]
  floor_plan_url text default '',
  specs          jsonb not null default '[]'::jsonb,   -- [{ "label": "...", "value": "..." }]
  available_from date,
  lease_term     text default '',
  furnished      boolean not null default false,
  views          integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists properties_listing_idx on public.properties (listing_type, published, status);
create index if not exists properties_city_idx on public.properties (city);
create index if not exists properties_featured_idx on public.properties (featured) where featured;

-- ---------------------------------------------------------------------
-- Editorial / content tables
-- ---------------------------------------------------------------------
create table if not exists public.neighborhoods (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique, name text not null, city text default '', tagline text default '',
  description text default '', image text default '', sort integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.journal_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique, title text not null, category text default '', excerpt text default '',
  cover_image text default '', author text default 'FORME Editorial', read_time integer not null default 5,
  featured boolean not null default false, published boolean not null default true,
  published_at timestamptz not null default now(), body text default '',   -- paragraphs separated by a blank line
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null, context text default '', ref text default '', quote text not null, image text default '',
  sort integer not null default 0, published boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null, role text default '', bio text default '', image text default '',
  sort integer not null default 0, published boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Public requests (anonymous INSERT, admin manages)
-- ---------------------------------------------------------------------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique,
  type text not null default 'general',
  name text not null, email text not null, phone text default '', subject text default '', message text default '',
  property_id uuid references public.properties(id) on delete set null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'new' check (status in ('new', 'in_progress', 'replied', 'closed')),
  assigned_to text, notes text default '',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists inquiries_status_idx on public.inquiries (status, created_at desc);

create table if not exists public.viewing_requests (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique,
  property_id uuid references public.properties(id) on delete set null,
  name text not null, email text not null, phone text default '',
  preferred_date date, preferred_time text default '', secondary_date date,
  viewing_type text not null default 'in_person' check (viewing_type in ('in_person', 'virtual')),
  attendees integer not null default 1, notes text default '', admin_notes text default '',
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'rescheduled', 'completed', 'cancelled')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists viewing_status_idx on public.viewing_requests (status, preferred_date);

create table if not exists public.valuation_requests (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique,
  name text not null, email text not null, phone text default '',
  property_address text default '', property_type text default '', reason text default '', timeline text default '',
  notes text default '', admin_notes text default '', estimated_value numeric(14, 2),
  status text not null default 'new' check (status in ('new', 'scheduled', 'completed', 'closed')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique, source text default 'footer',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Rental applications (applicants track them with ref + email via RPCs)
-- ---------------------------------------------------------------------
create table if not exists public.rental_applications (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique,
  property_id uuid references public.properties(id) on delete set null,
  property_title text default '',
  status text not null default 'submitted' check (status in ('submitted', 'under_review', 'info_requested', 'approved', 'declined', 'withdrawn')),
  applicant_name text not null, email text not null, phone text default '', preferred_contact text default 'email',
  move_in_date date, tenancy_term text default '', occupants integer not null default 1, special_notes text default '',
  employment_status text default '', employer text default '', references_text text default '',
  payload jsonb not null default '{}'::jsonb, withdrawn_reason text default '',
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists applications_email_idx on public.rental_applications (lower(email));

create table if not exists public.application_messages (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.rental_applications(id) on delete cascade,
  sender text not null check (sender in ('applicant', 'advisor')),
  body text not null,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.rental_applications(id) on delete cascade,
  name text not null, doc_type text default 'other', file_path text default '', file_url text default '',
  status text not null default 'uploaded' check (status in ('requested', 'uploaded', 'verified', 'rejected')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.information_requests (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.rental_applications(id) on delete cascade,
  title text not null, detail text default '', due_date date, response text default '',
  status text not null default 'open' check (status in ('open', 'provided', 'closed')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'profiles','properties','neighborhoods','journal_posts','testimonials','team_members','site_settings','inquiries',
    'viewing_requests','valuation_requests','subscribers','rental_applications','application_messages',
    'application_documents','information_requests'
  ] loop
    execute format('drop trigger if exists %I on public.%I', 'trg_' || t || '_updated', t);
    execute format('create trigger %I before update on public.%I for each row execute function public.set_updated_at()', 'trg_' || t || '_updated', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'profiles','properties','neighborhoods','journal_posts','testimonials','team_members','site_settings','inquiries',
    'viewing_requests','valuation_requests','subscribers','rental_applications','application_messages',
    'application_documents','information_requests'
  ] loop
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;

-- Admin: full access everywhere
do $$
declare t text;
begin
  foreach t in array array[
    'properties','neighborhoods','journal_posts','testimonials','team_members','site_settings','inquiries',
    'viewing_requests','valuation_requests','subscribers','rental_applications','application_messages',
    'application_documents','information_requests'
  ] loop
    execute format('drop policy if exists "admin all" on public.%I', t);
    execute format('create policy "admin all" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- Profiles: read/update own row; admin sees all (role can only be changed from the SQL editor / service role)
drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());
drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid() and role = (select p.role from public.profiles p where p.id = auth.uid()));

-- Public read of published content
drop policy if exists "public read published" on public.properties;
create policy "public read published" on public.properties for select to anon, authenticated using (published);
drop policy if exists "public read published" on public.neighborhoods;
create policy "public read published" on public.neighborhoods for select to anon, authenticated using (published);
drop policy if exists "public read published" on public.journal_posts;
create policy "public read published" on public.journal_posts for select to anon, authenticated using (published);
drop policy if exists "public read published" on public.testimonials;
create policy "public read published" on public.testimonials for select to anon, authenticated using (published);
drop policy if exists "public read published" on public.team_members;
create policy "public read published" on public.team_members for select to anon, authenticated using (published);
drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select to anon, authenticated using (true);

-- Anonymous submissions (insert only — nobody but admins can read them back)
drop policy if exists "anon insert" on public.inquiries;
create policy "anon insert" on public.inquiries for insert to anon, authenticated
  with check (status = 'new' and length(name) > 0 and email like '%@%');
drop policy if exists "anon insert" on public.viewing_requests;
create policy "anon insert" on public.viewing_requests for insert to anon, authenticated
  with check (status = 'pending' and length(name) > 0 and email like '%@%');
drop policy if exists "anon insert" on public.valuation_requests;
create policy "anon insert" on public.valuation_requests for insert to anon, authenticated
  with check (status = 'new' and length(name) > 0 and email like '%@%');
drop policy if exists "anon insert" on public.subscribers;
create policy "anon insert" on public.subscribers for insert to anon, authenticated with check (email like '%@%');
drop policy if exists "anon insert" on public.rental_applications;
create policy "anon insert" on public.rental_applications for insert to anon, authenticated
  with check (status = 'submitted' and length(applicant_name) > 0 and email like '%@%');

-- ---------------------------------------------------------------------
-- Applicant RPCs (security definer; the ref + email pair acts as the credential)
-- ---------------------------------------------------------------------
create or replace function public._app_for(p_ref text, p_email text)
returns public.rental_applications language sql stable security definer set search_path = public as $$
  select * from public.rental_applications a
  where upper(a.ref) = upper(trim(p_ref)) and lower(a.email) = lower(trim(p_email)) limit 1;
$$;
revoke all on function public._app_for(text, text) from public, anon, authenticated;

create or replace function public.track_application(p_ref text, p_email text)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare a public.rental_applications; prop public.properties;
begin
  a := public._app_for(p_ref, p_email);
  if a.id is null then return null; end if;
  select * into prop from public.properties where id = a.property_id;
  return jsonb_build_object(
    'application', to_jsonb(a),
    'property', case when prop.id is null then null else jsonb_build_object(
      'id', prop.id, 'slug', prop.slug, 'title', prop.title, 'cover_image', prop.cover_image, 'city', prop.city,
      'address', prop.address, 'rent_pcm', prop.rent_pcm, 'price_label', prop.price_label) end,
    'messages',  coalesce((select jsonb_agg(to_jsonb(m) order by m.created_at) from public.application_messages m where m.application_id = a.id), '[]'::jsonb),
    'documents', coalesce((select jsonb_agg(to_jsonb(d) order by d.created_at) from public.application_documents d where d.application_id = a.id), '[]'::jsonb),
    'requests',  coalesce((select jsonb_agg(to_jsonb(r) order by r.created_at) from public.information_requests r where r.application_id = a.id), '[]'::jsonb)
  );
end $$;

create or replace function public.application_send_message(p_ref text, p_email text, p_body text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare a public.rental_applications; m public.application_messages;
begin
  a := public._app_for(p_ref, p_email);
  if a.id is null then raise exception 'Application not found'; end if;
  if length(trim(coalesce(p_body, ''))) = 0 then raise exception 'Message is empty'; end if;
  insert into public.application_messages (application_id, sender, body) values (a.id, 'applicant', left(p_body, 4000)) returning * into m;
  update public.rental_applications set updated_at = now() where id = a.id;
  return to_jsonb(m);
end $$;

create or replace function public.application_add_document(
  p_ref text, p_email text, p_name text, p_doc_type text, p_file_path text, p_file_url text, p_request_doc_id uuid default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare a public.rental_applications; d public.application_documents;
begin
  a := public._app_for(p_ref, p_email);
  if a.id is null then raise exception 'Application not found'; end if;
  if p_request_doc_id is not null then
    update public.application_documents
       set status = 'uploaded', file_path = coalesce(p_file_path, ''), file_url = coalesce(p_file_url, ''), name = coalesce(p_name, name)
     where id = p_request_doc_id and application_id = a.id returning * into d;
  end if;
  if d.id is null then
    insert into public.application_documents (application_id, name, doc_type, file_path, file_url, status)
    values (a.id, p_name, coalesce(p_doc_type, 'other'), coalesce(p_file_path, ''), coalesce(p_file_url, ''), 'uploaded') returning * into d;
  end if;
  update public.rental_applications set updated_at = now() where id = a.id;
  return to_jsonb(d);
end $$;

create or replace function public.application_respond_info(p_ref text, p_email text, p_request_id uuid, p_response text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare a public.rental_applications; r public.information_requests;
begin
  a := public._app_for(p_ref, p_email);
  if a.id is null then raise exception 'Application not found'; end if;
  update public.information_requests set response = p_response, status = 'provided'
   where id = p_request_id and application_id = a.id returning * into r;
  if r.id is null then raise exception 'Request not found'; end if;
  update public.rental_applications set updated_at = now(),
         status = case when status = 'info_requested'
                        and not exists (select 1 from public.information_requests x where x.application_id = a.id and x.status = 'open')
                       then 'under_review' else status end
   where id = a.id;
  return to_jsonb(r);
end $$;

create or replace function public.application_withdraw(p_ref text, p_email text, p_reason text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare a public.rental_applications;
begin
  a := public._app_for(p_ref, p_email);
  if a.id is null then raise exception 'Application not found'; end if;
  update public.rental_applications set status = 'withdrawn', withdrawn_reason = coalesce(p_reason, ''), updated_at = now()
   where id = a.id returning * into a;
  return to_jsonb(a);
end $$;

create or replace function public.increment_property_views(p_id uuid)
returns void language sql security definer set search_path = public as $$
  update public.properties set views = views + 1 where id = p_id and published;
$$;

grant execute on function public.track_application(text, text) to anon, authenticated;
grant execute on function public.application_send_message(text, text, text) to anon, authenticated;
grant execute on function public.application_add_document(text, text, text, text, text, text, uuid) to anon, authenticated;
grant execute on function public.application_respond_info(text, text, uuid, text) to anon, authenticated;
grant execute on function public.application_withdraw(text, text, text) to anon, authenticated;
grant execute on function public.increment_property_views(uuid) to anon, authenticated;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------------------
-- Storage buckets
--   property-images       public read, admin write
--   application-documents private; applicants may upload (insert only), admin reads
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit)
values ('property-images', 'property-images', true, 15728640),
       ('application-documents', 'application-documents', false, 10485760)
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit;

drop policy if exists "property images public read" on storage.objects;
create policy "property images public read" on storage.objects for select to anon, authenticated using (bucket_id = 'property-images');
drop policy if exists "property images admin write" on storage.objects;
create policy "property images admin write" on storage.objects for all to authenticated
  using (bucket_id = 'property-images' and public.is_admin()) with check (bucket_id = 'property-images' and public.is_admin());

drop policy if exists "application docs anon upload" on storage.objects;
create policy "application docs anon upload" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'application-documents');
drop policy if exists "application docs admin read" on storage.objects;
create policy "application docs admin read" on storage.objects for select to authenticated
  using (bucket_id = 'application-documents' and public.is_admin());
drop policy if exists "application docs admin delete" on storage.objects;
create policy "application docs admin delete" on storage.objects for delete to authenticated
  using (bucket_id = 'application-documents' and public.is_admin());

-- ---------------------------------------------------------------------
-- Make yourself an admin
--   1. Dashboard → Authentication → Users → Add user (email + password, tick "Auto confirm").
--   2. Run (with your email):
--        update public.profiles set role = 'admin' where email = 'you@example.com';
--   3. Sign in at  /admin/login  on the website.
-- ---------------------------------------------------------------------
