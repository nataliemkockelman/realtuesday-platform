# Real Tuesday Platform

Monorepo for the Real Tuesday brand portfolio.

- `apps/themotherload` — themotherload.co (public site, Phase 1)
- `apps/realtuesday` — realtuesday.co (parent portfolio, placeholder later)
- `apps/dashboard` — app.realtuesday.co (admin, later)
- `packages/ui` — shared shadcn/ui components (later)
- `packages/brand` — brand tokens + Python PDF template skills (later)
- `packages/db` — Supabase types and query helpers (later)

## First-time setup

```bash
nvm use            # node 20
pnpm install
pnpm fonts:install # downloads brand fonts into apps/themotherload/app/fonts/
pnpm dev:motherload
```

Open http://localhost:3000

## Stack (locked — see `realtuesday-tech-spec.md`)

Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Supabase · Vercel · Resend · Plausible/Umami.

Don't add to the stack without a reason.

## Conventions

- Mobile-first. Verify every page at 375px before declaring it done.
- Brand kit is the source of truth. If anything contradicts it, brand kit wins.
- Self-host all fonts via `next/font/local`. No Google Fonts CDN.
- Use cream `#F6F1E8` instead of pure white. Use navy `#1A2238` instead of pure black.
- Coral foil headlines render as SVG, not CSS `background-clip: text`.
