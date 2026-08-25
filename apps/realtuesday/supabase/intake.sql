-- real Tuesday · website intake submissions
-- ---------------------------------------------------------------------------
-- Backs the public /start intake form and the /admin/intake review page.
-- Run once against your Supabase project (SQL Editor -> New query -> paste ->
-- Run). Safe to re-run: the enum create is guarded, tables use IF NOT EXISTS.
--
-- Flow: a prospect fills out /start -> a row lands here (status 'new') -> the
-- server action also opens a matching row in `clients` (status 'lead') and
-- emails the studio. You triage here and move status as you go.
--
-- Timestamps are UTC (timestamptz); the app renders US Central. RLS is ON with
-- no public policy: the public/anon key can read nothing. All writes happen
-- server-side through the service-role key (see lib/supabase.ts), same as the
-- rest of the admin data layer.
-- ---------------------------------------------------------------------------

create extension if not exists "pgcrypto";  -- gen_random_uuid()

-- Where a submission sits in triage.
do $$ begin
  create type intake_status as enum ('new', 'reviewing', 'quoted', 'archived');
exception when duplicate_object then null; end $$;

-- Reuse the shared updated_at trigger function if it already exists (defined in
-- schema.sql). Recreate it defensively so intake.sql can be run standalone.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists intake_submissions (
  id             uuid primary key default gen_random_uuid(),
  status         intake_status not null default 'new',
  -- Who sent it.
  contact_name   text not null,
  email          text not null,
  company        text,
  phone          text,
  -- The condensed intake answers.
  business_type  text,   -- what the business does
  primary_goal   text,   -- the one thing the new site should do well
  current_site   text,   -- existing URL, or "none"
  domain_status  text,   -- owns a domain (which) / needs one
  budget_range   text,   -- picked from a fixed set of ranges
  timeline       text,   -- any hard deadline
  beyond_website text,   -- the "where else does time get lost" probe
  message        text,   -- anything else
  -- The clients-table lead this submission opened, if one was created.
  client_id      uuid references clients(id) on delete set null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

drop trigger if exists intake_submissions_updated_at on intake_submissions;
create trigger intake_submissions_updated_at before update on intake_submissions
  for each row execute function set_updated_at();

create index if not exists intake_submissions_status_idx on intake_submissions(status);
create index if not exists intake_submissions_created_idx on intake_submissions(created_at);

-- Row Level Security: on, with no permissive policy. The anon/public key can
-- read nothing even if it leaks; the server writes and reads via service_role,
-- which bypasses RLS.
alter table intake_submissions enable row level security;
