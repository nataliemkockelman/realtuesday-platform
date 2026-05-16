import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { FreeStart } from '@/components/free-start';
import { FeaturedDrop } from '@/components/featured-drop';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FreeStart />
        <FeaturedDrop />
      </main>
      <Footer />
    </>
  );
}
