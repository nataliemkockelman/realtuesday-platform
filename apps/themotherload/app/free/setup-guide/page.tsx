import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FoilText } from '@/components/foil-text';
import { SubscribeForm } from '@/components/subscribe-form';

/**
 * /free/setup-guide — Claude, Meet Your Family (free setup guide).
 *
 * Static route — takes precedence over /free/[slug] for this exact path.
 * The slug is still registered in lib/lead-magnets.ts so /api/subscribe
 * validates `{ lead_magnet: 'setup-guide' }` submissions; the page itself
 * does NOT consume the LEAD_MAGNETS entry because the content here is
 * richer than the dynamic template supports (time-estimate strip,
 * context-builder section, paid-product tee-up, two captures).
 *
 * TODO(content): The "what you walk away with" bullets are inferred from
 * the workbook's premise (setting up Claude with family context). Swap
 * with the verbatim list from Section 01 of the workbook PDF once read.
 */

// Title is split: cream lead + coral foil on the second half. "Meet Your
// Family" (16 chars) is the longest foiled word — its size drives the
// clamp below, since the SVG <text> doesn't wrap.
const WORKBOOK_TITLE_LEAD = 'Claude,';
const WORKBOOK_TITLE_FOIL = 'Meet Your Family.';

export const metadata: Metadata = {
  title: 'Claude, Meet Your Family — free setup guide',
  description:
    'Set up Claude to know your family in about 20 minutes. Free setup guide from the Motherload.',
  openGraph: {
    title: 'Claude, Meet Your Family — free setup guide',
    description:
      'Set up Claude to know your family in about 20 minutes. Free setup guide from the Motherload.',
  },
};

const DELIVERABLES = [
  'The 10-minute Claude account setup — what to install, what to skip',
  'The Family Context Doc template — fill-in-the-blank, no blank page',
  'The 5 test prompts that prove it worked (or tell you what to fix)',
  'Where to save it so it actually gets used every week',
];

const TIME_BLOCKS = [
  { mono: '10 MIN', label: 'Setup', note: 'Install. Sign in. Skip the upsells.' },
  { mono: '10 MIN', label: 'Context doc', note: 'Fill in the template. Don\u2019t overthink it.' },
  { mono: '2 MIN', label: 'Test it', note: 'Five prompts that tell you it worked.' },
];

export default function SetupGuidePage() {
  return (
    <>
      <Nav />
      <main>
        {/* ─── HERO ────────────────────────────────────────── */}
        <section className="px-6 pb-10 pt-7 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">free &middot; start here</p>

            {/* Two-line title: cream "Claude," + coral foil "Meet Your Family."
                Sized so "Meet Your Family." (16 chars + final period) fits
                at 375px without wrapping the SVG <text>. */}
            <h1 className="font-ml-display text-[clamp(36px,9vw,72px)] italic leading-[0.95] text-cream">
              <span className="block">{WORKBOOK_TITLE_LEAD}</span>
              <FoilText italic className="block font-ml-display font-normal leading-[0.95]">
                {WORKBOOK_TITLE_FOIL}
              </FoilText>
            </h1>

            <span className="rule-coral mb-5 mt-6" aria-hidden="true" />

            <p className="max-w-prose font-serif text-lg italic leading-relaxed text-blush sm:text-xl">
              The setup guide. 20 minutes. Then Claude knows your kids, your schedule, your
              standards &mdash; and stops making you re-explain your life every time you open a chat.
            </p>

            {/* Single primary CTA: start with the guide. The context builder
                is a tool used INSIDE the guide (Section 06) — it is not an
                alternative to the guide. A previous "OR use the context
                builder" framing made people skip the guide, hit Copy on the
                builder, and have no idea where to paste the result. The
                builder link is kept as a quiet secondary for repeat visitors
                who already know what they're doing. */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <a
                href="/free-downloads/claude-meet-your-family.pdf"
                download
                className="inline-flex items-center gap-2 bg-coral px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-label text-cream transition-colors hover:bg-coral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
              >
                Start here. Download the guide.
                <span aria-hidden="true">&darr;</span>
              </a>
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-mono-label text-peach/70">
              Already done the setup?{' '}
              <a
                href="/context-builder.html"
                className="underline decoration-peach/40 underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
              >
                Skip to the context builder &rarr;
              </a>
            </p>
          </div>
        </section>

        {/* ─── WHAT YOU WALK AWAY WITH ─────────────────────── */}
        {/* Full-bleed cream section. bg-cream sits on the <section> itself
            so it stretches to the viewport edges; content stays centered
            inside max-w-content. No rounded inner panel. */}
        <section className="bg-cream px-6 pb-14 pt-12 text-navy sm:px-8 sm:pb-20 sm:pt-16">
          <div className="mx-auto max-w-content">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-mono-eyebrow text-coral">
              &mdash; what you walk away with &mdash;
            </p>
            <h2 className="mb-7 mt-3 max-w-prose font-ml-display text-[clamp(28px,6vw,40px)] italic leading-[1.05] text-navy">
              Four things, fully done. Not homework.
            </h2>
            <ul className="space-y-3">
              {DELIVERABLES.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-4 font-serif text-[17px] italic leading-snug text-navy"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full border border-coral font-mono text-[11px] font-semibold not-italic text-coral"
                  >
                    {String(i + 1).padStart(2, '0').slice(-1)}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─── HONEST TIME ESTIMATE ────────────────────────── */}
        {/* No border-t needed — the cream panel above ends, then this
            navy section starts. Cream→navy IS the divider. */}
        <section className="px-6 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-14">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">&mdash; the honest time estimate &mdash;</p>
            <h2 className="mb-2 max-w-prose font-ml-display text-[clamp(28px,6vw,40px)] italic leading-[1.05] text-cream">
              About 20 minutes. Not 20 minutes &ldquo;in theory.&rdquo;
            </h2>
            <p className="mb-7 max-w-prose font-serif text-[17px] italic leading-relaxed text-blush">
              I timed it. With one kid asking what&rsquo;s for dinner in the background.
            </p>

            <ol className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {TIME_BLOCKS.map((block, i) => (
                <li
                  key={i}
                  // bg-white/[0.04] lifts the card just enough to read off
                  // the navy field. Stronger coral border for definition.
                  className="rounded-lg border border-coral/40 bg-white/[0.04] px-5 py-5"
                >
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-mono-label text-coral-light">
                    {block.mono}
                  </p>
                  <p className="mt-2 font-ml-display text-[22px] italic leading-tight text-cream">
                    {block.label}
                  </p>
                  <p className="mt-1.5 font-serif text-[14px] italic leading-snug text-blush">
                    {block.note}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── CONTEXT BUILDER ─────────────────────────────── */}
        {/* Second full-bleed cream section. */}
        <section className="bg-cream px-6 pb-14 pt-12 text-navy sm:px-8 sm:pb-20 sm:pt-16">
          <div className="mx-auto max-w-content">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-mono-eyebrow text-coral">
              &mdash; or skip the typing &mdash;
            </p>
            {/* Plain <a> — context-builder.html is a static file in /public,
                NOT a Next.js route, so typedRoutes shouldn't know. */}
            <a
              href="/context-builder.html"
              className="group mt-4 block rounded-lg border border-coral/40 bg-coral/[0.06] p-5 transition-colors hover:border-coral hover:bg-coral/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-cream sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                <div className="max-w-prose">
                  <h3 className="font-ml-display text-[24px] italic leading-tight text-navy sm:text-[28px]">
                    Skip the typing. Use the context builder.
                  </h3>
                  <p className="mt-2 font-serif text-[15px] italic leading-relaxed text-navy/70 sm:text-[16px]">
                    Fills in for you. Copy, paste, done.
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="inline-flex flex-none items-center gap-2 self-start font-mono text-[11px] font-semibold uppercase tracking-mono-label text-coral transition-transform group-hover:translate-x-1"
                >
                  Open the builder &rarr;
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* ─── PAID PRODUCT TEE-UP ─────────────────────────── */}
        <section className="px-6 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-14">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">&mdash; what&rsquo;s next &mdash;</p>
            <h2 className="max-w-prose font-ml-display text-[clamp(28px,6vw,40px)] italic leading-[1.05] text-cream">
              The AI Calendar Cheat is the next step.
            </h2>
            <p className="mt-4 max-w-prose font-serif text-[17px] italic leading-relaxed text-blush">
              Once Claude knows your family, the calendar system is where the time savings live —
              every prompt, every weekly rhythm, every shortcut I actually use.
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-mono-label text-coral-light">
              Coming soon
            </p>
          </div>
        </section>

        {/* ─── OPTIONAL: PART 2 NOTIFICATION ───────────────── */}
        {/* Soft email ask in a compact cream card — intentionally smaller
            than the hero CTAs and not full-bleed (this is opt-in, not the
            main attraction). SubscribeForm posts to /api/subscribe with
            source: 'home-email-capture' (newsletter, not lead-magnet). */}
        <section className="px-6 pb-16 pt-4 sm:px-8 sm:pb-24">
          <div className="mx-auto max-w-content">
            <div className="rounded-xl bg-cream px-6 pb-8 pt-7 text-navy sm:px-8 sm:pb-10 sm:pt-9">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-mono-eyebrow text-coral">
                &mdash; optional &mdash;
              </p>
              <h2 className="mt-3 font-ml-display text-[22px] italic leading-tight text-navy sm:text-[26px]">
                Hear first when the AI Calendar Cheat ships.
              </h2>
              <p className="mb-5 mt-2 font-serif text-[14px] italic leading-relaxed text-navy/60">
                One email when it&rsquo;s ready. Nothing else.
              </p>
              <SubscribeForm
                source="home-email-capture"
                placeholder="your email"
                submitLabel="Notify me"
              />
            </div>

            {/* Caveat tagline that lives at the bottom of every Motherload page */}
            <p
              className="mt-14 text-center font-script text-[26px] leading-none text-coral-light"
              style={{ transform: 'rotate(-1.5deg)', transformOrigin: 'center' }}
            >
              for moms running the whole damn show
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
