import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

/**
 * Blog posts live as Markdown files in `app/blog/posts/`. Frontmatter is the
 * source of truth for title, slug, date, excerpt, and tags — the file's name
 * also has to match the slug so the route stays predictable.
 *
 * This loader runs server-side only (node:fs). The /blog index uses
 * `getAllPosts()` for listing; the /blog/[slug] route uses `getPostBySlug()`
 * to render a single post.
 */

const POSTS_DIR = path.join(process.cwd(), 'app', 'blog', 'posts');

export interface PostFrontmatter {
  title: string;
  slug: string;
  /** ISO date string (YYYY-MM-DD). Used for sort + display. */
  date: string;
  excerpt: string;
  tags: string[];
}

export interface PostSummary extends PostFrontmatter {}

export interface Post extends PostFrontmatter {
  /** Rendered HTML from the Markdown body. */
  contentHtml: string;
}

/**
 * YAML parses unquoted `date: 2026-04-16` as a Date object, not a string.
 * Normalize whatever gray-matter handed us back to an ISO YYYY-MM-DD string
 * so the rest of the app can treat it uniformly.
 */
function normalizeFrontmatter(data: Record<string, unknown>): PostFrontmatter {
  const raw = data.date;
  const date =
    raw instanceof Date
      ? raw.toISOString().slice(0, 10)
      : String(raw);
  return {
    title: String(data.title ?? ''),
    slug: String(data.slug ?? ''),
    date,
    excerpt: String(data.excerpt ?? ''),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
  };
}

/** All published posts, newest first. */
export function getAllPosts(): PostSummary[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const { data } = matter(raw);
    return normalizeFrontmatter(data);
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);
  return {
    ...normalizeFrontmatter(data),
    contentHtml: processed.toString(),
  };
}

export function getAllPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

/** Format a YYYY-MM-DD date as "April 16, 2026" for display. */
export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
