# label

2026-07-12 — golden pair via shadcn CLI (`shadcn add label --overwrite`, base-nova). Migrated.

## Changed

- `src/components/ui/label.tsx`: Radix `Label` primitive has NO Base UI
  counterpart; the base-nova label is a native `<label>` element (no
  `@base-ui/react` import). Leftover scan clean (no radix import remains).
- Consumers — no call-site changes. Form labels are `FieldLabel` from
  `src/components/ui/field.tsx` (Base UI Field, delivered by the preset).

## Left alone

Nothing label-specific left behind.

## Behavior changes

None (native `<label>` htmlFor association is equivalent).

## Verify by hand

- Field labels remain associated with their inputs (clicking a label focuses
  the input) on the sign-up / invite / profile forms.
