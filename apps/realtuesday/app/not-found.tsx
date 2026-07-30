import Link from 'next/link';
import { FoilText } from '@/components/foil-text';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';

/**
 * Custom 404. Same dark-hero rhythm as the rest of the site so a wrong URL
 * still feels on-brand instead of dumping the default Next error page.
 */

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-navy">
      <SiteNav />

      <section className="flex-1 px-6 pb-16 pt-8 sm:px-8 lg:pt-12">
        <div className="mx-auto max-w-content">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-mono-eyebrow text-bright-copper">
            error 404
          </p>
          <h1 className="mb-5">
            <span className="block font-display text-[40px] font-extrabold leading-[0.85] tracking-[-0.06em] lowercase text-cream sm:text-[64px] lg:text-[80px]">
              nothing here
            </span>
            <FoilText
              variant="copper"
              className="block font-serif italic font-normal text-[40px] leading-[0.95] tracking-[-0.03em] pb-2 sm:text-[64px] lg:text-[80px]"
            >
              but Tuesday.
            </FoilText>
          </h1>
          <p className="max-w-[52ch] font-serif text-lg italic leading-[1.4] text-mist sm:text-xl">
            This page moved, got renamed, or never existed. Let&apos;s get you back to solid ground.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/"
              className="rounded bg-copper-foil px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-mono-button text-navy no-underline"
            >
              Back home →
            </Link>
            <Link
              href="/contact"
              className="rounded border border-copper/40 px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-mono-button text-cream no-underline transition-opacity hover:opacity-70"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
