# select

2026-07-12 — golden pair via shadcn CLI (`shadcn add select --overwrite`, base-nova). Migrated + runtime-verified.

## Changed

- `src/components/ui/select.tsx`: Radix Select → Base UI
  `@base-ui/react/select`. Viewport→List, ScrollUp/DownButton→
  ScrollUp/DownArrow, Icon/ItemIndicator use `render`, `position` →
  `alignItemWithTrigger` on the Positioner; vars → `--available-height` /
  `--anchor-width` / `--transform-origin`. Leftover scan clean.
- Consumers — `onValueChange` signature widened. Base UI Select
  `onValueChange` is `(value: string | null, eventDetails) => void`
  (nullable). Handlers updated to accept `string | null` and guard null:
  - `src/components/pagination.tsx` (`handleChangeSize`)
  - `src/components/sort-select.tsx` (`handleSort`)
- Trigger label display (follow-up, 2026-07-12) — Base UI `<Select.Value>`
  renders the raw selected value, not the option label, unless `Select.Root`
  gets an `items` map. Radix rendered the selected `<Select.Item>`'s children
  automatically; Base UI does not.
  - `src/components/sort-select.tsx`: added `items` ({ value, label }[] where
    `value` is the composite `sortKey + "_" + sortValue`) so the trigger shows
    "Newest" etc. instead of `createdAt_desc`. Also switched
    `defaultValue` → controlled `value` (component is controlled via props).
  - `src/components/pagination.tsx`: no `items` needed — its value equals its
    label ("10" → "10"), so `<Select.Value>` already renders correctly.

## Left alone

Nothing select-specific left behind.

## Behavior changes

- `onValueChange` can now emit `null` (e.g. a future clearable select). Both
  handlers early-return on null; current selects are not clearable, so no
  visible change.

## Verify by hand

- Tickets list "sort" select: opens (Portal popup), 4 options
  (Newest/Oldest/Bounty/Title), choosing one re-sorts the list.
  (Verified at runtime: popup opens and renders all options.)
- Pagination page-size select (5/10/25/50/100): changing size re-paginates.
- Keyboard: open with Enter/Space, arrow-navigate, typeahead, Escape closes.
