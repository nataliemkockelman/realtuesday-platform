import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import {
  formatPostDate,
  getAllPostSlugs,
  getPostBySlug,
} from '@/lib/posts';

/**
 * /blog/[slug] — a single post. The frontmatter title + date sit above a
 * coral rule; the body renders as HTML from remark with prose styles
 * defined here (Tailwind doesn't have @tailwindcss/typography installed and
 * the brand's hand-tuned styles are specific enough that the plugin would
 * just fight us).
 */

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} · the Motherload`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main>
        <article className="px-6 pb-16 pt-7 sm:px-8 sm:pb-24 sm:pt-10">
          <div className="mx-auto max-w-prose">
            <p className="font-mono text-[10px] uppercase tracking-mono-label text-coral-light">
              {formatPostDate(post.date)}
            </p>
            <h1 className="mt-3 font-ml-display text-[clamp(34px,7vw,56px)] italic leading-[1.05] text-cream">
              {post.title}
            </h1>
            <span className="rule-coral mb-8 mt-7" aria-hidden="true" />

            <div className="post-body font-serif text-[18px] leading-relaxed text-blush sm:text-[19px]">
              <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </div>

            {post.tags?.length ? (
              <div className="mt-12 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-mono-label text-coral-light"
                  >
                    #{tag.replace(/\s+/g, '-')}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-16">
              <Link
                href="/blog"
                className="font-mono text-[10px] uppercase tracking-mono-label text-coral-light hover:text-coral"
              >
                &larr; All posts
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
