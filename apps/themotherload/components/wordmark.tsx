import { FoilText } from './foil-text';

/**
 * The Motherload wordmark — handwritten "the" rotated −3° to −4° + italic
 * DM Serif Display "Motherload".
 *
 * Two render sizes:
 *   • `nav`  — used in the top bar, ≈14–16px. Wordmark stays SOLID coral
 *             (below the 60px foil threshold per brand kit).
 *   • `hero` — full-bleed hero treatment, foil gradient, stacked layout
 *             with "the" on its own line.
 *
 * The wordmark is the brand's signature mark — its shape and rotation
 * shouldn't be parameterized further. Adding more sizes/variants here
 * means revisiting the brand kit, not the component.
 */

interface WordmarkProps {
  size: 'nav' | 'hero';
  className?: string;
}

export function Wordmark({ size, className = '' }: WordmarkProps) {
  if (size === 'nav') {
    return (
      <span className={`inline-flex items-baseline gap-1 ${className}`}>
        <span
          className="font-script text-base font-semibold leading-none"
          style={{ display: 'inline-block', transform: 'rotate(-4deg)' }}
        >
          the
        </span>
        <span className="font-ml-display text-base italic leading-none tracking-tight">
          Motherload
        </span>
      </span>
    );
  }

  // Hero size — handwritten "the" sits above, large foil "Motherload" below.
  return (
    <span className={`block ${className}`}>
      <span
        className="block font-script text-the-script font-semibold leading-none text-cream"
        style={{ transform: 'rotate(-3deg)', transformOrigin: 'left bottom', marginLeft: '-0.1em' }}
      >
        the
      </span>
      <FoilText
        italic
        className="block font-ml-display text-hero-xl font-normal text-cream"
      >
        Motherload
      </FoilText>
    </span>
  );
}
