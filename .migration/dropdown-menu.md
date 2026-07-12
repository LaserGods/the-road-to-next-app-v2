# dropdown-menu

2026-07-12 — golden pair via shadcn CLI (`shadcn add dropdown-menu --overwrite`, base-nova). Migrated.

## Changed

- `src/components/ui/dropdown-menu.tsx`: Radix DropdownMenu → Base UI
  `@base-ui/react/menu`. Canonical menu mapping (Content→Portal→Positioner→
  Popup, Label→GroupLabel, ItemIndicator→Checkbox/RadioItemIndicator,
  Sub→SubmenuRoot, SubTrigger→SubmenuTrigger). Leftover scan clean.
- Consumers — `asChild`→`render` on Trigger/Item, plus one Radix `onSelect`
  → Base UI `onClick`:
  - `src/app/_navigation/account-dropdown.tsx`: Trigger `render={<Avatar/>}`;
    3 Items `render={<Link/>}` / `render={<form/>}`.
  - `src/components/breadcrumbs.tsx`: Item `render={<Link/>}`.
  - `src/features/membership/components/membership-more-menu.tsx`: Trigger
    `render={<Button/>}`; **`onSelect`→`onClick`** on the "Customize
    Permissions…" item (see Behavior changes).
  - `src/features/membership/components/membership-role-dropdown.tsx`:
    Trigger `render={<Button/>}`.
  - `src/features/ticket/components/ticket-more-menu.tsx`: Trigger
    `render={trigger}`; the not-authorized Delete item is rendered via a
    `TooltipTrigger render={<DropdownMenuItem/>}`.

## Left alone

- `useConfirmDialog` passes a `<DropdownMenuItem>` as its trigger and
  `cloneElement`s an `onClick` onto it — Base UI Menu.Item accepts `onClick`,
  so this keeps working unchanged.

## Behavior changes

- **onSelect → onClick (fixed, called out):** Base UI `Menu.Item` has no
  `onSelect` (Radix's selection callback). `onSelect` on a Base UI item binds
  the NATIVE div `onSelect` (text-selection) event, which type-checks but
  never fires on click — the "Customize Permissions…" dialog would silently
  never open. Rewired to `onClick`.
- `DropdownMenuRadioGroup onValueChange` now receives `(value, eventDetails)`;
  existing single-arg handlers are unaffected.
- CheckboxItem/RadioItem `closeOnClick` defaults to FALSE in Base UI (Radix
  closed the menu on select). Not used by the current radio menus (they
  update role in place), so no visible change; flagged for future items.

## Verify by hand

- Account avatar menu: opens, Profile/Password links navigate, Sign Out form
  submits.
- Membership more-menu: role radio updates (toast), "Customize Permissions…"
  opens the permissions dialog.
- Ticket more-menu: status radio updates; unauthorized Delete shows tooltip.
- Keyboard: arrow-key navigation + typeahead inside each menu.
