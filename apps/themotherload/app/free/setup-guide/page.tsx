import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FoilText } from '@/components/foil-text';
import { SetupGuideForm } from './setup-guide-form';

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

            {/* Hero email capture — cream block interrupts the navy column,
                same -mx-6 sm:-mx-8 trick used elsewhere on the site. */}
            <div className="-mx-6 mt-8 rounded-xl bg-cream px-6 pb-10 pt-9 text-navy sm:-mx-8 sm:px-8">
              <p
                className="inline-block font-script text-[22px] font-semibold leading-none text-coral"
                style={{ transform: 'rotate(-2deg)' }}
              >
                drop your email
              </p>
              <h2 className="mb-2.5 mt-2 font-ml-display text-[28px] italic leading-[1.05] text-navy sm:text-[32px]">
                One email. PDF lands in your inbox in 60 seconds.
              </h2>
              <SetupGuideForm position="hero" />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-mono-label text-navy/60">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>

        {/* ─── WHAT YOU WALK AWAY WITH ─────────────────────── */}
        <section className="px-6 pb-12 pt-2 sm:px-8 sm:pb-16">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">&mdash; what you walk away with &mdash;</p>
            <h2 className="mb-7 max-w-prose font-ml-display text-[clamp(28px,6vw,40px)] italic leading-[1.05] text-cream">
              Four things, fully done. Not homework.
            </h2>
            <ul className="space-y-3">
              {DELIVERABLES.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-4 font-serif text-[17px] italic leading-snug text-cream"
                >
                  <span
                    aria-hidden="true"
                    // Coral numbered marker — small mono digit, doesn't
                    // shrink with the body text.
                    className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full border border-coral/40 font-mono text-[11px] font-semibold not-italic text-coral-light"
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
        <section className="px-6 pb-12 sm:px-8 sm:pb-16">
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
                  className="rounded-lg border border-coral/20 bg-navy/40 px-5 py-5"
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

        {/* ─── CONTEXT BUILDER CARD ────────────────────────── */}
        <section className="px-6 pb-12 sm:px-8 sm:pb-16">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">&mdash; or skip the typing &mdash;</p>
            {/* Plain <a> — /context-builder is a static HTML file in /public
                served via a next.config rewrite, NOT a Next.js route, so
                typedRoutes shouldn't and doesn't know about it. */}
            <a
              href="/context-builder"
              className="group block rounded-xl border border-coral/30 bg-navy/40 p-6 transition-colors hover:border-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy sm:p-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                <div className="max-w-prose">
                  <h3 className="font-ml-display text-[24px] italic leading-tight text-cream sm:text-[28px]">
                    Don&rsquo;t feel like typing? Use the form.
                  </h3>
                  <p className="mt-2 font-serif text-[15px] italic leading-relaxed text-blush sm:text-[16px]">
                    Same questions as the workbook, just clickable. Fill it out, click export,
                    paste the result into Claude. Done.
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="inline-flex flex-none items-center gap-2 self-start font-mono text-[11px] font-semibold uppercase tracking-mono-label text-coral-light transition-transform group-hover:translate-x-1"
                >
                  Open the builder &rarr;
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* ─── PAID PRODUCT TEE-UP ─────────────────────────── */}
        <section className="px-6 pb-12 sm:px-8 sm:pb-16">
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
              Coming soon &middot; on the email list, you&rsquo;ll hear first
            </p>
          </div>
        </section>

        {/* ─── FINAL EMAIL CAPTURE ─────────────────────────── */}
        <section className="px-6 pb-16 pt-2 sm:px-8 sm:pb-24">
          <div className="mx-auto max-w-content">
            <div className="-mx-6 rounded-xl bg-cream px-6 pb-10 pt-9 text-navy sm:-mx-8 sm:px-8">
              <p
                className="inline-block font-script text-[22px] font-semibold leading-none text-coral"
                style={{ transform: 'rotate(-2deg)' }}
              >
                last call
              </p>
              <h2 className="mb-2.5 mt-2 font-ml-display text-[28px] italic leading-[1.05] text-navy sm:text-[32px]">
                Send me the setup guide.
              </h2>
              <p className="mb-5 font-serif text-[14px] italic leading-normal text-navy/60">
                Twenty minutes from now you could be done with this part. Drop your email.
              </p>
              <SetupGuideForm position="final" />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-mono-label text-navy/60">
                No spam. Unsubscribe anytime.
              </p>
            </div>

            {/* Caveat tagline that lives at the bottom of every Motherload page */}
            <p
              className="mt-10 text-center font-script text-[26px] leading-none text-coral-light"
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
