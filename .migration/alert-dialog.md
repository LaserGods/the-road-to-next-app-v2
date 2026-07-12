# alert-dialog

2026-07-12 — golden pair via shadcn CLI (`shadcn add alert-dialog --overwrite`, base-nova). Migrated.

## Changed

- `src/components/ui/alert-dialog.tsx`: Radix AlertDialog → Base UI
  `@base-ui/react/alert-dialog`. Overlay→Backdrop, Content→Popup,
  Cancel→`Close` rendered as a Button, and `AlertDialogAction` has NO Base UI
  primitive — it is now a plain `Button` (which accepts `render`). Leftover
  scan clean.
- Consumers — `asChild`→`render`:
  - `src/components/confirm-dialog.tsx`:
    `<AlertDialogAction render={<form action={formAction} />}>` wrapping the
    submit button. Cancel is `AlertDialogCancel`.

## Left alone

Nothing alert-dialog-specific left behind.

## Behavior changes

- `AlertDialogAction` is a plain Button now (no Radix `Action` semantics); it
  does not auto-close the dialog. Here it wraps a `<form>` whose submit runs a
  server action and closes via the surrounding controlled `open` state, so
  behavior is unchanged.

## Verify by hand

- Any delete confirmation (invitation/membership/organization/ticket):
  trigger opens the alert, Confirm submits the delete + shows toast, Cancel
  dismisses. Focus returns to the trigger; Escape cancels.
