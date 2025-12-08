"use server";

import { revalidatePath } from "next/cache";
import { toActionState } from "@/components/form/utils/to-action-state";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { prisma } from "@/lib/prisma";
import { membershipsPath } from "@/paths";

export const togglePermission = async ({
  userId,
  organizationId,
  key,
}: {
  userId: string;
  organizationId: string;
  key: string;
}) => {
  await getAdminOrRedirect(organizationId);

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

  if (!existingPermission) {
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
      return toActionState("ERROR", "Membership not found");
    }

    // Get the role's default value for this permission
    const rolePermission = await prisma.rolePermission.findUnique({
      where: {
        rolePermissionId: {
          roleName: membership.membershipRole,
          key,
        },
      },
    });

    const defaultValue = rolePermission?.value ?? false;

    // Create a user-specific override with the toggled value
    await prisma.permission.create({
      data: {
        userId,
        organizationId,
        key,
        value: !defaultValue,
      },
    });
  } else {
    await prisma.permission.update({
      where,
      data: {
        value: !existingPermission.value,
      },
    });
  }

  revalidatePath(membershipsPath(organizationId));

  return toActionState("SUCCESS", "Permission updated");
};
