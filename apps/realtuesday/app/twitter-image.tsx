/**
 * Twitter card share image. Twitter / X uses the same 1200×630 source as
 * Open Graph for its `summary_large_image` card type, so we re-export the
 * OG handler instead of maintaining two visually-identical assets.
 *
 * If we ever want a distinct Twitter-only card (e.g. tighter crop or
 * different copy because Twitter previews are slightly different),
 * replace this re-export with its own ImageResponse handler.
 */
export { default, alt, size, contentType } from './opengraph-image';
