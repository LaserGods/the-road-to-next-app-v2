"use server";

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";

export const getPermission = async ({
  userId,
  organizationId,
  key,
}: {
  userId: string;
  organizationId: string;
  key: string;
}) => {
  await getAuthOrRedirect();

  const permission = await prisma.permission.findUnique({
    where: {
      permissionId: {
        userId,
        organizationId,
        key,
      },
    },
  });

  return {
    permission: permission ?? { userId, organizationId, key, value: false },
  };
};
