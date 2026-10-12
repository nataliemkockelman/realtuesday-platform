/**
 * Accent-color styling for brainstorm authorship. Each teammate has a color on
 * their admin_users row (operations = blue, sales & growth = orange), and
 * their notes on the shared wall are tinted to match so you can see at a
 * glance who wrote what.
 */
export type AuthorColorStyle = {
  card: string; // note background + border
  dot: string; // small authorship dot
  chip: string; // name chip
};

export const AUTHOR_COLORS: Record<string, AuthorColorStyle> = {
  blue: {
    card: 'border-blue-300 bg-blue-50',
    dot: 'bg-blue-500',
    chip: 'text-blue-700',
  },
  orange: {
    card: 'border-orange-300 bg-orange-50',
    dot: 'bg-orange-500',
    chip: 'text-orange-700',
  },
  copper: {
    card: 'border-copper/40 bg-copper/10',
    dot: 'bg-copper',
    chip: 'text-deep-copper',
  },
  green: {
    card: 'border-emerald-300 bg-emerald-50',
    dot: 'bg-emerald-500',
    chip: 'text-emerald-700',
  },
  purple: {
    card: 'border-purple-300 bg-purple-50',
    dot: 'bg-purple-500',
    chip: 'text-purple-700',
  },
};

export function authorColor(color: string): AuthorColorStyle {
  return AUTHOR_COLORS[color] ?? AUTHOR_COLORS.blue;
}
