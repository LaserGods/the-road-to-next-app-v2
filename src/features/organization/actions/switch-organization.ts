"use server";

import { revalidatePath } from "next/cache";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { organizationsPath } from "@/paths";
import { getOrganizationsByUser } from "../queries/get-organizations-by-user";

export const switchOrganization = async (organizationId: string) => {
  const { user } = await getAuthOrRedirect({
    checkActiveOrganization: false,
  });

  try {
    const organizations = await getOrganizationsByUser();

    const canSwitch = organizations.some(
      (organization) => organization.id === organizationId,
    );

    if (!canSwitch) {
      return toActionState(
        "ERROR",
        "You are not a member of this organization.",
      );
    }

    await prisma.$transaction([
      // Deactivate all other memberships for the user
      prisma.membership.updateMany({
        where: {
          userId: user.id,
          organizationId: {
            not: organizationId,
          },
        },
        data: {
          isActive: false,
        },
      }),
      // Set the new organization as active
      prisma.membership.update({
        where: {
          membershipId: {
            userId: user.id,
            organizationId,
          },
        },
        data: {
          isActive: true,
        },
      }),
    ]);
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(organizationsPath());

  return toActionState("SUCCESS", "Active organization switched successfully.");
};
