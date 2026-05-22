import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { FoilText } from '@/components/foil-text';
import { getAllPosts, formatPostDate } from '@/lib/posts';

/**
 * /blog — index of every post, newest first. Header matches the rest of the
 * site (Caveat eyebrow → DM Serif italic title with one foil accent → coral
 * rule → Fraunces body), then a vertical list of post cards.
 */

export const metadata: Metadata = {
  title: 'The Blog',
  description:
    'Honest writing from the Motherload — calendar systems, mental load, co-parenting, AI for actual mom life.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main>
        {/* ─── HEADER ─────────────────────────────────────── */}
        <section className="px-6 pb-6 pt-7 sm:px-8 sm:pt-10">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-1.5">&mdash; the blog &mdash;</p>
            <h1 className="pb-2 font-ml-display text-[clamp(48px,12vw,96px)] italic leading-none text-cream">
              <span className="block">honest mom</span>
              <FoilText italic className="block font-ml-display font-normal leading-none">
                writing.
              </FoilText>
            </h1>
            <p className="mt-3 max-w-prose font-serif text-[15px] italic leading-normal text-blush">
              The unglamorous, working version. Calendars, mental load,
              co-parenting, and what AI is actually good for.
            </p>
          </div>
        </section>

        {/* ─── POST LIST ──────────────────────────────────── */}
        <section className="px-6 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12">
          <div className="mx-auto max-w-content">
            <ul className="space-y-10 sm:space-y-12">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}` as `/blog/${string}`}
                    className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-mono-label text-coral-light">
                      {formatPostDate(post.date)}
                    </p>
                    <h2 className="mt-2 font-ml-display text-[28px] italic leading-tight text-cream transition-colors group-hover:text-coral-light sm:text-[34px]">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-prose font-serif text-[16px] italic leading-relaxed text-blush sm:text-[17px]">
                      {post.excerpt}
                    </p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-mono-label text-coral-light opacity-80 transition-opacity group-hover:opacity-100">
                      Read &rarr;
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
