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
  const { user } = await getAuthOrRedirect();

  const membershipsResult = await getMemberships(organizationId);
  const memberships = membershipsResult.organizationMemberships;

  // Check if the user is trying to delete the last membership
  const isLastMembership = (memberships ?? []).length <= 1;

  if (isLastMembership) {
    return toActionState(
      "ERROR",
      "You cannot delete the last membership of an organization.",
    );
  }

  // Check if the membership exists
  const targetMembership = (memberships ?? []).find(
    (membership) => membership.userId === userId,
  );

  if (!targetMembership) {
    return toActionState("ERROR", "Membership not found");
  }

  // Check if the user is deleting the last admin
  const adminMemberships = (memberships ?? []).filter(
    (membership) => membership.membershipRole === "ADMIN",
  );

  const removesAdmin = targetMembership.membershipRole === "ADMIN";
  const isLastAdmin = adminMemberships.length <= 1;

  if (removesAdmin && isLastAdmin) {
    return toActionState(
      "ERROR",
      "You cannot delete the last admin of an organization.",
    );
  }

  // Check if the user is authorized to delete the membership
  const myMembership = (memberships ?? []).find(
    (membership) => membership.userId === user.id,
  );

  const isMyself = userId === user.id;
  const isAdmin = myMembership?.membershipRole === "ADMIN";

  if (!isAdmin && !isMyself) {
    return toActionState(
      "ERROR",
      "You can only delete memberships as an admin",
    );
  }

  // Everything is checked. Proceed to delete the membership
  await prisma.membership.delete({
    where: {
      membershipId: {
        userId,
        organizationId,
      },
    },
  });

  const contextAwareToast = isMyself
    ? "You successfully left the organization."
    : "Membership deleted";

  return toActionState("SUCCESS", `${contextAwareToast}`);
};
