import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getNote, getAllNoteSlugs } from '@/lib/notes';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';

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
    title: `${note.issueLabel} · ${note.title}`,
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

  return (
    <main className="min-h-screen bg-navy">
      <SiteNav />

      {/* Dark hero: back link, issue meta, foil title, deck. Mirrors the
          about/contact/privacy pattern of one dark editorial moment up top. */}
      <div className="px-6 pt-2 sm:px-8">
        <div className="mx-auto max-w-content">
          <Link
            href="/notes"
            className="font-mono text-[10px] font-semibold uppercase tracking-mono-button text-bright-copper no-underline transition-opacity hover:opacity-70"
          >
            ← all notes
          </Link>
        </div>
      </div>

      <header className="px-6 pt-6 pb-9 sm:px-8 sm:pt-8">
        <div className="mx-auto max-w-[680px]">
          <div className="mb-7 flex items-center justify-between">
            <span className="rounded-full border border-copper px-3 py-1 font-mono text-[10px] uppercase tracking-mono-label text-soft-gold">
              {note.issueLabel}
            </span>
            <span className="font-serif italic text-xs text-bright-copper">
              {note.readingTime}
            </span>
          </div>

          <p className="mb-2.5 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
            notes from
          </p>

          <h1 className="font-display text-[56px] font-extrabold leading-[0.95] tracking-[-0.05em] lowercase text-cream sm:text-[96px]">
            <FoilText
              variant="copper-tight"
              className="font-serif italic font-normal text-[56px] leading-[0.95] tracking-[-0.05em] sm:text-[96px]"
            >
              {note.title}
            </FoilText>
          </h1>

          <span className="rule-copper my-6" />

          <p className="font-serif italic text-base leading-[1.55] text-soft-gold sm:text-lg">
            {note.deck}
          </p>
        </div>
      </header>

      {/* Warm cream reading area. The .prose-notes utility (globals.css)
          styles children for cream: h2 navy, p navy, em navy italic,
          blockquote deep-copper with a copper rule. */}
      <div className="bg-cream text-navy">
        <article className="px-6 py-12 sm:px-8 sm:py-14">
          <div className="mx-auto max-w-[680px]">
            <div
              className="prose-notes"
              dangerouslySetInnerHTML={{ __html: note.bodyHtml }}
            />

            <div className="mt-9 border-t border-navy/10 pt-6 font-serif italic text-xs text-deep-copper">
              {note.byline}
            </div>
          </div>
        </article>
      </div>

      <SiteFooter />
    </main>
  );
}
