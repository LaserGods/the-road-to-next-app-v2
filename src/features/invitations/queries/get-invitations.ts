import { getPermissionOrRedirect } from "@/features/permission/queries/get-permission-or-redirect";
import { prisma } from "@/lib/prisma";

export const getInvitations = async (organizationId: string) => {
  await getPermissionOrRedirect({
    organizationId,
    permissionKey: "invitation:view",
  });

  return await prisma.invitation.findMany({
    where: {
      organizationId,
    },
    select: {
      email: true,
      createdAt: true,
      invitedByUser: {
        select: {
          email: true,
          username: true,
        },
      },
    },
  });
};
