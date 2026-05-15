import { Nav } from '@/components/nav';

/**
 * /free/[slug] — lead magnet landing pages. Placeholder for now; real form
 * + Resend delivery + Supabase row write lands in a later step. Stubbed so
 * the home hero CTA can typed-link to it.
 */
export default function FreeLandingPage({ params }: { params: { slug: string } }) {
  const title = params.slug
    .split('-')
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <main>
      <Nav />
      <section className="px-6 py-20 sm:px-8">
        <p className="eyebrow-mono mb-2">— free for you —</p>
        <h1 className="font-ml-display text-hero-lg italic leading-none text-cream">{title}</h1>
        <p className="mt-6 max-w-prose font-serif italic text-blush">
          Email capture lives here. Drop your address and the PDF lands in your inbox.
          Form wiring comes in the next build step.
        </p>
      </section>
    </main>
  );
}
