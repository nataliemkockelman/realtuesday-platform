# Website Delivery Checklist (internal)

The backend runbook for taking a website client from signed to launched to
handed off. One copy per client. Copy this file, rename it
`client-[name]-checklist.md`, and check boxes as you go.

**Owner:** Natalie (build) · **Sales/relationship:** Josh
**Golden rule:** the client owns their domain and hosting account. We're admins
on it, not the account holder. See `domain-and-hosting-guide.md`.

---

## Client header

- Client / company: `__________`
- Primary contact + email: `__________`
- Signed agreement date: `__________`
- Deposit received: `__________`
- Domain of record: `__________`
- Site type (marketing / CMS / platform): `__________`
- Target launch date: `__________`
- Budget / quote: `__________`

---

## Phase 0 — Sales to signed
- [ ] Intake form received and reviewed (`website-intake-form.md`)
- [ ] Scope agreed in writing (pages, features, phases, what's explicitly out)
- [ ] Proposal / SOW sent and signed
- [ ] Deposit invoiced and paid
- [ ] Kickoff scheduled
- [ ] "Beyond the website" answers logged — flag any audit/upsell candidates for after launch

## Phase 1 — Kickoff and access
- [ ] Kickoff call held; goals and success metric confirmed
- [ ] Shared workspace set up (folder, doc, comms channel)
- [ ] Access collected (request only what's needed, store in the password manager, never in plain email):
  - [ ] Domain registrar login OR client added us as a user
  - [ ] Existing hosting login (if migrating)
  - [ ] DNS management access
  - [ ] Existing email provider (so we don't break their mail at cutover)
  - [ ] Google Analytics / Search Console
  - [ ] Logo, brand assets, fonts
  - [ ] Any third-party accounts we'll integrate (Stripe, Calendly, CRM, mailing list)
- [ ] Single point of contact for approvals confirmed

## Phase 2 — Discovery and planning
- [ ] Sitemap finalized and approved by client
- [ ] Content inventory built (what exists, what's new, who writes each page)
- [ ] Content deadlines assigned to the client in writing (this sets the timeline)
- [ ] Integrations list confirmed with account details
- [ ] Tech stack decided and recorded (framework, hosting target, CMS if any) — see hosting guide
- [ ] Analytics + legal pages plan (privacy policy, terms) confirmed

## Phase 3 — Domain and DNS
- [ ] Confirm who owns the domain and where it lives
- [ ] If buying new: client purchases at Cloudflare Registrar (at-cost) and adds us, OR we buy and transfer to them at launch — decided and noted
- [ ] Current DNS records exported and saved BEFORE any change (screenshot the whole zone)
- [ ] Email (MX) records identified and protected — do not touch these at cutover
- [ ] Cutover plan written (what records change, expected propagation window)

## Phase 4 — Environment and hosting setup
- [ ] Git repo created
- [ ] Hosting project created on chosen platform (Vercel / Netlify / Cloudflare Pages)
- [ ] **Hosting account is in the client's name / billing** (or explicitly rolled into a retainer, in writing) — we are collaborators
- [ ] Preview / staging URL live for client review
- [ ] Production environment configured
- [ ] Environment variables and secrets set (never committed to the repo)
- [ ] SSL / HTTPS confirmed automatic on the platform

## Phase 5 — Design
- [ ] Wireframes or low-fi layout approved
- [ ] Visual design / mockups approved (colors, type, spacing locked)
- [ ] Mobile layout reviewed, not just desktop
- [ ] Client sign-off on design before build starts (get it in writing)

## Phase 6 — Build
- [ ] Pages built to approved design
- [ ] Fully responsive (test 375px, tablet, desktop, wide)
- [ ] Forms wired and tested end to end (submission actually arrives)
- [ ] Integrations connected and tested (booking, payments, mailing list, CRM)
- [ ] CMS configured and client can edit without us (if in scope)
- [ ] Accessibility pass (alt text, heading order, contrast, keyboard nav, focus states)
- [ ] Favicon + app icons
- [ ] Custom 404 page

## Phase 7 — Content load
- [ ] All final copy in place (no lorem ipsum, no placeholders)
- [ ] Real images optimized and loaded (correct sizes, compressed)
- [ ] Alt text on every meaningful image
- [ ] Proofread pass — names, phone, email, address, prices all correct

## Phase 8 — SEO, analytics, legal
- [ ] Page titles and meta descriptions per page
- [ ] Open Graph / social share images and tags
- [ ] Sitemap.xml and robots.txt
- [ ] Analytics installed and firing (verify a live event)
- [ ] Search Console verified
- [ ] Privacy policy and terms published and linked
- [ ] Cookie/consent handling if any tracking is used

## Phase 9 — QA (pre-launch)
- [ ] Every link clicked, no 404s
- [ ] Every form submitted and confirmed received
- [ ] Cross-browser check (Chrome, Safari, Firefox, mobile Safari)
- [ ] Lighthouse / performance check (target: green on mobile)
- [ ] Spellcheck and final read on every page
- [ ] Redirects mapped from old URLs to new (protect existing SEO)
- [ ] Client final review and written approval to launch

## Phase 10 — Launch
- [ ] DNS cutover per the Phase 3 plan (change site records, leave MX/email alone)
- [ ] Verify SSL on the live domain (padlock, no mixed-content warnings)
- [ ] www and non-www both resolve to one canonical version
- [ ] Old-URL redirects live and working
- [ ] Submit sitemap to Search Console
- [ ] Analytics confirmed on production
- [ ] Uptime monitoring on (platform native or a simple pinger)
- [ ] Announce to client that it's live

## Phase 11 — Post-launch and handoff
- [ ] Handoff doc delivered: how to edit, where things live, who to call, what's automatic
- [ ] Client walkthrough / training session (record it)
- [ ] Logins and ownership confirmed in the client's name
- [ ] 30-day support window start date noted
- [ ] Final invoice sent
- [ ] Backup / export of the site saved on our side

## Phase 12 — Follow-up and grow
- [ ] 2-week post-launch check-in scheduled
- [ ] Revisit "Beyond the website" flags from intake — is now the time for the audit?
- [ ] Offer care & maintenance retainer if they want us to keep it running
- [ ] Ask for a testimonial / referral while it's fresh

---

*Next step after signing: see `domain-and-hosting-guide.md` for where the domain
and hosting should live, and who should own each account.*
