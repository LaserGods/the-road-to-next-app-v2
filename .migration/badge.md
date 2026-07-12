# badge

2026-07-12 — golden pair via shadcn CLI (`shadcn add badge --overwrite`, base-nova). Migrated.

## Changed

- `src/components/ui/badge.tsx`: `Badge` migrated from Radix `Slot`/`asChild`
  to Base UI `useRender` + `mergeProps`, exposing a `render` prop. Keeps its
  `badgeVariants` cva. Leftover scan clean.
- Consumers — `asChild`→`render`:
  - `src/features/organization/components/active-organization-badge.tsx`:
    nested inside a TooltipTrigger —
    `<TooltipTrigger render={<Badge render={<Link href={organizationsPath()} />} />}>`.

## Left alone

Nothing badge-specific left behind.

## Behavior changes

None.

## Verify by hand

- Active-organization badge renders with the org name + swap icon, is
  wrapped in a tooltip ("Switch organizations"), and clicking it navigates to
  the organizations list. The destructive "No active organization" badge
  (non-link) still renders with its ping animation.
