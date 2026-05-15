import { ProductCard } from './product-card';
import { EmailCapture } from './email-capture';

/**
 * Home — featured drop section. Wraps the lead product card and the
 * Sunday Reset email capture under one section header. The product is
 * hard-coded for MVP; will be pulled from the Supabase `products` table
 * (status='live', featured=true) once that's wired up.
 */
export function FeaturedDrop() {
  return (
    <section className="px-6 pb-10 pt-7 sm:px-8 sm:pt-10">
      <div className="mx-auto max-w-content">
        <p className="eyebrow-mono mb-2">&mdash; featured drop &mdash;</p>
        <h2
          className="mb-5 inline-block font-script text-[32px] font-semibold leading-none text-cream"
          style={{ transform: 'rotate(-1deg)' }}
        >
          start with this one.
        </h2>

        <ProductCard
          brandLabel="real tuesday"
          pillLabel="the motherload"
          coverTitleLines={['The AI', 'Calendar']}
          coverAccent="Cheat"
          coverTagline="stop screenshotting"
          name="The AI Calendar Cheat"
          description="A step-by-step workbook for setting up one calendar that runs your whole family — using AI to do the heavy lifting."
          price="$12"
          buyUrl="https://gumroad.com/themotherload"
          buyLabel="Get on Gumroad"
        />

        <EmailCapture
          source="home-email-capture"
          title={'Get the\nSunday Reset.'}
          description="A one-pager I made for myself. Plan the week in 15 minutes. Free when you sign up."
          submitLabel="Send it over"
        />
      </div>
    </section>
  );
}
