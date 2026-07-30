-- real Tuesday · admin data layer
-- ---------------------------------------------------------------------------
-- Run this once against your Supabase project (SQL Editor → New query → paste
-- → Run). It is written to be idempotent-ish: re-running it will error only on
-- the enum/type creation if they already exist, which is safe to ignore.
--
-- Model mirrors how the studio actually operates, moving left to right:
--   clients → proposals → engagements → (tasks · time) → invoices
--
-- All timestamps are stored in UTC (timestamptz). The app renders them in
-- US Central (America/Chicago), which is where the studio operates. Money is
-- stored in whole cents (bigint) to avoid floating-point rounding. Hours are
-- stored as integer minutes for the same reason.
-- ---------------------------------------------------------------------------

-- Extensions ---------------------------------------------------------------
create extension if not exists "pgcrypto";  -- gen_random_uuid()

-- Enums --------------------------------------------------------------------
-- CRM stage a client sits in.
do $$ begin
  create type client_status as enum ('lead', 'qualified', 'active', 'dormant', 'lost');
exception when duplicate_object then null; end $$;

-- Lifecycle of a proposal.
do $$ begin
  create type proposal_status as enum ('draft', 'sent', 'accepted', 'declined', 'expired');
exception when duplicate_object then null; end $$;

-- How an engagement is billed.
do $$ begin
  create type billing_type as enum ('fixed', 'hourly', 'retainer');
exception when duplicate_object then null; end $$;

-- Lifecycle of an engagement.
do $$ begin
  create type engagement_status as enum ('active', 'paused', 'complete', 'archived');
exception when duplicate_object then null; end $$;

-- Lifecycle of a task.
do $$ begin
  create type task_status as enum ('todo', 'in_progress', 'done');
exception when duplicate_object then null; end $$;

-- Lifecycle of an invoice.
do $$ begin
  create type invoice_status as enum ('draft', 'sent', 'paid', 'overdue', 'void');
exception when duplicate_object then null; end $$;

-- Shared updated_at trigger -------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Clients (CRM) ------------------------------------------------------------
create table if not exists clients (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  company     text,
  email       text,
  status      client_status not null default 'lead',
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists clients_updated_at on clients;
create trigger clients_updated_at before update on clients
  for each row execute function set_updated_at();

-- Proposals ----------------------------------------------------------------
create table if not exists proposals (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid not null references clients(id) on delete cascade,
  title       text not null,
  status      proposal_status not null default 'draft',
  -- Total quoted, in whole cents. Nullable while still a rough draft.
  amount_cents bigint,
  sent_at     timestamptz,
  decided_at  timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists proposals_updated_at on proposals;
create trigger proposals_updated_at before update on proposals
  for each row execute function set_updated_at();

create index if not exists proposals_client_idx on proposals(client_id);
create index if not exists proposals_status_idx on proposals(status);

-- Engagements --------------------------------------------------------------
create table if not exists engagements (
  id            uuid primary key default gen_random_uuid(),
  client_id     uuid not null references clients(id) on delete cascade,
  -- The proposal that became this engagement, if any.
  proposal_id   uuid references proposals(id) on delete set null,
  name          text not null,
  status        engagement_status not null default 'active',
  billing_type  billing_type not null default 'fixed',
  -- For hourly/retainer: the rate in cents per hour. Null for fixed.
  rate_cents    bigint,
  -- For fixed: the agreed fee in cents. Null for pure hourly.
  quoted_amount_cents bigint,
  -- Scope guardrail: quoted hours to compare logged time against.
  quoted_hours  numeric(8,2),
  started_at    date,
  ended_at      date,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists engagements_updated_at on engagements;
create trigger engagements_updated_at before update on engagements
  for each row execute function set_updated_at();

create index if not exists engagements_client_idx on engagements(client_id);
create index if not exists engagements_status_idx on engagements(status);

-- Tasks --------------------------------------------------------------------
create table if not exists tasks (
  id            uuid primary key default gen_random_uuid(),
  -- A task usually belongs to an engagement, but can be loose (internal to-do).
  engagement_id uuid references engagements(id) on delete cascade,
  title         text not null,
  status        task_status not null default 'todo',
  due_date      date,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists tasks_updated_at on tasks;
create trigger tasks_updated_at before update on tasks
  for each row execute function set_updated_at();

create index if not exists tasks_engagement_idx on tasks(engagement_id);
create index if not exists tasks_due_idx on tasks(due_date);

-- Time entries -------------------------------------------------------------
create table if not exists time_entries (
  id            uuid primary key default gen_random_uuid(),
  engagement_id uuid not null references engagements(id) on delete cascade,
  description   text,
  -- Duration in whole minutes. 90 = one and a half hours.
  minutes       integer not null check (minutes >= 0),
  billable      boolean not null default true,
  logged_on     date not null default (now() at time zone 'America/Chicago')::date,
  -- Set once this entry has been rolled onto an invoice, so it is not billed twice.
  invoice_id    uuid,
  created_at    timestamptz not null default now()
);

create index if not exists time_entries_engagement_idx on time_entries(engagement_id);
create index if not exists time_entries_logged_idx on time_entries(logged_on);
create index if not exists time_entries_billable_idx on time_entries(billable) where billable;

-- Invoices -----------------------------------------------------------------
create table if not exists invoices (
  id            uuid primary key default gen_random_uuid(),
  client_id     uuid not null references clients(id) on delete cascade,
  engagement_id uuid references engagements(id) on delete set null,
  -- Human-facing invoice number, e.g. RT-0001. Unique when present.
  number        text unique,
  status        invoice_status not null default 'draft',
  amount_cents  bigint not null default 0,
  issued_on     date,
  due_on        date,
  paid_on       date,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists invoices_updated_at on invoices;
create trigger invoices_updated_at before update on invoices
  for each row execute function set_updated_at();

create index if not exists invoices_client_idx on invoices(client_id);
create index if not exists invoices_status_idx on invoices(status);

-- Deferred FK: time_entries.invoice_id → invoices.id. Added after invoices
-- exists so the two tables can be created in any order.
do $$ begin
  alter table time_entries
    add constraint time_entries_invoice_fk
    foreign key (invoice_id) references invoices(id) on delete set null;
exception when duplicate_object then null; end $$;

-- Invoice line items -------------------------------------------------------
-- Each line is either rolled-up billable time or a fixed-fee milestone. Keeping
-- them itemized means an invoice total is a byproduct of the work, not a number
-- re-typed by hand.
create table if not exists invoice_line_items (
  id            uuid primary key default gen_random_uuid(),
  invoice_id    uuid not null references invoices(id) on delete cascade,
  description   text not null,
  quantity      numeric(8,2) not null default 1,
  unit_cents    bigint not null default 0,
  -- Denormalized line total in cents (quantity * unit), kept for simple sums.
  amount_cents  bigint not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists invoice_line_items_invoice_idx on invoice_line_items(invoice_id);

-- Row Level Security -------------------------------------------------------
-- The admin dashboard talks to these tables from the server using the
-- service_role key, which bypasses RLS. RLS is still switched ON with no
-- permissive public policy, so that the anon/public key can read nothing even
-- if it leaks. When Supabase Auth replaces Basic Auth, add per-user policies
-- here for the authenticated role.
alter table clients            enable row level security;
alter table proposals          enable row level security;
alter table engagements        enable row level security;
alter table tasks              enable row level security;
alter table time_entries       enable row level security;
alter table invoices           enable row level security;
alter table invoice_line_items enable row level security;
