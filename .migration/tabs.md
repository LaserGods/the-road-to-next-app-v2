# tabs

2026-07-12 — golden pair via shadcn CLI (`shadcn add tabs --overwrite`, base-nova). Migrated.

## Changed

- `src/components/ui/tabs.tsx`: Radix Tabs → Base UI `@base-ui/react/tabs`.
  Trigger→Tab, Content→Panel, `aria-disabled:*` hooks added. Leftover scan
  clean.
- Consumers — `asChild`→`render` on `TabsTrigger`:
  - `src/app/(authenticated)/account/_navigation/tabs.tsx` (profile/password
    tabs `render={<Link/>}`).
  - `src/app/(authenticated)/organization/[organizationId]/(admin)/_navigation/tabs.tsx`
    (memberships/invitations tabs `render={<Link/>}`).

## Left alone

Nothing tabs-specific left behind.

## Behavior changes

- Base UI Tabs defaults to MANUAL activation (Radix defaulted to automatic).
  These tab lists are link-based navigation (each Tab renders a `next/link`
  and the active tab is derived from the pathname), so activation mode is not
  observable here. If automatic focus-activation is desired, opt in with
  `Tabs.List activateOnFocus` — NOT auto-added.

## Verify by hand

- Account page: Profile/Password tabs navigate and the correct tab shows
  active per URL.
- Org admin page: Memberships/Invitations tabs navigate + reflect the URL.
- Keyboard: arrow keys move between tabs; Enter/click follows the link.
