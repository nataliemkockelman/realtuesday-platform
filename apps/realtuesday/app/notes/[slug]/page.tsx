import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getNote, getAllNoteSlugs } from '@/lib/notes';
import { FoilText } from '@/components/foil-text';

/**
 * /notes/[slug] — single post.
 *
 * Layout mirrors the mockup's newsletter-post phone view:
 *   issue pill · 5 min read · — notes from — · "a tuesday." (foil) · rule
 *   · italic deck · markdown body with copper-bordered pullquotes · byline
 *
 * The post title gets the same foil treatment as the home hero so the
 * brand reads consistently across pages.
 *
 * Pre-renders all known slugs at build time. New posts get picked up by
 * adding a .md file to content/notes/ and rebuilding.
 */
export async function generateStaticParams() {
  const slugs = await getAllNoteSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const note = await getNote(params.slug);
  if (!note) return { title: 'note not found' };
  return {
    title: `${note.issueLabel} — ${note.title}`,
    description: note.deck,
    openGraph: {
      title: `notes from ${note.title}`,
      description: note.deck,
      type: 'article',
      publishedTime: note.publishedAt,
    },
  };
}

export default async function NotePage({ params }: { params: { slug: string } }) {
  const note = await getNote(params.slug);
  if (!note) notFound();

  // Strip trailing period from the title since we render it separately
  // for the foil treatment to keep the punctuation outside the gradient.
  const titleWord = note.title.replace(/\.$/, '');

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
            href="/notes"
            className="font-mono text-[10px] font-semibold uppercase tracking-mono-button text-bright-copper no-underline"
          >
            ← all notes
          </Link>
        </div>
      </nav>

      <article className="px-6 pt-8 pb-7 sm:px-8 sm:pt-12">
        <div className="mx-auto max-w-[680px]">
          <header className="mb-7">
            <div className="mb-7 flex items-center justify-between">
              <span className="rounded-full border border-copper px-3 py-1 font-mono text-[10px] uppercase tracking-mono-label text-soft-gold">
                {note.issueLabel}
              </span>
              <span className="font-serif italic text-xs text-bright-copper">
                {note.readingTime}
              </span>
            </div>

            <p className="mb-2.5 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
              — notes from —
            </p>

            <h1 className="font-display text-[56px] font-extrabold leading-[0.95] tracking-[-0.05em] lowercase text-cream sm:text-[96px]">
              <FoilText
                variant="copper-tight"
                className="font-serif italic font-normal text-[56px] leading-[0.95] tracking-[-0.05em] sm:text-[96px]"
              >
                {titleWord}
              </FoilText>
              .
            </h1>

            <span className="rule-copper my-6" />

            <p className="font-serif italic text-base leading-[1.55] text-soft-gold sm:text-lg">
              {note.deck}
            </p>
          </header>

          {/* Markdown body. The .prose-notes utility (defined in globals.css)
              styles all child elements — h2 in Bricolage cream, p in Inter
              blush, em in Fraunces soft-gold, blockquote with copper rule. */}
          <div
            className="prose-notes"
            dangerouslySetInnerHTML={{ __html: note.bodyHtml }}
          />

          <div className="mt-7 border-t border-soft-gold/15 pt-6 font-serif italic text-xs text-bright-copper">
            — {note.byline}
          </div>
        </div>
      </article>

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
