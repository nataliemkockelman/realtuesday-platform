-- real Tuesday · client portal (invite-based)
-- ---------------------------------------------------------------------------
-- Run this once, AFTER schema.sql, against your Supabase project
-- (SQL Editor → New query → paste → Run).
--
-- Adds:
--   * portal_users  — links a Supabase Auth account to exactly one client
--   * portal_invites — one-time invite tokens the admin generates per client
--   * Row Level Security policies so a signed-in client can read ONLY their
--     own engagements, tasks, and invoices, and nothing else.
--
-- The /admin dashboard keeps using the service_role key, which bypasses RLS,
-- so none of this changes how the admin side works.
-- ---------------------------------------------------------------------------

-- Linking table: one auth user → one client -------------------------------
create table if not exists portal_users (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  client_id  uuid not null references clients(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists portal_users_client_idx on portal_users(client_id);

alter table portal_users enable row level security;

-- A signed-in user may read their own link row (needed so the portal can find
-- which client they are). Nobody can insert/update/delete via the anon key;
-- those happen server-side with the service_role key during invite accept.
drop policy if exists portal_users_self_select on portal_users;
create policy portal_users_self_select on portal_users
  for select to authenticated
  using (user_id = auth.uid());

-- Invites: one-time tokens minted by the admin ----------------------------
do $$ begin
  create type invite_status as enum ('pending', 'accepted', 'revoked');
exception when duplicate_object then null; end $$;

create table if not exists portal_invites (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid not null references clients(id) on delete cascade,
  email       text not null,
  token       text not null unique,
  status      invite_status not null default 'pending',
  created_at  timestamptz not null default now(),
  accepted_at timestamptz,
  expires_at  timestamptz not null default (now() + interval '14 days')
);

create index if not exists portal_invites_client_idx on portal_invites(client_id);
create index if not exists portal_invites_token_idx on portal_invites(token);

-- RLS on, with NO policy for anon/authenticated. Only the server (service_role)
-- can read or write invites. The public anon key can see nothing here.
alter table portal_invites enable row level security;

-- Helper: the set of client ids the current user is linked to ---------------
create or replace function portal_client_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select client_id from portal_users where user_id = auth.uid();
$$;

-- Client-facing read policies ----------------------------------------------
-- Each grants SELECT to the authenticated role, scoped to the caller's own
-- client. Admin writes are unaffected because service_role bypasses RLS.

-- Clients: you may read your own client record (name, company) for the greeting.
drop policy if exists clients_portal_select on clients;
create policy clients_portal_select on clients
  for select to authenticated
  using (id in (select portal_client_ids()));

-- Engagements: only your own.
drop policy if exists engagements_portal_select on engagements;
create policy engagements_portal_select on engagements
  for select to authenticated
  using (client_id in (select portal_client_ids()));

-- Invoices: only your own. (Drafts are hidden so clients see issued bills only.)
drop policy if exists invoices_portal_select on invoices;
create policy invoices_portal_select on invoices
  for select to authenticated
  using (
    client_id in (select portal_client_ids())
    and status <> 'draft'
  );

-- Tasks: only tasks under one of your engagements.
drop policy if exists tasks_portal_select on tasks;
create policy tasks_portal_select on tasks
  for select to authenticated
  using (
    engagement_id in (
      select id from engagements where client_id in (select portal_client_ids())
    )
  );

-- Note: proposals, time_entries, and invoice_line_items intentionally have NO
-- authenticated read policy, so clients never see internal time logs, unsent
-- proposals, or line-item breakdowns. Add policies later if you decide to.
