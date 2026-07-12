# separator

2026-07-12 — golden pair via shadcn CLI (`shadcn add separator --overwrite`, base-nova). Migrated.

## Changed

- `src/components/ui/separator.tsx`: Radix Separator → Base UI
  `@base-ui/react/separator` (callable primitive; `decorative` prop dropped).
  Leftover scan clean.
- Consumers — no call site passed `decorative`, so nothing to change.

## Left alone

Nothing separator-specific left behind.

## Behavior changes

- `decorative` no longer exists (was unused). Orientation prop unchanged.

## Verify by hand

- Horizontal/vertical rules render where expected (dropdown separators, page
  headers).
