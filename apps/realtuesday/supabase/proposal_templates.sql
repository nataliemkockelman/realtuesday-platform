-- real Tuesday · proposal templates (reusable scopes for /admin/proposals)
-- ---------------------------------------------------------------------------
-- Run once, AFTER schema.sql, against your Supabase project.
--
-- These are the starting points the studio drafts client proposals from. Each
-- template carries a default title, a one-line summary, an optional default
-- price + qualifier, and the full body (Markdown). Placeholders in the body are
-- filled in per client when you draft the real thing:
--
--   {{client}}   the client's name
--   {{company}}  their company / brand
--   {{date}}     the date the proposal goes out
--   {{price}}    the agreed number, if different from the default
--
-- Private, admin-only: reads/writes go through the service_role key from behind
-- the /admin gate. There is no public policy.
-- ---------------------------------------------------------------------------

create table if not exists proposal_templates (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  title       text not null,
  summary     text,
  body        text not null default '',
  amount_cents integer,
  price_note  text,
  position    integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists proposal_templates_position_idx on proposal_templates(position);

alter table proposal_templates enable row level security;
-- No public policy on purpose. Templates are internal.

-- Seed the three starting templates. `on conflict (name) do nothing` keeps this
-- safe to re-run and never clobbers edits made in the admin.
insert into proposal_templates (name, title, summary, amount_cents, price_note, position, body) values
(
  'AI Ops Audit + Build',
  'AI operations audit and build for {{company}}',
  'The core Real Tuesday engagement: find the manual work, build the systems that run it, stay through adoption.',
  null,
  'starting at',
  0,
  E'Prepared for {{client}}, {{company}}\nDate: {{date}}\n\n## The short version\n\nThere is work inside {{company}} that a system should be doing, not a person. This engagement finds that work, builds the systems to run it, and stays until your team has actually switched over.\n\n## What I''m seeing\n\n[Name the specific manual process this is about: what it is, who does it, how often, and roughly what it costs in hours or dollars today.]\n\n## How the work runs\n\n**1. Audit.** I go into the process end to end and map where the time actually goes. You get a plain read on what is worth automating, what is not, and where you do not need me at all.\n\n**2. Build.** I build the systems that take the manual work off your team''s plate. Real tooling, wired into what you already use, not a slide deck.\n\n**3. Adoption.** A system nobody uses is worthless, so I stay until your team has adopted it and the old way is retired.\n\n## Timeline\n\n[Rough shape, e.g. audit in week 1, first build shipped by week 3, adoption through week 6. Adjust per scope.]\n\n## Investment\n\n{{price}}\n\n[State what the number covers and the payment shape, e.g. split across milestones.]\n\n## What you walk away with\n\n- The systems, running in your environment\n- A short guide so the team can keep them going\n- The hours back that the manual work was eating\n\n## Next step\n\nIf this reads right, reply and I''ll send a start date. If a piece is off, tell me which and I''ll re-scope.'
),
(
  'Retainer / Ongoing Partnership',
  'Ongoing operations partnership with {{company}}',
  'A monthly partnership: I stay embedded, keep the systems running, and take on the next thing worth automating.',
  null,
  'per month',
  1,
  E'Prepared for {{client}}, {{company}}\nDate: {{date}}\n\n## The short version\n\nRather than a one-off build, this keeps me embedded month to month. I maintain what is already running and take on the next manual process worth removing, in priority order.\n\n## How the partnership works\n\nEach month we agree on what matters most. I build against that list, keep the existing systems healthy, and report back on what changed. You are not buying a fixed deliverable, you are buying steady operational leverage.\n\n## What''s included every month\n\n- Upkeep and monitoring of the systems already in place\n- One meaningful new build, or several smaller ones, against the agreed priorities\n- A running view of what is automated and what it is saving\n- Direct access to me, no account manager in between\n\n## Investment\n\n{{price}}\n\n[State the monthly number and what a month covers. Note any cap on scope.]\n\n## Term\n\n[Month to month with a short notice period, or a set initial term. Fill in what fits.]\n\n## Next step\n\nIf a monthly partnership is the right shape, reply and I''ll send a start date and the first month''s priority list for us to agree on together.'
),
(
  'Generic / Fill-in',
  'Proposal for {{company}}',
  'A neutral skeleton with placeholders. Use this when the engagement does not fit the audit or retainer shapes.',
  null,
  null,
  2,
  E'Prepared for {{client}}, {{company}}\nDate: {{date}}\n\n## Overview\n\n[Two or three sentences on what this engagement is and why now.]\n\n## The problem\n\n[What is broken, slow, or manual today, and what it costs.]\n\n## Scope of work\n\n[What I will do, broken into the phases or workstreams that fit this project.]\n\n## Timeline\n\n[Rough dates or a week-by-week shape.]\n\n## Investment\n\n{{price}}\n\n[What the number covers and how it is paid.]\n\n## What you get\n\n[The concrete outcomes and any documentation handed over.]\n\n## Next step\n\n[How to say yes, and what happens once they do.]'
)
on conflict (name) do nothing;
