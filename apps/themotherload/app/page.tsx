import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { FreeStart } from '@/components/free-start';
import { FeaturedDrop } from '@/components/featured-drop';
import { HomeRules } from '@/components/home-rules';
import { HomeAboutSnippet } from '@/components/home-about-snippet';
import { HomeProductsGrid } from '@/components/home-products-grid';
import { HomeNewsletter } from '@/components/home-newsletter';
import { Footer } from '@/components/footer';

// Home keeps the layout-level default title ("the Motherload — for moms
// running the whole damn show") but overrides the OG/Twitter description
// so the social preview previews the actual home pitch, not the generic
// site tagline.
export const metadata: Metadata = {
  openGraph: {
    title: 'the Motherload',
    description:
      'For moms running the whole damn show. Start with the free Claude, Meet Your Family setup guide.',
  },
  twitter: {
    title: 'the Motherload',
    description:
      'For moms running the whole damn show. Start with the free Claude, Meet Your Family setup guide.',
  },
};

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        {/* Page flow:
            1. Hero — brand entry.
            2. FreeStart — Claude, Meet Your Family (free starter).
            3. FeaturedDrop — Handled (paid flagship, "the next step").
            4. HomeRules — four-line voice posture before any more asks.
            5. HomeAboutSnippet — COO / Chaos Coordinator intro, link to /about.
            6. HomeProductsGrid — top 3 products + see-all link.
            7. HomeNewsletter — plain weekly note signup.
            8. Footer.
            Hero → FreeStart → FeaturedDrop is the conversion column;
            Rules → About → Grid → Newsletter is the "stick around" column. */}
        <Hero />
        <FreeStart />
        <FeaturedDrop />
        <HomeRules />
        <HomeAboutSnippet />
        <HomeProductsGrid />
        <HomeNewsletter />
      </main>
      <Footer />
    </>
  );
}
