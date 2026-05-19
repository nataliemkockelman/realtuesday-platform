import Link from 'next/link';

/**
 * Site footer — brand line + link row + © line. Sits inside the navy column
 * with a soft blush hairline above. The Contact link is a placeholder mailto
 * (`hello@themomload.com`) until Natalie wires a real inbox.
 *
 * Mirrored in /public/context-builder.html so the static page matches the
 * Next-rendered pages; update both if links here change.
 */
const LINKS = [
  { href: '/products', label: 'Products', external: false },
  { href: '/about', label: 'About', external: false },
  { href: '/free/setup-guide', label: 'Free Guide', external: false },
  { href: 'mailto:hello@themomload.com', label: 'Contact', external: true },
  { href: '/privacy', label: 'Privacy', external: false },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-blush/15 px-6 pb-10 pt-8 sm:px-8 sm:pb-12 sm:pt-10">
      <div className="mx-auto max-w-content space-y-5">
        <p className="font-serif text-[12px] italic leading-snug text-coral-light">
          <em>the Motherload</em>
          {' · '}
          a Real Tuesday brand
        </p>

        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {LINKS.map((link) => (
            <li key={link.href}>
              {link.external ? (
                <a
                  href={link.href}
                  className="font-mono text-[10px] font-semibold uppercase tracking-mono-label text-cream transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="font-mono text-[10px] font-semibold uppercase tracking-mono-label text-cream transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-blush/70">
          © {new Date().getFullYear()} · Sioux Falls, SD
        </p>
      </div>
    </footer>
  );
}
