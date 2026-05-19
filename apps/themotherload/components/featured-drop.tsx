import { ProductCard } from './product-card';

/**
 * Home — featured drop section. The flagship paid product slot. Hard-coded
 * for MVP; will be pulled from the Supabase `products` table (status='live',
 * featured=true) once that's wired up.
 *
 * Framing: this is NOT "start here." The free Claude, Meet Your Family
 * setup guide is the starter (see <FreeStart />). This section features
 * the paid flagship — currently The Whole Damn Thing, Handled — which is
 * the natural next step once Claude knows the family.
 *
 * Why Handled instead of the AI Calendar Cheat: Handled is the full
 * bundle (setup template + prompt library + color framework + the cheat
 * sheet). The Cheat is a component of it, sold standalone at a lower
 * price. The home should showcase the full bundle.
 */
export function FeaturedDrop() {
  return (
    <section className="px-6 pb-10 pt-7 sm:px-8 sm:pt-10">
      <div className="mx-auto max-w-content">
        <p className="eyebrow-mono mb-2">&mdash; the flagship &mdash;</p>
        <h2
          className="mb-5 inline-block font-script text-[32px] font-semibold leading-none text-cream"
          style={{ transform: 'rotate(-1deg)' }}
        >
          the next step.
        </h2>

        <ProductCard
          brandLabel="real tuesday"
          pillLabel="the Motherload"
          coverTitleLines={['The whole', 'damn thing,']}
          coverAccent="handled."
          coverTagline="the whole system"
          ribbon="the flagship"
          name="The Whole Damn Thing, Handled"
          description="The full Mom Command Center bundle — setup template, prompt library, color-code framework, and the AI Calendar Cheat. Run the family calendar off Claude, forever after."
          price="Coming Soon"
          buyUrl="/products/handled"
          buyLabel="See the bundle"
        />
      </div>
    </section>
  );
}
