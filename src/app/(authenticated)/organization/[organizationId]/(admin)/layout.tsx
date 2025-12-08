import { getPermissionOrRedirect } from "@/features/permission/queries/get-permission-or-redirect";

export default async function AdminLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ organizationId: string }>;
}>) {
  const { organizationId } = await params;

  await getPermissionOrRedirect({
    organizationId,
    permissionKey: ["membership:view", "invitation:view"],
  });

  return <>{children}</>;
}
