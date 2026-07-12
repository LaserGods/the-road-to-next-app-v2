# project

2026-07-12 — Whole-project Radix UI → Base UI migration (golden pair via shadcn CLI, style `radix-nova` → `base-nova`).

## Summary

The user applied shadcn preset `b3ZzCWkauO`, which moved `components.json`
from the legacy `default` style to `radix-nova` (baseColor slate→stone,
iconLibrary lucide→phosphor, fonts Oxanium/Geist) and reinstalled every ui
wrapper as pristine `radix-nova`. Because `radix-nova` has a `base-nova`
counterpart, this enabled a clean CLI golden-pair migration instead of the
legacy classification-only path.

Steps performed:
1. Flipped `components.json` style `radix-nova` → `base-nova`.
2. Installed `@base-ui/react@1.6.0` (coexisted with radix during the work).
3. `shadcn add <component> --overwrite` for all 14 radix wrappers (explicit
   list, never `--all`) — delivered base-nova variants with the project's
   phosphor/font/preset resolution.
4. Replayed the tooltip's custom `variant`/`typography`/`arrowVariant` cva
   API (destroyed by the preset reinstall) onto the base-nova tooltip.
5. Swept all app code against consumer-props.md (`asChild`→`render`,
   `delayDuration`→`delay`, Select `onValueChange` nullability, menu
   `onSelect`→`onClick`).
6. Removed the `radix-ui` dependency (`pnpm remove radix-ui`).

## Dependency swap

- Added: `@base-ui/react@1.6.0`.
- Removed: `radix-ui@1.4.3`.
- Preset-added (left in place, not part of this migration):
  `@phosphor-icons/react`, `shadcn` (as a dependency — unusual; flagged
  below), font imports in `src/app/layout.tsx`.

## App-code sweep summary

`asChild` → `render` in 20 files (Button, TabsTrigger, DropdownMenuTrigger,
DropdownMenuItem, BreadcrumbLink, AlertDialogAction, PopoverTrigger,
DialogTrigger, TooltipTrigger, Badge). `delayDuration` → `delay` on `<Tooltip>`
in 3 files (5 sites). Select `onValueChange` handlers widened to accept
`string | null` in `pagination.tsx` and `sort-select.tsx`. `onSelect` →
`onClick` on one DropdownMenuItem in `membership-more-menu.tsx` (see below).
Final sweep: zero `radix-ui`/`@radix-ui`/`asChild` references remain in `src`
(the only `Slot` matches are `InputOTPSlot`, which is input-otp, not radix).

## Verify results

- `pnpm type` (tsc --noEmit): PASSES clean, before and after removing radix.
- `pnpm build`: fails ONLY on `@aws-sdk/credential-provider-web-identity`
  module resolution inside `@aws-sdk/client-ses` (SES email code). This is a
  PRE-EXISTING failure from the previous session's Resend→SES migration
  (commit 0212938): the lockfile diff shows zero changes to any AWS SDK
  entries, and no UI/radix code appears in the failing import traces. Not
  addressed here (out of scope).
- Runtime (next dev): home, sign-up, and tickets pages render 200 with no
  console or runtime errors. Migrated base-ui Select verified opening its
  Portal→Positioner→Popup at runtime and rendering all options.

## Flagged (not fixed)

- `shadcn@^4.13.0` was added to `dependencies` by the preset. This is
  unusual (the CLI is normally run via `pnpm dlx`) and unrelated to the
  radix→base migration. Left as-is; the user may want to remove it.
- Behavior deltas per component are recorded in each component's report
  (menu items no longer close on select for checkbox/radio; tabs manual
  activation; tooltip hover-delay is now provider-scoped per instance).

## What remains on Radix

0 wrappers remain on Radix (derived by scanning `src/components/ui` for radix
imports).
