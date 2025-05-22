"use client";

import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { CustomToast, type CustomToastProps } from "@/components/custom-toast";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils";
import { homePath, signInPath, singUpPath } from "@/paths";
import { AccountDropdown } from "./account-dropdown";

let currentToastId: string | number | undefined;

const customWarningToast = (
  customWarningToast: Omit<CustomToastProps, "id"> & { duration?: number },
) => {
  if (currentToastId) {
    toast.dismiss(currentToastId);
  }
  currentToastId = toast.custom(
    (id) => (
      <CustomToast
        id={id}
        title={customWarningToast.title}
        description={customWarningToast.description}
        button={{
          label: customWarningToast.button.label,
          onClick: () => {
            customWarningToast.button.onClick();
            toast.dismiss(id);
          },
        }}
      />
    ),
    {
      duration: customWarningToast.duration,
      onDismiss: () => {
        currentToastId = undefined;
      },
      onAutoClose: () => {
        currentToastId = undefined;
      },
    },
  );
  return currentToastId;
};

const Header = () => {
  const { user, isFetched } = useAuth();

  if (!isFetched) {
    return null;
  }

  const navItems = user ? (
    <AccountDropdown user={user} />
  ) : (
    <>
      <Link
        href={singUpPath()}
        className={buttonVariants({ variant: "outline" })}
        onNavigate={() => {
          customWarningToast({
            title: "Demo App Warning",
            description:
              "This is a demo app. Please do not submit any sensitive data or pay any bounties. Due to the nature of the app, your tickets and account could be deleted at any time!",
            button: {
              label: "Got it",
              onClick: () => toast.dismiss(),
            },
            duration: Infinity,
          });
        }}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: "default" })}
        onNavigate={() => {
          customWarningToast({
            title: "Demo App Warning",
            description:
              "This is a demo app. Please do not submit any sensitive data or pay any bounties. Due to the nature of the app, your tickets and account could be deleted at any time!",
            button: {
              label: "Got it",
              onClick: () => toast.dismiss(currentToastId),
            },
            duration: Infinity,
          });
        }}
      >
        Sign In
      </Link>
    </>
  );

  return (
    <nav className="supports-backdrop-blur:bg-background/60 animate-header-from-top bg-background/95 fixed top-0 right-0 left-0 z-20 flex w-full justify-between border-b px-5 py-2.5 backdrop-blur-sm">
      <div className="align-items flex gap-x-2">
        <Link
          href={homePath()}
          className={cn(buttonVariants({ variant: "ghost" }), "[&_svg]:size-6")}
        >
          <LucideKanban />
          <h1 className="text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div className="align-items flex gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

export { Header };
