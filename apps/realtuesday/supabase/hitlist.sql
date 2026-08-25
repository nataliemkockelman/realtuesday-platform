-- real Tuesday · hitlist (private prospects tracker for the /admin pipeline)
-- ---------------------------------------------------------------------------
-- Run once, AFTER schema.sql, against your Supabase project.
--
-- The hitlist is the studio's running list of people/brands we want to reach:
-- who they are, where to find them, a note on the angle, and where they sit in
-- the chase (to_reach → reached_out → in_talks → won / passed). This is INTERNAL
-- only — there is no public policy, so the anon key can never read it. All
-- access happens server-side with the service_role key from behind /admin.
-- ---------------------------------------------------------------------------

do $$ begin
  create type hitlist_status as enum ('to_reach', 'reached_out', 'in_talks', 'won', 'passed');
exception
  when duplicate_object then null;
end $$;

create table if not exists hitlist_prospects (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  company     text,
  link        text,
  note        text,
  status      hitlist_status not null default 'to_reach',
  position    integer not null default 0,
  author_name text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists hitlist_prospects_status_idx on hitlist_prospects(status, position);

alter table hitlist_prospects enable row level security;

-- No public policy on purpose: the hitlist is private. Reads/writes go through
-- the service_role key, which bypasses RLS, from behind the /admin gate.
