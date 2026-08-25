import { IMAGE_SLOTS, type SlotId } from '@/lib/image-slots';
import { PhotoPanel } from '@/components/photo-panel';

/**
 * SlotPanel — renders one specced image slot (IMG-01..IMG-08) at its correct
 * ratio, sizes, and alt text, driven by the IMAGE_SLOTS manifest.
 *
 * While `ready` is false, PhotoPanel shows its designed placeholder (no broken
 * images). Once the real asset is dropped at the slot's `file` path and `ready`
 * is flipped to true, the same component renders it via next/image (fill).
 *
 * `className` is appended for per-placement tweaks (e.g. `order-last`).
 */
export function SlotPanel({
  slot,
  className = '',
  priority = false,
}: {
  slot: SlotId;
  className?: string;
  priority?: boolean;
}) {
  const s = IMAGE_SLOTS[slot];
  return (
    <PhotoPanel
      className={`${s.ratioClass} ${className}`.trim()}
      label={`${s.id} · ${s.shortLabel}`}
      src={s.ready ? s.file : undefined}
      alt={s.alt}
      sizes={s.sizes}
      priority={priority}
    />
  );
}
