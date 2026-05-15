import type { MetadataRoute } from 'next';

/**
 * /robots.txt — allow all crawlers, point them at the sitemap. Standard
 * for a public marketing site with nothing private behind it.
 *
 * The sitemap URL is built from the same base as metadataBase (see
 * app/layout.tsx) so it follows whichever production URL is current.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://themotherload.vercel.app');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
