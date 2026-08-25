import type { PricingTier as Tier } from '@/lib/pricing';

/**
 * PricingTier — one tier block: name + price on the left, description (with
 * optional subline and bullet list) on the right. Editorial hairline row,
 * matching the home page's offerings/steps rhythm. Every tier on /pricing
 * renders through this one component.
 */
export function PricingTier({ tier }: { tier: Tier }) {
  return (
    <div className="grid gap-4 border-t border-navy/10 py-7 sm:grid-cols-[0.9fr_1.1fr] sm:gap-10 lg:gap-16">
      <div>
        <h3 className="font-display text-[24px] font-extrabold leading-[1.05] tracking-[-0.03em] lowercase text-navy sm:text-[30px]">
          {tier.name}
        </h3>
        <p className="mt-2 font-serif text-xl italic text-copper sm:text-2xl">{tier.price}</p>
        {tier.subline ? (
          <p className="mt-3 max-w-[36ch] font-mono text-[10px] uppercase leading-[1.6] tracking-mono-label text-navy/50">
            {tier.subline}
          </p>
        ) : null}
      </div>

      <div className="max-w-[52ch]">
        {tier.description ? (
          <p className="font-body text-base leading-[1.65] text-navy/70">{tier.description}</p>
        ) : null}
        {tier.bullets ? (
          <ul className="space-y-3">
            {tier.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 font-body text-[15px] leading-[1.5] text-navy/70"
              >
                <span
                  className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-copper"
                  aria-hidden
                />
                {b}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
