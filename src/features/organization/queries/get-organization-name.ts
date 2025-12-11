import { redirect } from "next/navigation";
import { getPermissionOrRedirect } from "@/features/permission/queries/get-permission-or-redirect";
import { prisma } from "@/lib/prisma";
import { selectActiveOrganizationPath } from "@/paths";

export const getOrganizationName = async (organizationId: string) => {
  await getPermissionOrRedirect({
    organizationId,
    permissionKey: "organization:view",
  });

  const organization = await prisma.organization.findUnique({
    where: { id: organizationId },
    select: { name: true },
  });

  if (!organization) {
    redirect(selectActiveOrganizationPath());
  }

  return organization;
};
