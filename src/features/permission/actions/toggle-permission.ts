"use server";

import { revalidatePath } from "next/cache";
import { toActionState } from "@/components/form/utils/to-action-state";
import { getMemberships } from "@/features/membership/queries/get-memberships";
import { prisma } from "@/lib/prisma";
import { membershipsPath } from "@/paths";
import { CRITICAL_PERMISSIONS } from "../constants";
import { getPermissionOrRedirect } from "../queries/get-permission-or-redirect";
import { getPermissions } from "../queries/get-permissions";

export const togglePermission = async ({
  userId,
  organizationId,
  key,
}: {
  userId: string;
  organizationId: string;
  key: string;
}) => {
  await getPermissionOrRedirect({
    organizationId,
    permissionKey: "membership:update",
  });

  const where = {
    permissionId: {
      userId,
      organizationId,
      key,
    },
  };

  const existingPermission = await prisma.permission.findUnique({
    where,
  });

  // Get current effective value for this user
  const userPermissions = await getPermissions({ userId, organizationId });
  const currentValue = userPermissions[key] ?? false;
  const newValue = !currentValue;

  // Check if we're trying to remove a critical permission
  if (
    CRITICAL_PERMISSIONS.includes(
      key as (typeof CRITICAL_PERMISSIONS)[number],
    ) &&
    !newValue
  ) {
    const usersWithPermission = await countUsersWithPermission(
      organizationId,
      key,
    );

    if (usersWithPermission <= 1) {
      return toActionState(
        "ERROR",
        `Cannot remove permission. At least one user must have "${key}" access.`,
      );
    }
  }

  // Create or update the permission
  if (!existingPermission) {
    await prisma.permission.create({
      data: {
        userId,
        organizationId,
        key,
        value: newValue,
      },
    });
  } else {
    await prisma.permission.update({
      where,
      data: {
        value: newValue,
      },
    });
  }

  revalidatePath(membershipsPath(organizationId));

  return toActionState("SUCCESS", "Permission updated");
};

/**
 * Count users who have a specific permission in an organization
 */
const countUsersWithPermission = async (
  organizationId: string,
  key: string,
): Promise<number> => {
  const { organizationMemberships } = await getMemberships(organizationId);

  // Get effective permissions for each membership and count those with the specified permission
  const permissionChecks = await Promise.all(
    organizationMemberships.map(async (membership) => {
      const permissions = await getPermissions({
        userId: membership.userId,
        organizationId,
      });
      return permissions[key] === true;
    }),
  );

  // Count how many memberships have the specified permission set to true
  return permissionChecks.filter(Boolean).length;
};
