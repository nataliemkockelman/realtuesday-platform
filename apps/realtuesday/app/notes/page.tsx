import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllNotes } from '@/lib/notes';
import { FoilText } from '@/components/foil-text';

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
  description: 'notes from a tuesday — a weekly drop from Real Tuesday. short, honest, useful. free.',
};

export default async function NotesIndexPage() {
  const notes = await getAllNotes();

  return (
    <main className="min-h-screen">
      <nav className="px-6 pt-12 pb-4 sm:px-8">
        <div className="mx-auto flex max-w-content items-center justify-between">
          <Link
            href="/"
            aria-label="real Tuesday — home"
            className="relative flex h-8 w-8 items-center justify-center rounded bg-cream text-navy"
          >
            <span className="font-display text-base font-extrabold leading-none tracking-[-0.05em]">
              rT
            </span>
            <span className="absolute bottom-[5px] left-[5px] h-[1.5px] w-[6px] bg-copper" />
          </Link>
          <Link
            href="/"
            className="font-mono text-[10px] font-semibold uppercase tracking-mono-button text-bright-copper no-underline"
          >
            ← back
          </Link>
        </div>
      </nav>

      <section className="px-6 pt-8 pb-9 sm:px-8 sm:pt-12">
        <div className="mx-auto max-w-content">
          <p className="mb-7 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
            — the newsletter —
          </p>

          <h1>
            <span className="mb-1 block font-display text-[56px] font-extrabold leading-[0.9] tracking-[-0.05em] lowercase text-cream sm:text-[88px]">
              notes from
            </span>
            <FoilText
              variant="copper"
              className="block font-serif italic font-normal text-[56px] leading-[1] tracking-[-0.03em] pb-2 sm:text-[88px]"
            >
              a tuesday
            </FoilText>
            <span className="font-display text-[56px] font-extrabold leading-[0.9] tracking-[-0.05em] lowercase text-cream sm:text-[88px]">
              .
            </span>
          </h1>

          <span className="rule-copper mt-3 mb-[22px]" />

          <p className="mb-12 max-w-prose font-serif italic text-lg leading-[1.45] text-soft-gold sm:text-xl">
            A weekly drop from Real Tuesday. Short, honest, useful. Free.
          </p>

          {/* Post list */}
          <ul className="grid gap-3.5">
            {notes.map((note) => (
              <li key={note.slug}>
                <Link
                  href={`/notes/${note.slug}`}
                  className="block rounded-xl border border-copper/15 bg-navy-card p-[22px_20px] no-underline transition-colors hover:border-copper/40 sm:p-[28px_28px]"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full border border-copper px-3 py-1 font-mono text-[10px] uppercase tracking-mono-label text-soft-gold">
                      {note.issueLabel}
                    </span>
                    <span className="font-serif italic text-xs text-bright-copper">
                      {note.readingTime}
                    </span>
                  </div>
                  <h2 className="mb-2 font-display text-[32px] font-extrabold leading-[0.95] tracking-[-0.04em] lowercase text-cream sm:text-[40px]">
                    {/* Title intentionally re-uses the foil for "a tuesday" so the
                        list feels of-a-piece with the post page. */}
                    <FoilText
                      variant="copper-tight"
                      className="font-serif italic font-normal text-[32px] leading-[0.95] tracking-[-0.04em] sm:text-[40px]"
                    >
                      {note.title.replace(/\.$/, '')}
                    </FoilText>
                    .
                  </h2>
                  <p className="font-serif italic text-sm leading-[1.5] text-soft-gold">
                    {note.deck}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="mt-7 px-6 pt-7 pb-7 sm:px-8">
        <div className="mx-auto flex max-w-content items-end justify-between border-t border-soft-gold/15 pt-7">
          <div className="font-serif text-[11px] italic leading-[1.5] text-bright-copper">
            <em>real Tuesday</em>
            <br />
            est · sioux falls
          </div>
          <div className="text-right font-mono text-[8px] uppercase tracking-mono-label text-soft-gold">
            © 2026
            <br />
            Sioux Falls, SD
          </div>
        </div>
      </footer>
    </main>
  );
}
