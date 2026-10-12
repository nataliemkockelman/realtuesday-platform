import type { TeamMember } from '@/lib/team';
import { PhotoPanel } from '@/components/photo-panel';

/**
 * PersonBio — renders one TeamMember: portrait, name, role, bio paragraphs,
 * an italic copper closing line, and LinkedIn + email links. Driven entirely
 * by data so the /about page can map over TEAM instead of hardcoding blocks.
 *
 * Layout is a vertical stack (portrait above text), rendered once on the
 * about page for the single operator. Portrait placement is technique, not
 * spec — the copy doc's "left of text" note yields to the stacked layout.
 *
 * Placeholder handling: bios/links that are still placeholders (unknown
 * LinkedIn URLs) render with a visible copper flag so nothing unfinished
 * ships by accident.
 */
export function PersonBio({ person }: { person: TeamMember }) {
  return (
    <div>
      <PhotoPanel
        className="aspect-[4/5]"
        label={person.role}
        src={person.imageSrc}
        alt={person.imageAlt}
        sizes="(min-width: 1024px) 40vw, 100vw"
      />

      <h3 className="mt-6 font-display text-[28px] font-extrabold leading-[1] tracking-[-0.03em] lowercase text-navy sm:text-[36px]">
        {person.role}
      </h3>

      <div className="mt-5 space-y-4 font-body text-base leading-[1.65] text-navy/70">
        {person.bioIsPlaceholder ? null : (
          person.bio.map((para) => <p key={para.slice(0, 24)}>{para}</p>)
        )}
      </div>

      <p className="mt-5 font-serif text-lg italic leading-[1.4] text-copper">
        {person.closingLine}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-mono-button">
        {person.linkedinUrl ? (
          <a href={person.linkedinUrl} className="text-copper no-underline hover:text-bright-copper">
            LinkedIn
          </a>
        ) : person.linkedinPlaceholder ? (
          <span className="text-mist" title="LinkedIn URL not set">
            LinkedIn (link TBD)
          </span>
        ) : null}
        {person.email ? (
          <a
            href={`mailto:${person.email}`}
            className="text-copper no-underline hover:text-bright-copper"
          >
            email
          </a>
        ) : null}
      </div>
    </div>
  );
}
