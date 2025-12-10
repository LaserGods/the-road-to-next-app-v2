"use server";

import { toActionState } from "@/components/form/utils/to-action-state";
import { getPermissionOrRedirect } from "@/features/permission/queries/get-permission-or-redirect";
import { prisma } from "@/lib/prisma";

type DeleteInvitation = {
  email: string;
  organizationId: string;
};

export const deleteInvitation = async ({
  email,
  organizationId,
}: DeleteInvitation) => {
  await getPermissionOrRedirect({
    organizationId,
    permissionKey: "invitation:delete",
  });

  const invitation = await prisma.invitation.findUnique({
    where: {
      invitationId: {
        email,
        organizationId,
      },
    },
  });

  if (!invitation) {
    return toActionState("ERROR", "Invitation not found.");
  }

  await prisma.invitation.delete({
    where: {
      invitationId: {
        email,
        organizationId,
      },
    },
  });

  return toActionState("SUCCESS", "Invitation deleted successfully.");
};
