# tooltip

2026-07-12 — golden pair via shadcn CLI + custom-variant replay. Migrated; app's custom API preserved.

## Changed

- `src/components/ui/tooltip.tsx`: base-nova tooltip
  (`@base-ui/react/tooltip`, Portal→Positioner→Popup, `delayDuration`→`delay`
  on Provider, `sideOffset` default 0→4, div-based Arrow with per-side
  classes). The preset's pristine reinstall DROPPED the project's custom
  `variant` / `typography` / `arrowVariant` cva API that ~11 call sites rely
  on; that API was REPLAYED onto the base-nova structure:
  - `tooltipVariants` cva: `variant` (default/destructive/outline/secondary),
    `typography` (default/mono); radix `data-[state=*]` / `--radix-tooltip-*`
    rewritten to base `data-open`/`data-closed` / `--transform-origin`.
  - `tooltipArrowVariants` cva: `arrowVariant`
    (defaultArrow/destructiveArrow/outlineArrow/secondaryArrow) using
    `bg-*`/`fill-*` for the base div-arrow.
  - `Tooltip` wrapper re-wraps its Root in a `TooltipProvider` and accepts a
    per-instance `delay` prop (base UI `Tooltip.Root` has NO `delay`; delay
    lives on Provider). This mirrors the original wrapper, which also
    auto-wrapped in a Provider.
  Leftover scan clean.
- Consumers — `asChild`→`render` on `TooltipTrigger`; `delayDuration`→`delay`
  on `<Tooltip>`:
  - `src/features/invitations/components/invitation-delete-button.tsx`
  - `src/features/membership/components/membership-delete-button.tsx`
  - `src/features/membership/components/membership-list.tsx` (delay=50)
  - `src/features/organization/components/active-organization-badge.tsx`
    (delay=300; nested `TooltipTrigger render={<Badge render={<Link/>} />}`)
  - `src/features/organization/components/organization-delete-button.tsx`
  - `src/features/organization/components/organization-list.tsx`
    (delay 100/100/50; one nested Button render={<Link/>})
  - `src/features/ticket/components/ticket-item.tsx` (side="right")
  - `src/features/ticket/components/ticket-more-menu.tsx`
    (trigger render={<DropdownMenuItem/>}, side="bottom")

## Left alone

Nothing tooltip-specific left behind.

## Behavior changes

- Per-instance delay is now implemented by giving each `<Tooltip>` its own
  `TooltipProvider delay={n}` (Base UI has no Root-level delay). Functionally
  equal to the previous per-tooltip delayDuration; there is no shared
  skip-delay grouping (Radix `skipDelayDuration` concept is gone — it was not
  used here).
- Arrow is now a rotated `<div>` (base UI) rather than an SVG; the
  outline-variant arrow border is approximated with `border-input` instead of
  SVG `stroke`.

## Verify by hand

- Hover the delete/edit/detail icon buttons in the organizations &
  memberships tables → tooltip appears after its delay, correct
  variant/typography (mono) and colored arrow (destructive/outline/secondary),
  correct side (right on ticket edit, bottom on ticket more-menu).
- Tooltip on the active-organization badge (links to organizations) still
  navigates on click.
