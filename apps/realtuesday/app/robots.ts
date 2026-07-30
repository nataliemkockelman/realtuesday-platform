import type { MetadataRoute } from 'next';

/**
 * robots.txt at /robots.txt. Allows all crawlers on the public site and
 * points them at the sitemap. The private /admin area is disallowed so it
 * never surfaces in search (it is also gated and marked noindex).
 */

const BASE_URL = 'https://arealtuesday.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/portal'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
