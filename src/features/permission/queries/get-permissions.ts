"use server";

import { prisma } from "@/lib/prisma";

export const getPermissions = async ({
  userId,
  organizationId,
}: {
  userId: string | undefined;
  organizationId: string | undefined;
}) => {
  if (!userId || !organizationId) {
    return {};
  }

  const membership = await prisma.membership.findUnique({
    where: {
      membershipId: {
        userId,
        organizationId,
      },
    },
    select: {
      membershipRole: true,
    },
  });

  if (!membership) {
    return {};
  }

  // Get role defaults from database
  const rolePermissions = await prisma.rolePermission.findMany({
    where: {
      roleName: membership.membershipRole,
    },
    select: {
      key: true,
      value: true,
    },
  });

  // Get user-specific permission overrides
  const userPermissions = await prisma.permission.findMany({
    where: {
      userId,
      organizationId,
    },
    select: {
      key: true,
      value: true,
    },
  });

  // Start with role defaults
  const permissionsMap = rolePermissions.reduce(
    (acc, rp) => {
      acc[rp.key] = rp.value;
      return acc;
    },
    {} as Record<string, boolean>,
  );

  // Override with user-specific permissions
  userPermissions.forEach((up) => {
    permissionsMap[up.key] = up.value;
  });

  return permissionsMap;
};
