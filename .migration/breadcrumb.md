# breadcrumb

2026-07-12 — golden pair via shadcn CLI (`shadcn add breadcrumb --overwrite`, base-nova). Migrated.

## Changed

- `src/components/ui/breadcrumb.tsx`: `BreadcrumbLink` migrated from Radix
  `Slot`/`asChild` to Base UI `useRender` + `mergeProps`
  (`@base-ui/react/use-render`, `@base-ui/react/merge-props`), exposing a
  `render` prop (`useRender.ComponentProps<"a">`). Other parts are plain
  elements. Leftover scan clean.
- Consumers — `asChild`→`render`:
  - `src/components/breadcrumbs.tsx`: `BreadcrumbLink render={<Link/>}` and a
    `DropdownMenuItem render={<Link/>}` in the dropdown breadcrumb variant.

## RSC build fix (follow-up, 2026-07-12)

`breadcrumb.tsx` had no `"use client"` but is rendered by a server component
(`breadcrumbs.tsx`). Two RSC problems: (1) it imports `CaretRightIcon`/
`DotsThreeIcon` from `@phosphor-icons/react`, whose icon module calls
`React.createContext` (IconContext) at load; (2) `BreadcrumbLink` calls the
`useRender` hook. Both are illegal in the react-server runtime and broke
`next build` "collect page data" for `/tickets/[ticketId]/edit`. Added
`"use client"`. Verified: full `next build` passes.

## Left alone

Nothing breadcrumb-specific left behind.

## Behavior changes

None. `useRender` + `mergeProps` reproduces the Slot polymorphism for the
link.

## Verify by hand

- Organization breadcrumb: the "Organizations" crumb links back; the current
  org renders as the page (non-link) crumb.
- Any dropdown-style breadcrumb: opens and its items navigate.
