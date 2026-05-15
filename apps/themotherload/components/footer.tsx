/**
 * Site footer — Fraunces italic brand line on the left, mono caps copyright
 * on the right, then a small build-version line below for sanity checking
 * which deploy is actually live.
 *
 * The build SHA comes from next.config.mjs (NEXT_PUBLIC_BUILD_SHA), populated
 * from VERCEL_GIT_COMMIT_SHA on Vercel and `git rev-parse` locally.
 */

const REPO_URL = 'https://github.com/nataliemkockelman/realtuesday-platform';

export function Footer() {
  const sha = process.env.NEXT_PUBLIC_BUILD_SHA ?? 'dev';
  const isRealCommit = sha !== 'dev';

  return (
    <footer className="border-t border-blush/15 px-6 pb-7 pt-7 sm:px-8">
      <div className="flex items-end justify-between">
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
      </div>

      <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.25em] text-coral-light/60">
        build{' '}
        {isRealCommit ? (
          <a
            href={`${REPO_URL}/commit/${sha}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-coral-light/30 pb-px text-coral-light hover:border-coral-light hover:text-coral"
          >
            {sha}
          </a>
        ) : (
          <span className="text-coral-light/80">{sha}</span>
        )}
      </p>
    </footer>
  );
}
