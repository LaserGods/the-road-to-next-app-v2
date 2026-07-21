# dialog

2026-07-12 — golden pair via shadcn CLI (`shadcn add dialog --overwrite`, base-nova). Migrated.

## Changed

- `src/components/ui/dialog.tsx`: Radix Dialog → Base UI
  `@base-ui/react/dialog`. Overlay→Backdrop, Content→Popup (centered modal,
  no Positioner), Close keeps `render`. Leftover scan clean.
- Consumers — `asChild`→`render` on `DialogTrigger`:
  - `src/features/invitations/components/invitation-create-button.tsx`
    (`<DialogTrigger render={<Button/>}>`).
  - `src/features/membership/components/membership-more-menu.tsx` uses
    `<Dialog>` for the permissions dialog — controlled via `open`/
    `onOpenChange`, no asChild there.

## Left alone

Nothing dialog-specific left behind.

## Behavior changes

- `onOpenChange` now passes `(open, eventDetails)`; single-arg `setOpen`
  handlers are unaffected. `onOpenAutoFocus`/`onCloseAutoFocus` are not used
  in this app, so no `initialFocus`/`finalFocus` restructure was needed.

## Verify by hand

- "Invite Member" opens the dialog, submit closes on success, Cancel closes.
- Membership "Customize Permissions…" dialog opens/scrolls and closes.
- Focus is trapped in the dialog and returns to the trigger on close; Escape
  closes.
