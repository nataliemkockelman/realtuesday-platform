/**
 * Site links — the single source of truth for nav + footer destinations.
 *
 * SiteNav and SiteFooter both import from here so a link's href and label are
 * defined exactly once. The two surfaces show different subsets in different
 * orders, composed below from the same canonical LINKS map.
 *
 * `as const` is load-bearing: it preserves each href as a string literal so
 * Next.js typedRoutes can verify every destination at build time.
 */

const LINKS = {
  home: { href: '/', label: 'real Tuesday' },
  pricing: { href: '/pricing', label: 'pricing' },
  notes: { href: '/notes', label: 'notes' },
  about: { href: '/about', label: 'about' },
  contact: { href: '/contact', label: 'contact' },
  privacy: { href: '/privacy', label: 'privacy' },
  clientLogin: { href: '/portal/login', label: 'client login' },
} as const;

/** Top nav (right side). */
export const PRIMARY_NAV = [LINKS.pricing, LINKS.notes, LINKS.about, LINKS.contact] as const;

/** Footer nav — a superset of the primary nav plus utility links. */
export const FOOTER_NAV = [
  LINKS.pricing,
  LINKS.about,
  LINKS.notes,
  LINKS.contact,
  LINKS.privacy,
  LINKS.clientLogin,
] as const;
