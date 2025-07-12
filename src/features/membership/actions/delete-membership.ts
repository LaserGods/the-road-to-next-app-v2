"use server";

import { toActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { getMemberships } from "../queries/get-memberships";

export const deleteMembership = async ({
  organizationId,
  userId,
}: {
  organizationId: string;
  userId: string;
}) => {
  await getAuthOrRedirect();

  const membershipsResult = await getMemberships(organizationId);
  const memberships = membershipsResult.organizationMemberships;

  const isLastMembership = (memberships ?? []).length <= 1;

  if (isLastMembership) {
    return toActionState(
      "ERROR",
      "You cannot delete the last membership of an organization.",
    );
  }

  await prisma.membership.delete({
    where: {
      membershipId: {
        userId,
        organizationId,
      },
    },
  });

  return toActionState("SUCCESS", "Membership deleted successfully");
};
