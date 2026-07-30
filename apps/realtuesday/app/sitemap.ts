import type { MetadataRoute } from 'next';
import { getAllNotes } from '@/lib/notes';

/**
 * XML sitemap at /sitemap.xml. Next generates it from this route.
 *
 * Static pages are listed explicitly; note pages are pulled from the same
 * filesystem loader the rest of the site uses, so new .md files show up here
 * automatically on the next build. Note lastModified comes from each post's
 * publishedAt frontmatter.
 */

const BASE_URL = 'https://arealtuesday.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notes = await getAllNotes();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${BASE_URL}/notes`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const noteRoutes: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${BASE_URL}/notes/${note.slug}`,
    lastModified: new Date(note.publishedAt),
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...noteRoutes];
}
