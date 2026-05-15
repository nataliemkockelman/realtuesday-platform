import { SubscribeForm, type SubscribeSource } from './subscribe-form';

interface EmailCaptureProps {
  /** Caveat eyebrow (defaults to "free for you"). */
  eyebrow?: string;
  /** DM Serif italic title; supports a line break with \n. */
  title: string;
  /** Fraunces italic sub-paragraph. */
  description: string;
  /** Submit button label. */
  submitLabel?: string;
  /** Where on the site this capture lives. */
  source: SubscribeSource;
}

/**
 * Cream-on-navy block that interrupts the dark column. The mockup extends
 * the cream box edge-to-edge against the section's 24px padding via a
 * negative margin trick — we do the same with `-mx-6 sm:-mx-8`.
 */
export function EmailCapture({
  eyebrow = 'free for you',
  title,
  description,
  submitLabel,
  source,
}: EmailCaptureProps) {
  return (
    <div className="-mx-6 mt-8 rounded-xl bg-cream px-6 pb-10 pt-9 text-navy sm:-mx-8 sm:px-8">
      <p
        className="inline-block font-script text-[22px] font-semibold leading-none text-coral"
        style={{ transform: 'rotate(-2deg)' }}
      >
        {eyebrow}
      </p>
      <h2 className="mb-2.5 mt-2 font-ml-display text-[32px] italic leading-[1.05] text-navy">
        {title.split('\n').map((line, i, arr) => (
          <span key={i} className="block">
            {line}
            {i < arr.length - 1 && <br className="sr-only" />}
          </span>
        ))}
      </h2>
      <p className="mb-5 font-serif text-[14px] italic leading-normal text-navy/60">
        {description}
      </p>
      <SubscribeForm source={source} submitLabel={submitLabel} />
    </div>
  );
}
