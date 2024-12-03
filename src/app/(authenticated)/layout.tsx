import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";

// IMPOPRTANT: Authorization should NEVER be done in a layout in a production app.

export default async function AuthenticatedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await getAuthOrRedirect();

  return <>{children}</>;
}
