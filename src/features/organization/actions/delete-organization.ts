"use server";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { getOrganizationsByUser } from "../queries/get-organizations-by-user";

export const deleteOrganization = async (organizationId: string) => {
  await getAuthOrRedirect();

  try {
    const organizations = await getOrganizationsByUser();

    const canDelete = organizations.some(
      (organization) => organization.id === organizationId,
    );

    if (!canDelete) {
      return toActionState(
        "ERROR",
        "You are not a member of this organization.",
      );
    }

    await prisma.organization.delete({
      where: {
        id: organizationId,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  // The path ravalidation prevents the toast message from being displayed
  // The refresh needs to be handled in the client side
  // revalidatePath(organizationsPath());

  return toActionState("SUCCESS", "Organization deleted");
};
