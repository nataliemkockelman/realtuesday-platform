/**
 * Hard-coded product list for MVP. When the dashboard's `products` table in
 * Supabase exists, swap this for a server-side fetch (`status = 'live'`,
 * order by created_at desc) — the type stays the same so consumers don't
 * have to change.
 *
 * `coverTitleLines` is what shows on the faux PDF cover, broken into lines
 * that read well on a 4:3 cover. The last word — `coverAccent` — gets the
 * solid coral treatment via FoilText (cover sizes are <60px, so no foil
 * gradient per brand kit).
 *
 * `channel` and `buyUrl` track where the product is actually sold; the
 * channel label appears as a mono caps tag ("→ Gumroad").
 */

export interface Product {
  slug: string;
  name: string;
  /** One-line differentiator under the name on /products. */
  subtitle?: string;
  coverTitleLines: string[];
  coverAccent: string;
  /** Optional Caveat tagline on the faux PDF cover. Kept short — 2–4 words. */
  coverTagline?: string;
  /** Two-digit issue number shown bottom-right of the cover ("01", "02"…). */
  coverNumber: string;
  price: string;
  channel: 'Gumroad' | 'Etsy';
  buyUrl: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: 'handled',
    name: 'The Whole Damn Thing, Handled',
    // Subtitle clarifies that this is the full bundle, not the cheat alone.
    // Price reads "Coming Soon" until the bundle ships — the landing page
    // exists so the brand voice and structure are visible, but the asset
    // isn't packaged for sale yet.
    subtitle: 'the whole system — setup, prompts, color framework, cheat sheet',
    coverTitleLines: ['The whole', 'damn thing,'],
    coverAccent: 'handled.',
    coverTagline: 'the whole system',
    coverNumber: '01',
    price: 'Coming Soon',
    channel: 'Gumroad',
    buyUrl: '/products/handled',
  },
  {
    slug: 'ai-calendar-cheat',
    name: 'The AI Calendar Cheat',
    subtitle: 'just the one-page printable. the system on a fridge magnet.',
    coverTitleLines: ['The AI'],
    coverAccent: 'Calendar Cheat',
    coverTagline: 'off your plate',
    coverNumber: '02',
    price: '$12',
    channel: 'Gumroad',
    buyUrl: '/products/ai-calendar-cheat',
  },
  {
    // Dinner, Handled — the weeknight meal system. Component of the
    // forthcoming Sunday Reset bundle; sold standalone until that ships.
    // Twenty minutes on Sunday night → the whole week's dinners decided.
    slug: 'dinner-handled',
    name: 'Dinner, Handled',
    subtitle: 'the weeknight meal system. 20 minutes Sunday, the whole week solved.',
    coverTitleLines: ['dinner,'],
    coverAccent: 'handled.',
    coverTagline: 'twenty minutes sunday',
    coverNumber: '03',
    price: '$12',
    channel: 'Gumroad',
    buyUrl: '/products/dinner-handled',
  },
  {
    // Monthly Money Map — household budget workbook. Etsy because the file
    // is xlsx-driven and that's where Natalie's planner/spreadsheet
    // customers already shop.
    slug: 'monthly-money-map',
    name: 'The Monthly Money Map',
    subtitle: 'one-page household budget. fill it Sunday, ignore it the rest of the month.',
    coverTitleLines: ['The Monthly'],
    coverAccent: 'Money Map.',
    coverTagline: 'where did it go',
    coverNumber: '04',
    price: '$15',
    channel: 'Etsy',
    buyUrl: '/products/monthly-money-map',
  },
  {
    slug: 'sports-mom-survival',
    name: 'Sports Mom Survival Kit',
    coverTitleLines: ['Sports', 'Mom'],
    coverAccent: 'Survival',
    coverTagline: 'the whole season',
    coverNumber: '05',
    price: '$18',
    channel: 'Etsy',
    buyUrl: 'https://etsy.com/shop/themotherload/sports-mom-survival',
  },
  {
    slug: 'road-trip-cheat',
    name: 'Road Trip Cheat Sheet',
    coverTitleLines: ['The Road', 'Trip'],
    coverAccent: 'Cheat',
    coverTagline: 'are we there yet',
    coverNumber: '06',
    price: '$8',
    channel: 'Gumroad',
    buyUrl: 'https://gumroad.com/themotherload/road-trip-cheat',
  },
];
