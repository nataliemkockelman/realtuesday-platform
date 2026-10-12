-- real Tuesday · admin team auth
-- ---------------------------------------------------------------------------
-- Run once, AFTER schema.sql, against your Supabase project
-- (SQL Editor → New query → paste → Run).
--
-- Replaces the interim HTTP Basic Auth gate on /admin with per-user Supabase
-- Auth logins. No magic link: each teammate accepts a one-time invite and sets
-- their own password, then signs in with email + password thereafter.
--
-- Adds:
--   * admin_users   — the allowlist of who may enter /admin, with a display
--                     name and an accent color (used to attribute brainstorm
--                     notes: operations = blue, sales & growth = orange, etc.)
--   * admin_invites — one-time invite tokens the app (service_role) mints.
--
-- The /admin data layer keeps using the service_role key, which bypasses RLS.
-- ---------------------------------------------------------------------------

-- Who is allowed into /admin ------------------------------------------------
create table if not exists admin_users (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  name       text not null,
  email      text not null,
  color      text not null default 'blue',
  created_at timestamptz not null default now()
);

alter table admin_users enable row level security;

-- A signed-in admin may read their own row (so the app can resolve identity).
-- Inserts happen server-side with the service_role key during invite accept.
drop policy if exists admin_users_self_select on admin_users;
create policy admin_users_self_select on admin_users
  for select to authenticated
  using (user_id = auth.uid());

-- Invite tokens -------------------------------------------------------------
-- invite_status may already exist (portal.sql defines the same enum); the
-- guard makes this safe to run in any order.
do $$ begin
  create type invite_status as enum ('pending', 'accepted', 'revoked');
exception when duplicate_object then null; end $$;

create table if not exists admin_invites (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  name        text not null,
  color       text not null default 'blue',
  token       text not null unique,
  status      invite_status not null default 'pending',
  created_at  timestamptz not null default now(),
  accepted_at timestamptz,
  expires_at  timestamptz not null default (now() + interval '30 days')
);

create index if not exists admin_invites_token_idx on admin_invites(token);

-- RLS on, with NO policy for anon/authenticated. Only the server (service_role)
-- reads or writes invites.
alter table admin_invites enable row level security;
