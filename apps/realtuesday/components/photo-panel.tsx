import Image from 'next/image';

/**
 * PhotoPanel — a real photo (next/image, fill) inside a fixed-ratio rounded
 * frame, with a designed copper-wash placeholder when no `src` is supplied.
 *
 * Extracted verbatim from app/page.tsx so home, about, and the person-bio
 * component all size and style image slots the same way. When photography is
 * supplied, pass `src` + `alt`; until then the placeholder keeps the layout
 * from shifting and still reads as an intentional element.
 */
export function PhotoPanel({
  className = '',
  label,
  src,
  alt,
  sizes = '(min-width: 1024px) 40vw, 100vw',
  priority = false,
}: {
  className?: string;
  label: string;
  src?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
}) {
  // Real photo: fill the rounded frame, warm ring, subtle navy floor so the
  // image sits on the cream body as a designed element rather than a raw cut-out.
  if (src) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-navy ring-1 ring-navy/10 ${className}`}
      >
        <Image src={src} alt={alt ?? label} fill sizes={sizes} className="object-cover" priority={priority} />
      </div>
    );
  }

  // Placeholder: copper wash so an empty slot still reads as a designed element.
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-navy ${className}`}
      role="img"
      aria-label={`Photo placeholder: ${label}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-copper/25 via-transparent to-navy" />
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <span className="h-[6px] w-[6px] rounded-full bg-bright-copper" aria-hidden />
        <span className="font-mono text-[9px] uppercase tracking-mono-label text-mist">{label}</span>
      </div>
    </div>
  );
}
