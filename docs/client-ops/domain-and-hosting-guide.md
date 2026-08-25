# Domain and Hosting — where a client site should live

Internal reference. This answers three questions for every website job: where
the domain gets bought, where the site gets hosted, and who owns which account.
It also answers the one that's been keeping you up: *are we hosting it?*

Last reviewed: August 2026. Prices move; verify at checkout.

---

## The short version

- **You are not running a server.** Nobody self-hosts anymore for this kind of work. A managed platform runs the machine, patches it, scales it, and renews the SSL certificate automatically. Your job is to deploy code to it and manage the account. That's it.
- **The client owns the domain and the hosting account.** Their name, their billing, their email on the recovery. You get added as a collaborator or admin. This protects them and it protects you.
- **Default stack for a modern site:** domain at **Cloudflare Registrar** (at-cost, no markup), hosting on **Vercel** (best for the Next.js sites you build) or **Cloudflare Pages / Netlify** for simple static marketing sites. Email stays on **Google Workspace** and we never touch it at launch.

---

## The fear, answered directly

"Are we hosting it?" — in the scary sense (a box in a closet, a server you have
to keep alive, patch, back up, and pray over at 2am) — **no. Never.**

What actually happens: you connect a Git repository to a platform like Vercel.
Every time you push code, the platform builds the site and serves it from its own
global network. The platform owns the hardware, the uptime, the security
patching, the traffic spikes, and the HTTPS certificate. If the site gets a rush
of traffic, that's their problem, and it's already handled.

So "hosting" here means *"we clicked deploy and we manage the dashboard."* It does
not mean you're on the hook for infrastructure. The failure modes that scare
people (server goes down, gets hacked, runs out of disk) are the platform's
responsibility, not yours. This is the entire reason these platforms exist and
why they're the industry default.

The one real responsibility that remains is the **account** — making sure it's in
the right name, the billing card works, and the domain doesn't expire. That's an
ops task, not a sysadmin task. You already do ops.

---

## Who owns what (do this right or it bites you later)

The single most damaging thing an agency can do is put the client's domain and
hosting under the agency's personal account. If the relationship ends, or your
card expires, or the domain lapses, the client can lose their website **and their
email** overnight. A lapsed domain can be grabbed by anyone and used to receive
their mail. Don't be the reason that happens.

**Rule: the client is the account holder. We are collaborators/admins.**

Two clean models — pick one per client and put it in writing:

### Model A — Client-owned (recommended default)
- Client creates the registrar account and the hosting account in their name, on their card.
- They invite us as a team member / collaborator with admin rights.
- We do all the actual work; they just hold the keys.
- Pros: cleanest ownership, no liability, nothing to untangle if you part ways. Cheapest for everyone (they pay platform cost directly).
- Cons: five minutes of setup friction on a client who "just wants it handled."

### Model B — We manage, billed through a retainer
- We hold the accounts but only under a signed care & maintenance retainer that says hosting is included and the client can take ownership at any time.
- Roll the platform cost (plus a small management margin) into the monthly fee.
- Pros: "one less thing" for the client; recurring revenue; ties to our ongoing tiers.
- Cons: you're now the single point of failure. Only do this with a retainer in place and a written ownership-transfer clause. Never do it informally.

> For most one-off website clients, use **Model A**. Reserve **Model B** for
> clients who are also on a care/maintenance or fractional-ops retainer, where
> managing hosting is part of what they're already paying for.

---

## Where to buy the domain

**Recommended: Cloudflare Registrar.**
- At-cost pricing, zero markup. A `.com` is about **$10.44/year**, same price to renew (no bait-and-switch renewal spike).
- Free WHOIS privacy and free DNSSEC included. No upsell carousel at checkout.
- Trade-off: domains registered here must use Cloudflare's nameservers. That's fine and even helpful, because we'll likely use Cloudflare DNS anyway. It just means you can't split DNS to a third party.
- This matches the rest of your stack — your own domains already live on Cloudflare.

**Fine alternatives** (if the client insists on registering it themselves and won't move):
- **Porkbun** — cheap, clean, no dark patterns, good if they want DNS elsewhere.
- **Namecheap** — reliable, slightly higher, decent privacy included.

**Avoid recommending GoDaddy / Squarespace domains** for new purchases — higher
renewals, constant upselling, and messier to manage. If a client already has one
there, that's fine; leave it and just point the DNS. Don't force a transfer
unless there's a reason.

**If the client already owns a domain:** do not move it during the build. Leave it
where it is, get DNS access, and only change the records that point the site.
Leave email (MX) records alone.

---

## Where to host the site

Pick by what you're building, not by habit.

### Simple marketing site (up to ~5 pages, static, editable)
- **Cloudflare Pages** or **Netlify.** Both have generous free tiers; Cloudflare Pages gives unlimited bandwidth and 500 builds/month free. For a small business brochure site, hosting is effectively $0.
- Great fit for the `$1,500–3,000` marketing-site tier.

### Next.js site, dynamic features, or a CMS
- **Vercel.** It's the best home for the Next.js sites you build — 100 GB bandwidth and 1M serverless invocations on the low tiers, first-class Next support, instant previews.
- Note: Vercel's free **Hobby** plan bans commercial use, so a paying client site needs **Pro (~$20/seat/month)**. Bill this through to the client or fold it into a retainer. Don't eat it silently.
- **Netlify Pro (~$19/month per team, not per user)** is a solid alternative with 1 TB bandwidth if you'd rather not be on Vercel for a given client.

### "It needs logins, payments, or a database"
- That's not a website anymore, it's a **platform build** (your `$20k+` tier). Same hosting logic (Vercel + a managed database like Supabase), but scope and price it as a platform, per the pricing page.

### If a client demands WordPress
- Don't self-host it. Use managed WordPress (Kinsta, WP Engine, or Cloudflare's WP offering). Costs more and you own more maintenance surface, so price accordingly and consider steering them to a CMS build instead unless they truly need the WordPress ecosystem.

---

## Email — leave it alone, and never self-host it

Email is where domain changes cause real damage, because breaking a business's
email is a five-alarm fire.

- **Never run a mail server.** For real mailboxes (`you@company.com`), use **Google Workspace** (your preference and a safe default) or Microsoft 365.
- If the client only needs to *forward* `hello@company.com` to a personal inbox, **Cloudflare Email Routing** does that for free — no mailbox, no cost.
- At DNS cutover, the MX records and any email-auth records (SPF, DKIM, DMARC) must be preserved exactly. Export the full DNS zone before you change anything, and change only the records that point the website.

---

## Rough annual cost to put in front of a client

| Item | Recommended | Ballpark |
| --- | --- | --- |
| Domain (.com) | Cloudflare Registrar | ~$10.44 / yr |
| Marketing-site hosting | Cloudflare Pages / Netlify free | $0 |
| Next.js / dynamic hosting | Vercel Pro or Netlify Pro | ~$19–20 / mo |
| DNS | Cloudflare | free |
| Email (real mailboxes) | Google Workspace | ~$7 / user / mo |
| Email (forward only) | Cloudflare Email Routing | free |

So a small marketing-site client can run for about **$10/year all-in** on the
domain, with free hosting. A Next.js/CMS client runs roughly **$20/month** in
hosting on top of that. These are their costs to carry (Model A) or line items in
a retainer (Model B) — either way, they're transparent and small.

---

## Default recommendation for this client

Until the intake comes back, plan for:

1. **Domain:** they buy (or we help them buy) at Cloudflare Registrar, in their name.
2. **DNS:** Cloudflare.
3. **Hosting:** Cloudflare Pages if it's a straightforward marketing site; Vercel if it's Next.js or needs a CMS. Account in the client's name (Model A).
4. **Email:** whatever they use today stays; protect the MX records at cutover. If they need new mailboxes, Google Workspace.
5. **Ownership:** client is the account holder on both domain and hosting; we're admins. Put it in the agreement.

Adjust once we see their answers to intake Q14–Q19 (current domain, host, and
email situation).

---

Sources for the current pricing and best-practice notes above:
- Cloudflare Registrar at-cost pricing and free WHOIS privacy — https://domains.cloudflare.com/ and https://www.stackscored.com/pricing/domain-registrars/cloudflare-registrar/
- Vercel / Netlify / Cloudflare Pages 2026 tiers — https://agentdeals.dev/hosting-free-tier-comparison-2026
- Why clients should own their domain and hosting — https://css-tricks.com/should-you-host-your-clients-websites/ and https://www.godaddy.com/resources/in/web-pro-in/why-your-clients-should-own-their-domain-email-and-hosting
