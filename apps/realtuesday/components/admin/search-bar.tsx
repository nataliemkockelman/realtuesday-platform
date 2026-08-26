/**
 * Dashboard search box. A plain GET form that navigates to /admin/search?q=…,
 * so it works with or without JavaScript and needs no client bundle. The string
 * `action` also keeps it clear of Next's typed-routes checking.
 *
 * Rendered persistently in the admin rail (AdminNav) and again, pre-filled, at
 * the top of the results page.
 */
export function SearchBar({
  defaultValue = '',
  placeholder = 'Search the studio…',
}: {
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <form action="/admin/search" method="get" role="search" className="relative">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-cream/40"
      >
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M14 14l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-label="Search the dashboard"
        autoComplete="off"
        className="w-full rounded-md border border-cream/15 bg-navy-card/60 py-1.5 pl-8 pr-3 font-body text-sm text-cream placeholder:text-cream/35 focus:border-copper focus:outline-none"
      />
    </form>
  );
}
