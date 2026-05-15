import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'About',
  description: 'Who I am and why the Motherload exists.',
};

/**
 * /about — placeholder so typed-routes resolves the nav link. Real page
 * lands in a later step once Natalie's voice/copy is locked.
 */
export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-content">
            <p className="eyebrow-mono mb-2">&mdash; about &mdash;</p>
            <h1 className="font-ml-display text-[clamp(48px,12vw,96px)] italic leading-none text-cream">
              coming
              <br />
              soon.
            </h1>
            <p className="mt-6 max-w-prose font-serif text-lg italic leading-normal text-blush">
              Working on the right words. Back in a sec.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
