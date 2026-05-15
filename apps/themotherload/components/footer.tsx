/**
 * Site footer — Fraunces italic brand line on the left, mono caps copyright
 * on the right. Sits inside the navy column with a soft blush hairline above.
 */
export function Footer() {
  return (
    <footer className="flex items-end justify-between border-t border-blush/15 px-6 pb-7 pt-7 sm:px-8">
      <p className="font-serif text-[11px] italic leading-snug text-coral-light">
        <em>the Motherload</em>
        <br />
        a Real Tuesday brand
      </p>
      <p className="text-right font-mono text-[8px] uppercase leading-snug tracking-[0.25em] text-blush">
        © {new Date().getFullYear()}
        <br />
        Sioux Falls, SD
      </p>
    </footer>
  );
}
