"use server";

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { getMembership } from "@/features/membership/queries/get-membership";
import { prisma } from "@/lib/prisma";

export const getPermission = async ({
  userId,
  organizationId,
  key,
}: {
  userId: string;
  organizationId: string;
  key: string;
}): Promise<boolean> => {
  await getAuthOrRedirect();

  const permission = await prisma.permission.findUnique({
    where: {
      permissionId: {
        userId,
        organizationId,
        key,
      },
    },
    select: { value: true },
  });

  if (permission) {
    return permission.value;
  }

  // fallback to user's membership role and its default permissions
  const membership = await getMembership({
    organizationId,
    userId,
  });

  if (!membership) {
    return false;
  }

  const rolePermission = await prisma.rolePermission.findUnique({
    where: {
      rolePermissionId: {
        roleName: membership.membershipRole,
        key,
      },
    },
  });

  return rolePermission?.value ?? false;
};
