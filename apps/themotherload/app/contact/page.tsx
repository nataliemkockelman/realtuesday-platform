import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FoilText } from '@/components/foil-text';
import { ContactForm } from '@/components/contact-form';

/**
 * /contact — tell Natalie what to build next.
 *
 * The pitch: this isn't a generic contact form. It's a "what should I make
 * next?" intake. If the suggestion turns into a real product, the suggester
 * gets it free. Keeps the audience involved in the roadmap and gives Natalie
 * direct signal on what to build.
 *
 * For MVP the form opens the visitor's email client via a pre-filled mailto:
 * — no backend needed. When Resend + Supabase are fully wired, swap the
 * mailto for a real /api/contact POST route.
 */
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell me what to build next. If your idea turns into an asset, you get it free.',
  openGraph: {
    title: 'Contact · the Motherload',
    description:
      'What do you want to see next? Tell me. If your idea ships, you get it free.',
  },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ─── HERO ────────────────────────────────────────── */}
        <section className="px-6 pb-10 pt-7 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-content">
            <p
              className="mb-1 inline-block font-script text-eyebrow-script font-semibold text-coral-light"
              style={{ transform: 'rotate(-2deg)' }}
            >
              your turn &mdash;
            </p>

            <h1 className="font-ml-display text-[clamp(40px,10vw,80px)] italic leading-[0.95] text-cream">
              <span className="block">what do you want</span>
              <FoilText italic className="block font-ml-display font-normal leading-[0.95]">
                to see next?
              </FoilText>
            </h1>

            <span className="rule-coral mb-6 mt-7" aria-hidden="true" />

            <div className="max-w-prose space-y-4 font-serif text-[18px] italic leading-relaxed text-blush sm:text-[19px]">
              <p>
                Every product here started as something I needed in my own house. So if
                there&rsquo;s a thing you wish existed &mdash; the spreadsheet, the prompt,
                the cheat sheet, the printable, the system &mdash; tell me about it.
              </p>
              <p className="text-cream">
                <strong className="font-semibold not-italic font-mono text-[12px] uppercase tracking-mono-label text-coral-light">
                  The deal:
                </strong>{' '}
                if your idea turns into an asset, you get it free. Just for the suggestion.
              </p>
              <p>
                The best ones tend to be the things you&rsquo;ve already MacGyvered for
                yourself and would pay someone else to finish. Send those.
              </p>
            </div>
          </div>
        </section>

        {/* ─── FORM ─────────────────────────────────────────── */}
        <section className="bg-cream px-6 pb-14 pt-12 text-navy sm:px-8 sm:pb-20 sm:pt-16">
          <div className="mx-auto max-w-content">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-mono-eyebrow text-coral">
              &mdash; the suggestion box &mdash;
            </p>
            <h2 className="mb-2 mt-3 max-w-prose font-ml-display text-[clamp(28px,6vw,40px)] italic leading-[1.05] text-navy">
              Tell me what you&rsquo;d use.
            </h2>
            <p className="mb-7 max-w-prose font-serif text-[16px] italic leading-relaxed text-navy/75">
              Two fields. Thirty seconds. Goes straight to my inbox.
            </p>

            <ContactForm />
          </div>
        </section>

        {/* ─── OUTRO ────────────────────────────────────────── */}
        <section className="px-6 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-3">&mdash; the fine print &mdash;</p>
            <ul className="space-y-3 font-serif text-[16px] italic leading-snug text-cream">
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 block h-px w-4 flex-none bg-coral" />
                <span>
                  &ldquo;Get it free&rdquo; means a free download of the finished PDF
                  &mdash; the same one I&rsquo;d sell on Gumroad or Etsy.
                </span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 block h-px w-4 flex-none bg-coral" />
                <span>
                  If multiple people suggest the same thing, everyone who sent it gets a
                  copy.
                </span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 block h-px w-4 flex-none bg-coral" />
                <span>
                  I read everything. I won&rsquo;t make everything. But if it makes the
                  cut, I&rsquo;ll email you when it ships.
                </span>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
