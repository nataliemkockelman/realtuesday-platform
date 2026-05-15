// Twitter image — same layout as the Open Graph image, just re-exported
// so Next.js generates a /twitter-image.png route alongside /opengraph-image.png.
// Twitter's "summary_large_image" card shape is close enough to OG that one
// asset works for both.
export { default, alt, size, contentType } from './opengraph-image';
