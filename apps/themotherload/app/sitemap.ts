import type { MetadataRoute } from 'next';
import { LEAD_MAGNETS } from '@/lib/lead-magnets';

/**
 * /sitemap.xml — lists every public page so search engines can crawl them
 * predictably. Lead-magnet pages are pulled from the registry so adding a
 * new magnet automatically adds a sitemap entry.
 *
 * /api/* is excluded because robots.txt disallows it, and dynamic 404
 * routes don't belong in a sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://themotherload.vercel.app');

  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${baseUrl}/products`, lastModified, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/products/handled`, lastModified, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${baseUrl}/products/dinner-handled`, lastModified, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${baseUrl}/products/monthly-money-map`, lastModified, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${baseUrl}/products/ai-calendar-cheat`, lastModified, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/free/setup-guide`, lastModified, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/about`, lastModified, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${baseUrl}/contact`, lastModified, priority: 0.5, changeFrequency: 'yearly' },
    { url: `${baseUrl}/privacy`, lastModified, priority: 0.2, changeFrequency: 'yearly' },
  ];

  const leadMagnetRoutes: MetadataRoute.Sitemap = Object.keys(LEAD_MAGNETS).map((slug) => ({
    url: `${baseUrl}/free/${slug}`,
    lastModified,
    priority: 0.7,
    changeFrequency: 'monthly',
  }));

  return [...staticRoutes, ...leadMagnetRoutes];
}
