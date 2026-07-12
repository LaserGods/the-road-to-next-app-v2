# switch

2026-07-12 — golden pair via shadcn CLI (`shadcn add switch --overwrite`, base-nova). Migrated.

## Changed

- `src/components/ui/switch.tsx`: Radix Switch → Base UI
  `@base-ui/react/switch` (direct 1:1). Leftover scan clean.
- Consumers — no switch-specific call-site changes.

## Left alone

Nothing switch-specific left behind.

## Behavior changes

- `onCheckedChange` gains an event-details arg (single-arg handlers
  unaffected).

## Verify by hand

- Any switch toggles on click/keyboard (Space) and reflects controlled state.
