# avatar

2026-07-12 — golden pair via shadcn CLI (`shadcn add avatar --overwrite`, base-nova). Migrated.

## Changed

- `src/components/ui/avatar.tsx`: Radix Avatar → Base UI
  `@base-ui/react/avatar` (direct 1:1; `Avatar.Image` `delayMs`→`delay` if
  used — not used here). Leftover scan clean.
- Consumers — no avatar-specific prop changes. In
  `src/app/_navigation/account-dropdown.tsx` the Avatar is now the
  DropdownMenuTrigger's `render` target
  (`<DropdownMenuTrigger render={<Avatar/>}>`) — see dropdown-menu.md.

## Left alone

Nothing avatar-specific left behind.

## Behavior changes

None.

## Verify by hand

- Account dropdown trigger shows the user's initial in the avatar and opens
  the menu on click.
