# popover

2026-07-12 — golden pair via shadcn CLI (`shadcn add popover --overwrite`, base-nova). Migrated.

## Changed

- `src/components/ui/popover.tsx`: Radix Popover → Base UI
  `@base-ui/react/popover`. Portal→Positioner→Popup; Anchor dropped (not
  used). Leftover scan clean.
- Consumers — `asChild`→`render`:
  - `src/components/date-picker.tsx`:
    `<PopoverTrigger id={id} className="w-full" render={<Button .../>}>` with
    the calendar-trigger content (icon, formatted date, hidden input) hoisted
    to the trigger. PopoverContent hosts the react-day-picker `Calendar`
    (untouched, non-radix).

## Left alone

- `src/components/calendar-custom.tsx` / react-day-picker `Calendar` — not
  radix; untouched.

## Behavior changes

- Radix `openDelay`/`closeDelay` on Root would relocate to the Trigger in
  Base UI, but they are not used here. `onOpenChange` gains an event-details
  arg; the existing `setOpen` handler is unaffected.

## Verify by hand

- Date picker: click the field → popover opens with the calendar; selecting a
  date closes it and updates the field + hidden input value.
- Positioning stays anchored to the trigger; Escape / outside-click closes.
