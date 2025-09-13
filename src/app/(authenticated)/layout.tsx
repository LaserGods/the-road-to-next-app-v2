import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";

// IMPORTANT: A layout should never be the main layer of authentication.

export default async function AuthenticatedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await getAuthOrRedirect();

  return <>{children}</>;
}
