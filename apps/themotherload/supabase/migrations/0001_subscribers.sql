-- subscribers table — stores email signups across both brands.
--
-- To install in a fresh Supabase project:
--   1. Open Supabase dashboard → SQL Editor → New query
--   2. Paste this whole file → Run
--   3. Copy NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY into Vercel env vars

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  brand text not null check (brand in ('motherload', 'realtuesday')),
  source text not null,                    -- e.g. 'home-hero', 'lead-magnet:sunday-reset'
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz,             -- null = active subscriber
  -- Idempotency: re-subscribing with the same email under the same brand
  -- should update the existing row instead of duplicating it.
  unique (email, brand)
);

-- Helpful indexes for the dashboard's "list subscribers per brand" query
-- (built later in the dashboard app — costs nothing now to have ready).
create index if not exists subscribers_brand_idx on public.subscribers (brand);
create index if not exists subscribers_subscribed_at_idx on public.subscribers (subscribed_at desc);

-- Row Level Security ----------------------------------------------------------
-- The /api/subscribe route uses the service-role key, which bypasses RLS.
-- Enable RLS so anon clients (anyone with the public anon key, e.g. the
-- dashboard frontend) cannot read/write directly without a policy.
alter table public.subscribers enable row level security;

-- Policy: only authenticated dashboard users with role='admin' can read.
-- Until the dashboard exists, no one but the service role can read this
-- table — which is what we want for a marketing site.
create policy if not exists "subscribers_admin_select"
  on public.subscribers
  for select
  using (
    (auth.jwt() ->> 'role')::text = 'admin'
  );
