# checkbox

2026-07-12 — golden pair via shadcn CLI (`shadcn add checkbox --overwrite`, base-nova). Migrated.

## Changed

- `src/components/ui/checkbox.tsx`: Radix Checkbox → Base UI
  `@base-ui/react/checkbox` (cleanest 1:1). Leftover scan clean.
- Consumers — none used `checked="indeterminate"`, so no
  `indeterminate`-boolean split was needed. Used by
  `src/features/permission/components/permission-checkbox.tsx` with plain
  `checked`/`onCheckedChange`.

## Left alone

Nothing checkbox-specific left behind.

## Behavior changes

- `onCheckedChange` gains an event-details arg (single-arg handlers
  unaffected). Base UI exposes `indeterminate` as a SEPARATE boolean prop
  (not a `checked` value) — not needed here.

## Verify by hand

- Permissions dialog checkboxes toggle and persist the permission change.
