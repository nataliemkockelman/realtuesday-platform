import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { FeaturedDrop } from '@/components/featured-drop';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeaturedDrop />
      </main>
      <Footer />
    </>
  );
}
