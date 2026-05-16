import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';

/**
 * Home page — matches realtuesday-site-mockup.html structure.
 *
 *   nav · hero · portfolio (3 brand cards) · newsletter signup · footer
 *
 * All sizing, spacing, and color values trace back to the mockup CSS.
 * Foil text (Tuesday in hero, "make" in section title, "a tuesday" in
 * newsletter title, Motherload in card) uses SVG <FoilText /> per brand
 * spec — not CSS background-clip.
 *
 * The newsletter form is wired to a no-op handler that console.logs the
 * email for now. Supabase wiring lands once the brand has a deploy target.
 */
export default function HomePage() {
  return (
    // Full-bleed main; each section wraps its contents in a max-w-content
    // (1152px) container so the page reads as a proper desktop site
    // while staying mockup-faithful on mobile. Matches the
    // themotherload.co pattern for parity across the parent + sub-brand.
    <main className="min-h-screen">
      <SiteNav />
      <Hero />
      <Portfolio />
      <NewsletterBlock />
      <SiteFooter />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Nav                                                                       */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="px-6 pt-8 pb-9 sm:px-8">
      <div className="mx-auto max-w-content">
        <p className="mb-7 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
          — est · sioux falls —
        </p>

        {/* Hero typography scales up aggressively on desktop so the
            wordmark fills the centered max-w-content column rather than
            hugging the left edge of a too-wide gutter. Mobile keeps the
            mockup-faithful 92px size. */}
        <h1>
          <span className="mb-1 block font-display text-[92px] font-extrabold leading-[0.85] tracking-[-0.06em] lowercase text-cream sm:text-[160px] lg:text-[200px]">
            real
          </span>
          <FoilText
            variant="copper"
            className="block font-serif italic font-normal text-[92px] leading-[1] tracking-[-0.03em] pb-3.5 sm:text-[160px] lg:text-[200px]"
          >
            Tuesday
          </FoilText>
        </h1>

        <span className="rule-copper mt-3 mb-[22px]" />

        <p className="mb-7 max-w-prose font-serif italic text-lg leading-[1.45] text-soft-gold sm:text-xl">
          A studio making things worth your Tuesday. Honest brands for people doing real work.
        </p>

        <div className="flex items-center gap-1">
          <a
            href="#newsletter"
            className="inline-block rounded bg-copper px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-mono-button text-navy no-underline"
          >
            Read the newsletter →
          </a>
          <a
            href="#brands"
            className="ml-2 inline-block shrink-0 whitespace-nowrap px-2 py-4 font-mono text-[11px] font-semibold uppercase tracking-mono-button text-bright-copper no-underline"
          >
            see brands →
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Portfolio — 3 brand cards                                                 */
/* -------------------------------------------------------------------------- */

function Portfolio() {
  return (
    <section id="brands" className="px-6 pt-7 pb-7 sm:px-8 sm:pt-12 sm:pb-12">
      <div className="mx-auto max-w-content">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
          — the portfolio —
        </p>
        {/* "what we" = Bricolage extrabold cream, "make" = Fraunces italic foil */}
        <h2 className="font-display text-[44px] font-extrabold leading-[0.95] tracking-[-0.04em] lowercase text-cream pb-1.5 sm:text-[64px]">
          what we{' '}
          <FoilText
            variant="copper-tight"
            className="font-serif italic font-normal text-[44px] leading-[0.95] tracking-[-0.04em] sm:text-[64px]"
          >
            make
          </FoilText>
          .
        </h2>
        <p className="mt-3.5 mb-[22px] max-w-prose font-serif italic text-sm leading-[1.5] text-soft-gold sm:text-base">
          Three brands so far. Each one for a different kind of person doing real work.
        </p>

        {/* Stack on mobile, 3-up grid on desktop */}
        <div className="grid gap-3.5 lg:grid-cols-3 lg:gap-5">
          <MotherloadCard />
          <MintConditionCard />
          <RealTalkCard />
        </div>
      </div>
    </section>
  );
}

function MotherloadCard() {
  return (
    <a
      href="https://themotherload.co"
      className="block rounded-xl border border-coral/40 bg-navy-card p-[22px_20px] no-underline"
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="rounded-full bg-coral px-2 py-1 font-mono text-[8px] font-semibold uppercase tracking-mono-label text-cream">
          Live
        </span>
        <span className="h-3 w-3 rounded-full bg-coral" aria-hidden />
      </div>

      {/* "the Motherload" wordmark — Caveat "the" tilted, then coral-foil "Motherload" in DM Serif italic */}
      <div className="mb-2 leading-none">
        <span className="mr-1 inline-block -mb-2 -rotate-[4deg] font-script text-lg font-semibold text-cream">
          the
        </span>
        <FoilText
          variant="coral"
          className="font-ml-display italic font-normal text-[28px] leading-none"
        >
          Motherload
        </FoilText>
      </div>

      <p className="mb-4 font-serif italic text-[13px] leading-[1.55] text-blush">
        Real tools and cheat sheets for moms running the whole damn show. AI-powered calendaring,
        sports logistics, and other mom stuff.
      </p>

      <div className="flex items-center justify-between border-t border-soft-gold/15 pt-3.5">
        <span className="font-mono text-[9px] uppercase tracking-mono-button text-bright-copper">
          — FOR MOMS —
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-mono-button text-soft-gold">
          visit →
        </span>
      </div>
    </a>
  );
}

function MintConditionCard() {
  return (
    // Mint Condition = sub-brand 2 under Real Tuesday parent. Bry's pick.
    // Brand kit: Space Grotesk wordmark, mint #A8C8A0 accent, tagline
    // "life, mostly intact, sometimes pristine." Stamp: "a real tuesday thing".
    // Treatment mirrors the Motherload card — uses the sub-brand's own
    // typography and accent so each card carries its identity.
    <div className="rounded-xl border border-mint/30 bg-navy-card p-[22px_20px]">
      <div className="mb-4 flex items-start justify-between">
        <span className="rounded-full bg-mint/20 px-2 py-1 font-mono text-[8px] font-semibold uppercase tracking-mono-label text-mint">
          Coming soon
        </span>
        <span className="h-3 w-3 rounded-full bg-mint" aria-hidden />
      </div>

      {/* MC monogram pill above the wordmark — matches the brand kit's
          profile-pic/sticker lockup but small enough to sit inline. */}
      <div className="mb-2 flex items-baseline gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-mint/15 font-mc-display text-[10px] font-bold tracking-tight text-mint">
          MC
        </span>
        <span className="font-mc-display text-[24px] font-bold leading-none tracking-[-0.02em] text-cream">
          Mint Condition
        </span>
      </div>

      <p className="mb-4 font-serif italic text-[13px] leading-[1.55] text-blush">
        Life, mostly intact, sometimes pristine. A guy being honest about how it&apos;s actually
        going — dads, schedules, side hustles, learning Claude in real time.
      </p>

      <div className="flex items-center justify-between border-t border-mint/15 pt-3.5">
        <span className="font-mono text-[9px] uppercase tracking-mono-button text-mint">
          — FOR DADS —
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-mono-button text-mint-sage">
          2026
        </span>
      </div>
    </div>
  );
}

function RealTalkCard() {
  return (
    // Real Talk = third sub-brand under Real Tuesday parent. Brand kit
    // pending — using Bryan's TBD treatment (gold pill + Bricolage
    // lowercase wordmark) until the kit lands and we can swap in the real
    // accent color, type, and description.
    <div className="rounded-xl border border-copper/15 bg-navy-card p-[22px_20px]">
      <div className="mb-4 flex items-start justify-between">
        <span className="rounded-full bg-soft-gold/15 px-2 py-1 font-mono text-[8px] font-semibold uppercase tracking-mono-label text-soft-gold">
          Coming soon
        </span>
        <span className="h-3 w-3 rounded-full bg-[#c4a574]" aria-hidden />
      </div>

      <div className="mb-2 font-display text-[26px] font-extrabold leading-none tracking-[-0.04em] lowercase text-cream">
        real talk
      </div>

      <p className="mb-4 font-serif italic text-[13px] leading-[1.55] text-blush">
        Coming soon. A third brand from the Real Tuesday family. Brand kit in the works.
      </p>

      <div className="flex items-center justify-between border-t border-soft-gold/15 pt-3.5">
        <span className="font-mono text-[9px] uppercase tracking-mono-button text-bright-copper">
          — TBD —
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-mono-button text-[#5a6478]">
          2026
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Newsletter — cream island                                                 */
/* -------------------------------------------------------------------------- */

function NewsletterBlock() {
  return (
    <section id="newsletter" className="px-6 pt-2 pb-2 sm:px-8">
      <div className="mx-auto max-w-content">
        <div className="rounded-xl bg-cream px-6 pt-8 pb-9 text-navy sm:px-10 sm:pt-12 sm:pb-14">
          <p className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-mono-eyebrow text-copper">
            — THE NEWSLETTER —
          </p>
          <h2 className="mb-1.5 pb-1 font-display text-[38px] font-extrabold leading-[0.95] tracking-[-0.05em] lowercase sm:text-[56px]">
            notes from
            <br />
            <FoilText
              variant="copper-tight"
              className="font-serif italic font-normal text-[38px] leading-[0.95] tracking-[-0.05em] sm:text-[56px]"
            >
              a tuesday
            </FoilText>
            .
          </h2>
          <p className="mb-5 max-w-prose font-serif italic text-sm leading-[1.5] text-[#5a6478] sm:text-base">
            A weekly drop from Real Tuesday. Short, honest, useful. Free.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}

function NewsletterForm() {
  // Stacked on mobile (matches mockup), side-by-side input + button on desktop.
  // Wired to server-side console.log for now; swap for a Supabase insert
  // when the `subscribers` table comes online (brand: 'realtuesday',
  // source: 'newsletter').
  return (
    <form
      className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch sm:gap-2"
      action={async (formData: FormData) => {
        'use server';
        const email = formData.get('email')?.toString().trim();
        console.log('[realtuesday/newsletter] signup:', { email, brand: 'realtuesday', source: 'newsletter' });
      }}
    >
      <input
        name="email"
        type="email"
        required
        placeholder="your email"
        aria-label="your email"
        className="flex-1 rounded border border-[#ecdfd2] bg-white px-4 py-3.5 font-body text-sm text-navy"
      />
      <button
        type="submit"
        className="rounded border-0 bg-navy px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-mono-button text-cream sm:whitespace-nowrap"
      >
        Send it over →
      </button>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

/* Footer moved to components/site-footer.tsx so /about, /contact, /notes
   all share the same lockup. */
