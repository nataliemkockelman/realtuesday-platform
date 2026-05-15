/**
 * Step 1 verification page. Pure smoke test for fonts + tokens.
 * The real hero, portfolio, and newsletter block ship in Step 2.
 */
export default function HomePage() {
  return (
    <main className="mx-auto max-w-prose px-6 py-16">
      <p className="eyebrow-mono mb-6">— est · sioux falls —</p>

      <h1 className="font-display text-[88px] font-extrabold leading-[0.85] tracking-[-0.06em] lowercase text-cream">
        real
      </h1>
      <p className="font-serif italic text-[88px] leading-[1] tracking-[-0.03em] text-soft-gold">
        Tuesday
      </p>

      <span className="rule-copper my-6" />

      <p className="font-serif italic text-lg leading-snug text-soft-gold mb-8">
        A studio making things worth your Tuesday. Honest brands for people doing real work.
      </p>

      <div className="space-y-4 border-t border-soft-gold/15 pt-6 text-sm">
        <p className="font-mono uppercase tracking-mono-label text-bright-copper">
          step 1 · scaffold check
        </p>
        <ul className="font-body text-blush space-y-1">
          <li>· bricolage 800 lowercase, navy bg, cream fg → loaded</li>
          <li>· fraunces 400 italic, soft-gold → loaded</li>
          <li>· jetbrains mono 600 uppercase, bright-copper → loaded</li>
          <li>· inter 400 body, blush → loaded</li>
        </ul>
        <p className="font-script text-2xl text-cream pt-2">caveat is here too.</p>
      </div>
    </main>
  );
}
