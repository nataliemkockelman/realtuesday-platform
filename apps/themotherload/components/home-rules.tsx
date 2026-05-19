/**
 * Home — "the rules" snippet. Same four lines that live on /about, surfaced
 * on the home so a first-time visitor gets the brand-voice posture before
 * being asked to buy anything. Kept identical (string-for-string) to the
 * About page list so they read as one consistent set; if a rule changes,
 * change it in both places.
 */
const RULES = [
  'If I haven\u2019t used it for a month, it\u2019s not in the shop.',
  'Every download is a single PDF. No accounts, no apps, no logins.',
  'No "mama," no "mommy," no pink wine, no bubble baths.',
  'If you bought something and it didn\u2019t help, email me. Let\u2019s figure it out.',
];

export function HomeRules() {
  return (
    <section className="px-6 pb-10 pt-7 sm:px-8 sm:pt-10">
      <div className="mx-auto max-w-content">
        <p className="eyebrow-mono mb-3">&mdash; the rules &mdash;</p>
        <ul className="space-y-3">
          {RULES.map((rule, i) => (
            <li
              key={i}
              className="flex gap-3 font-serif text-[17px] italic leading-snug text-cream"
            >
              <span aria-hidden="true" className="mt-2.5 block h-px w-4 flex-none bg-coral" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
