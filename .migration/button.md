# button

2026-07-12 — golden pair via shadcn CLI (`shadcn add button --overwrite`, base-nova). Migrated cleanly.

## Changed

- `src/components/ui/button.tsx`: now imports the real
  `@base-ui/react/button` primitive (`ButtonPrimitive`), which accepts
  `render` natively — no hand-rolled Slot/useRender wrapper. Keeps the
  base-nova `buttonVariants` cva (richer variant/size set than the old
  wrapper: adds xs/lg/icon-xs/icon-sm/icon-lg). Leftover scan clean
  (`grep -n "radix-ui\|@radix-ui"` → none).
- Consumers: `asChild` → `render` at every `<Button asChild><Link/></Button>`
  call site:
  - `src/app/(authenticated)/organization/page.tsx`
  - `src/app/(authenticated)/tickets/[ticketId]/not-found.tsx`
  - `src/app/onboarding/select-active-organization/page.tsx`
  - `src/components/date-picker.tsx` (Button inside PopoverTrigger render)
  - `src/features/ticket/components/ticket-item.tsx` (2 sites)
  - `src/features/organization/components/organization-list.tsx` (Button
    inside TooltipTrigger render)
  Pattern: `<Button asChild><Link href=..>X</Link></Button>` →
  `<Button render={<Link href=.. />}>X</Button>` (child's children hoisted
  to the Button).

## RSC build fix (follow-up, 2026-07-12)

The base-nova registry ships `button.tsx` WITHOUT `"use client"`, but this app
imports `Button` in server components (`organization/page.tsx`,
`tickets/[ticketId]/not-found.tsx`, `onboarding/.../page.tsx`,
`ticket-item.tsx`, `organization-list.tsx`). `@base-ui/react/button` evaluates
`React.createContext` at module load (via `internals/use-button/useButton` →
`composite/root/CompositeRootContext`), which throws in the RSC/react-server
runtime → `TypeError: (0 , g.createContext) is not a function` during
`next build` "collect page data". Added `"use client"` to `button.tsx`.
Safe: the only `buttonVariants` callers are client modules. Verified: full
`next build` passes.

## Left alone

Nothing button-specific left behind.

## Behavior changes

None. Base UI Button + `render` is behavior-equivalent to Radix Slot/asChild
for these link/anchor compositions.

## Verify by hand

- Click each "Create Organization" / "Go to Tickets" button → navigates.
- Ticket detail/edit icon buttons (render a `next/link`) navigate and keep
  the outline/icon styling.
- Keyboard focus ring + disabled state on submit buttons.
