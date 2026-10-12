-- real Tuesday · dashboard search indexes
-- ---------------------------------------------------------------------------
-- Run once, AFTER the other migrations, against your Supabase project
-- (SQL Editor → New query → paste → Run).
--
-- The /admin search box (lib/search-data.ts) matches records with case-
-- insensitive ILIKE '%term%' across each entity's text columns. A plain ILIKE
-- with a leading wildcard cannot use a normal B-tree index and falls back to a
-- sequential scan. The pg_trgm extension plus a GIN trigram index makes those
-- substring scans index-backed, so search stays fast as the tables grow.
--
-- Every index is created inside a guard that ignores a missing table, so this
-- script is safe to run even if some feature tables (offerings, hitlist,
-- brainstorm, …) have not been created in this project yet. Re-running is a
-- no-op thanks to `create index if not exists`.
-- ---------------------------------------------------------------------------

create extension if not exists pg_trgm;

-- Clients -------------------------------------------------------------------
do $$ begin
  create index if not exists clients_name_trgm    on clients using gin (name gin_trgm_ops);
  create index if not exists clients_company_trgm on clients using gin (company gin_trgm_ops);
  create index if not exists clients_email_trgm   on clients using gin (email gin_trgm_ops);
  create index if not exists clients_notes_trgm   on clients using gin (notes gin_trgm_ops);
exception when undefined_table then null; end $$;

-- Proposals -----------------------------------------------------------------
do $$ begin
  create index if not exists proposals_title_trgm on proposals using gin (title gin_trgm_ops);
exception when undefined_table then null; end $$;

-- Engagements ---------------------------------------------------------------
do $$ begin
  create index if not exists engagements_name_trgm on engagements using gin (name gin_trgm_ops);
exception when undefined_table then null; end $$;

-- Tasks ---------------------------------------------------------------------
do $$ begin
  create index if not exists tasks_title_trgm on tasks using gin (title gin_trgm_ops);
exception when undefined_table then null; end $$;

-- Time entries --------------------------------------------------------------
do $$ begin
  create index if not exists time_entries_description_trgm
    on time_entries using gin (description gin_trgm_ops);
exception when undefined_table then null; end $$;

-- Invoices ------------------------------------------------------------------
do $$ begin
  create index if not exists invoices_number_trgm on invoices using gin (number gin_trgm_ops);
exception when undefined_table then null; end $$;

-- Website intakes -----------------------------------------------------------
do $$ begin
  create index if not exists intake_contact_name_trgm  on intake_submissions using gin (contact_name gin_trgm_ops);
  create index if not exists intake_company_trgm       on intake_submissions using gin (company gin_trgm_ops);
  create index if not exists intake_email_trgm         on intake_submissions using gin (email gin_trgm_ops);
  create index if not exists intake_business_type_trgm on intake_submissions using gin (business_type gin_trgm_ops);
  create index if not exists intake_primary_goal_trgm  on intake_submissions using gin (primary_goal gin_trgm_ops);
  create index if not exists intake_beyond_trgm        on intake_submissions using gin (beyond_website gin_trgm_ops);
  create index if not exists intake_message_trgm       on intake_submissions using gin (message gin_trgm_ops);
exception when undefined_table then null; end $$;

-- Offerings -----------------------------------------------------------------
do $$ begin
  create index if not exists offerings_name_trgm    on offerings using gin (name gin_trgm_ops);
  create index if not exists offerings_summary_trgm on offerings using gin (summary gin_trgm_ops);
  create index if not exists offerings_price_trgm   on offerings using gin (price_note gin_trgm_ops);
exception when undefined_table then null; end $$;

-- Hitlist prospects ---------------------------------------------------------
do $$ begin
  create index if not exists hitlist_name_trgm    on hitlist_prospects using gin (name gin_trgm_ops);
  create index if not exists hitlist_company_trgm on hitlist_prospects using gin (company gin_trgm_ops);
  create index if not exists hitlist_note_trgm    on hitlist_prospects using gin (note gin_trgm_ops);
exception when undefined_table then null; end $$;

-- Studio brainstorm ---------------------------------------------------------
do $$ begin
  create index if not exists brainstorm_body_trgm   on brainstorm_notes using gin (body gin_trgm_ops);
  create index if not exists brainstorm_author_trgm on brainstorm_notes using gin (author_name gin_trgm_ops);
exception when undefined_table then null; end $$;

do $$ begin
  create index if not exists roadmap_title_trgm  on roadmap_items using gin (title gin_trgm_ops);
  create index if not exists roadmap_detail_trgm on roadmap_items using gin (detail gin_trgm_ops);
exception when undefined_table then null; end $$;
