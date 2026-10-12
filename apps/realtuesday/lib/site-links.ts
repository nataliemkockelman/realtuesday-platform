/**
 * Site links — the single source of truth for nav + footer destinations.
 *
 * SiteNav and SiteFooter both import from here so a link's href and label are
 * defined exactly once. The two surfaces show different subsets in different
 * orders, composed below from the same canonical LINKS map.
 *
 * `as const` is load-bearing: it preserves each href as a string literal so
 * Next.js typedRoutes can verify every destination at build time.
 *
 * `external: true` marks the one non-typedRoutes destination (themomload.com,
 * the studio's other brand — cross-promo, matching link back lives in
 * apps/themotherload). SiteNav/SiteFooter render it as a plain
 * <a target="_blank"> instead of next/link.
 */

const LINKS = {
  home: { href: '/', label: 'real Tuesday', external: false },
  pricing: { href: '/pricing', label: 'pricing', external: false },
  notes: { href: '/notes', label: 'notes', external: false },
  about: { href: '/about', label: 'about', external: false },
  contact: { href: '/contact', label: 'contact', external: false },
  privacy: { href: '/privacy', label: 'privacy', external: false },
  clientLogin: { href: '/portal/login', label: 'client login', external: false },
  motherload: { href: 'https://themomload.com', label: 'the motherload', external: true },
} as const;

/** Top nav (right side). */
export const PRIMARY_NAV = [
  LINKS.pricing,
  LINKS.notes,
  LINKS.about,
  LINKS.contact,
  LINKS.motherload,
] as const;

/** Footer nav — a superset of the primary nav plus utility links. */
export const FOOTER_NAV = [
  LINKS.pricing,
  LINKS.about,
  LINKS.notes,
  LINKS.contact,
  LINKS.privacy,
  LINKS.clientLogin,
  LINKS.motherload,
] as const;
