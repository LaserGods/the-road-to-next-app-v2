"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";

type FooterProps = {
  children: React.ReactNode;
};

// The footer is a client component that only renders when the user is authenticated
// The footer will display the user's active organization in a badge component
// and a link to the user's organization list
const Footer = ({ children }: FooterProps) => {
  const { user, isFetched } = useAuth();

  if (!isFetched) {
    return null;
  }

  const conditionalFooter = user ? (
    <>
      <footer className="fixed right-3 bottom-1 flex h-14 w-full max-w-[20dvw] items-center justify-end bg-transparent px-8 text-sm">
        {children}
      </footer>
    </>
  ) : null;

  return conditionalFooter;
};

export { Footer };
