import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FoilText } from '@/components/foil-text';
import { EmailCapture } from '@/components/email-capture';

export const metadata: Metadata = {
  title: 'About',
  description:
    'the Motherload is built by Natalie — a working mom in Sioux Falls who got tired of productivity systems that don\u2019t fit the way moms actually live.',
  openGraph: {
    title: 'About · the Motherload',
    description:
      'Built by Natalie — a working mom in Sioux Falls. The story behind the Motherload and the rules every product has to pass.',
  },
};

/**
 * /about — Natalie's story + why the Motherload exists.
 *
 * Layout follows the home hero structure: Caveat eyebrow + DM Serif title
 * with one foil accent word, coral rule, then a stacked Fraunces body block.
 * Brand-voice rule: "the Motherload" — lowercase "the", capital "M" — in
 * body copy as well as nav.
 *
 * Voice: direct, specific (Sioux Falls, real specifics), warm without
 * saccharine, willing to swear (one "damn" ties back to the tagline). Not
 * "mama," not "mommy," not productivity-bro.
 *
 * Copy is a first draft — easy to swap out via this file. Real Resend +
 * Supabase wiring still pending so the email block console.logs for now.
 */
export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="px-6 pb-10 pt-7 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-content">
            <p
              className="mb-1 inline-block font-script text-eyebrow-script font-semibold text-coral-light"
              style={{ transform: 'rotate(-2deg)' }}
            >
              hi, I&rsquo;m Natalie &mdash;
            </p>

            <h1 className="font-ml-display text-[clamp(48px,12vw,96px)] italic leading-[0.95] text-cream">
              <span className="block">the woman</span>
              <FoilText italic className="block font-ml-display font-normal leading-[0.95]">
                behind it.
              </FoilText>
            </h1>

            <span className="rule-coral mb-6 mt-7" aria-hidden="true" />

            <div className="max-w-prose space-y-5 font-serif text-[18px] italic leading-relaxed text-blush sm:text-[19px]">
              <p>
                I live in Sioux Falls. I have kids, a job, a calendar that looks like a
                ransom note, and a working theory that most productivity advice was written
                by someone who has never been screamed at over the wrong color cup.
              </p>
              <p>
                By day I&rsquo;m a COO. By every other waking minute I&rsquo;m the COO of
                this house &mdash; <em className="not-italic font-mono text-[14px] font-semibold uppercase tracking-mono-label text-coral-light">Chief Chaos Coordinator</em>,
                by the actual job description. Different titles. Same job: running
                operations for people who didn&rsquo;t read the manual and still expect
                dinner.
              </p>
              <p>
                the Motherload is the thing I wish I&rsquo;d had ten years ago. Not another
                app. Not another guru. Just the small set of tools and templates that
                actually work when you&rsquo;re running the whole damn show &mdash; the
                school stuff, the work stuff, the dog, the dinner, the everything.
              </p>
              <p>
                Every product here started as something I built for myself, used for at
                least a month, and then sanded down until it was usable by anyone. If it
                doesn&rsquo;t survive a real Tuesday in this house, it doesn&rsquo;t make
                it into the shop.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 pb-10 sm:px-8">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">&mdash; the rules &mdash;</p>
            <ul className="space-y-3">
              {RULES.map((rule, i) => (
                <li
                  key={i}
                  className="flex gap-3 font-serif text-[17px] italic leading-snug text-cream"
                >
                  <span aria-hidden="true" className="mt-2.5 block h-px w-4 flex-none bg-coral" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 pb-12 pt-2 sm:px-8 sm:pb-16">
          <div className="mx-auto max-w-content space-y-4 font-serif text-[18px] italic leading-relaxed text-blush">
            <p>
              the Motherload is part of <em className="font-serif italic text-coral-light">Real Tuesday</em>,
              a small studio I&rsquo;m building to put out work that&rsquo;s worth your
              time on a Tuesday afternoon.
            </p>
            <p className="font-serif text-cream">
              If any of this lands &mdash;{' '}
              <Link
                href="/products"
                className="font-mono text-[11px] not-italic font-semibold uppercase tracking-mono-label text-coral-light underline-offset-4 hover:underline"
              >
                see the shop &rarr;
              </Link>
            </p>
          </div>
        </section>

        <section className="px-6 pb-16 sm:px-8 sm:pb-24">
          <div className="mx-auto max-w-content">
            <EmailCapture
              source="home-email-capture"
              title={'Get one email\na week.'}
              description="One email a week, max. Unsubscribe anytime."
              submitLabel="Send it over"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const RULES = [
  'If I haven\u2019t used it for a month, it\u2019s not in the shop.',
  'Every download is a single PDF. No accounts, no apps, no logins.',
  'No "mama," no "mommy," no pink wine, no bubble baths.',
  'If you bought something and it didn\u2019t help, email me. Let\u2019s figure it out.',
];
