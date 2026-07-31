-- real Tuesday · studio collaboration (brainstorm + roadmap)
-- ---------------------------------------------------------------------------
-- Run once, AFTER admin_auth.sql, against your Supabase project.
--
-- Adds the shared studio space used inside /admin/brainstorm:
--   * brainstorm_notes — a shared notepad / sticky wall. Each note is stamped
--                        with its author and their accent color, so you can see
--                        at a glance who wrote what (Natalie blue, Josh orange).
--   * roadmap_items    — the roadmap that lives below the brainstorm wall,
--                        grouped into now / next / later / done.
--
-- Both are admin-only: RLS is on with no public policy, and the app reads and
-- writes them with the service_role key from behind the /admin auth gate.
-- ---------------------------------------------------------------------------

-- Shared brainstorm wall ----------------------------------------------------
create table if not exists brainstorm_notes (
  id             uuid primary key default gen_random_uuid(),
  body           text not null,
  author_user_id uuid references auth.users(id) on delete set null,
  author_name    text not null,
  color          text not null default 'blue',
  created_at     timestamptz not null default now()
);

create index if not exists brainstorm_notes_created_idx
  on brainstorm_notes(created_at desc);

alter table brainstorm_notes enable row level security;

-- Roadmap -------------------------------------------------------------------
do $$ begin
  create type roadmap_status as enum ('now', 'next', 'later', 'done');
exception when duplicate_object then null; end $$;

create table if not exists roadmap_items (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  detail      text,
  status      roadmap_status not null default 'next',
  position    integer not null default 0,
  author_name text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists roadmap_items_status_idx
  on roadmap_items(status, position);

alter table roadmap_items enable row level security;
