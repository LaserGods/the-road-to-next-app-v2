"use server";

import { revalidatePath } from "next/cache";
import { toActionState } from "@/components/form/utils/to-action-state";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { prisma } from "@/lib/prisma";
import { membershipsPath } from "@/paths";
import { MEMBER_ROLE_PERMISSIONS } from "../constants";

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
    const defaultValue = MEMBER_ROLE_PERMISSIONS[key] ?? false;
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
