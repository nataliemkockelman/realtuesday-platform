import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllNotes } from '@/lib/notes';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';

/**
 * /notes — index of all newsletter posts.
 *
 * One post for now (Issue 01); when there are 10+ posts revisit
 * pagination, archive groupings, and an RSS feed. Until then, a simple
 * vertical stack is the right tool.
 *
 * Layout mirrors the home hero's editorial column: copper eyebrow,
 * Bricolage + Fraunces-foil title, copper rule, italic deck — then the
 * list of posts below.
 */
export const metadata: Metadata = {
  title: 'notes',
  description: 'notes from a tuesday, a weekly drop from Real Tuesday. short, honest, useful. free.',
};

export default async function NotesIndexPage() {
  const notes = await getAllNotes();

  return (
    <main className="min-h-screen bg-navy">
      <SiteNav />

      {/* Dark hero moment: the foil title lives on navy where the gradient
          reads. The archive list below sits on cream. */}
      <section className="px-6 pt-8 pb-9 sm:px-8 sm:pt-12">
        <div className="mx-auto max-w-content">
          <p className="mb-7 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
            the newsletter
          </p>

          <h1>
            <span className="mb-1 block font-display text-[56px] font-extrabold leading-[0.9] tracking-[-0.05em] lowercase text-cream sm:text-[88px]">
              notes from
            </span>
            <FoilText
              variant="copper"
              className="block font-serif italic font-normal text-[56px] leading-[1] tracking-[-0.03em] pb-2 sm:text-[88px]"
            >
              a tuesday.
            </FoilText>
          </h1>

          <span className="rule-copper mt-3 mb-[22px]" />

          <p className="max-w-prose font-serif italic text-lg leading-[1.45] text-soft-gold sm:text-xl">
            A weekly drop from Real Tuesday. Short, honest, useful. Free.
          </p>
        </div>
      </section>

      {/* Cream archive. Cards render the title in solid deep-copper serif
          italic rather than foil, since the gradient washes out on cream. */}
      <div className="bg-cream text-navy">
        <section className="px-6 py-12 sm:px-8 sm:py-14">
          <div className="mx-auto max-w-content">
            <ul className="grid gap-3.5">
              {notes.map((note) => (
                <li key={note.slug}>
                  <Link
                    href={`/notes/${note.slug}`}
                    className="block rounded-xl border border-navy/10 bg-white/60 p-[22px_20px] no-underline transition-colors hover:border-navy/70 sm:p-[28px_28px]"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full border border-navy/40 px-3 py-1 font-mono text-[10px] uppercase tracking-mono-label text-navy">
                        {note.issueLabel}
                      </span>
                      <span className="font-serif italic text-xs text-navy/70">
                        {note.readingTime}
                      </span>
                    </div>
                    <h2 className="mb-2 font-serif italic text-[32px] font-normal leading-[0.95] tracking-[-0.03em] lowercase text-deep-copper sm:text-[40px]">
                      {note.title}
                    </h2>
                    <p className="font-serif italic text-sm leading-[1.5] text-navy/70">
                      {note.deck}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
