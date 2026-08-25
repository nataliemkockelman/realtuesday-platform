-- real Tuesday · offerings (editable price list → public /offerings page)
-- ---------------------------------------------------------------------------
-- Run once, AFTER schema.sql, against your Supabase project.
--
-- The admin edits this list at /admin/offerings; the public site reads the
-- PUBLISHED rows to render arealtuesday.com/offerings. Money is whole cents,
-- like the rest of the schema. price_note carries the human qualifier
-- ("starting at", "per month", "custom quote") shown with or instead of a
-- number, so pricing can be exact, a floor, or "let's talk".
-- ---------------------------------------------------------------------------

create table if not exists offerings (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  summary     text,
  price_cents integer,
  price_note  text,
  published   boolean not null default false,
  position    integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists offerings_published_idx on offerings(published, position);

alter table offerings enable row level security;

-- Public, read-only access to PUBLISHED offerings only. Drafts stay hidden from
-- the anon key. All writes happen server-side with the service_role key from
-- behind the /admin gate, which bypasses RLS.
drop policy if exists offerings_public_select on offerings;
create policy offerings_public_select on offerings
  for select to anon, authenticated
  using (published = true);
