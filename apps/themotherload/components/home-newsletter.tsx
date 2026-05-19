import { EmailCapture } from './email-capture';

/**
 * Home — newsletter signup, last content section before the footer.
 *
 * The Sunday Reset capture used to sit here. Removed because the Sunday
 * Reset is a forthcoming paid bundle, not a freebie — see lib/lead-magnets.ts.
 * This block is the plain newsletter ask: one email a week, no lead magnet
 * attached. EmailCapture posts to /api/subscribe with the existing
 * 'home-email-capture' source.
 *
 * Pairs with the caveat tagline ("for moms running the whole damn show")
 * which lives at the bottom of every Motherload page.
 */
export function HomeNewsletter() {
  return (
    <section className="px-6 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-content">
        <EmailCapture
          source="home-email-capture"
          eyebrow="the weekly note"
          title={'Get one email\na week.'}
          description="What I'm building, what I just shipped, one short thing I figured out this week. One email a week, max. Unsubscribe anytime."
          submitLabel="Send it over"
        />

        <p
          className="mt-14 text-center font-script text-[26px] leading-none text-coral-light"
          style={{ transform: 'rotate(-1.5deg)', transformOrigin: 'center' }}
        >
          for moms running the whole damn show
        </p>
      </div>
    </section>
  );
}
