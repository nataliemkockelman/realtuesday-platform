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
  coverTitleLines: string[];
  coverAccent: string;
  price: string;
  channel: 'Gumroad' | 'Etsy';
  buyUrl: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: 'ai-calendar-cheat',
    name: 'AI Calendar Cheat',
    coverTitleLines: ['The AI'],
    coverAccent: 'Calendar Cheat',
    price: '$12',
    channel: 'Gumroad',
    buyUrl: 'https://gumroad.com/themotherload/ai-calendar-cheat',
  },
  {
    slug: 'sports-mom-survival',
    name: 'Sports Mom Survival Kit',
    coverTitleLines: ['Sports', 'Mom'],
    coverAccent: 'Survival',
    price: '$18',
    channel: 'Etsy',
    buyUrl: 'https://etsy.com/shop/themotherload/sports-mom-survival',
  },
  {
    slug: 'road-trip-cheat',
    name: 'Road Trip Cheat Sheet',
    coverTitleLines: ['The Road', 'Trip'],
    coverAccent: 'Cheat',
    price: '$8',
    channel: 'Gumroad',
    buyUrl: 'https://gumroad.com/themotherload/road-trip-cheat',
  },
  {
    slug: 'custody-calendar',
    name: 'Custody Calendar Template',
    coverTitleLines: ['Custody'],
    coverAccent: 'Calendar',
    price: '$15',
    channel: 'Gumroad',
    buyUrl: 'https://gumroad.com/themotherload/custody-calendar',
  },
];
