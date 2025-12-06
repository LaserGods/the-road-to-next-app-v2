import { getAuth } from "@/features/auth/queries/get-auth";
import { prisma } from "@/lib/prisma";

export const getPermissions = async ({
  userId,
  organizationId,
}: {
  userId: string | undefined;
  organizationId: string | undefined;
}) => {
  await getAuth();

  if (!userId || !organizationId) {
    return { hasPermission: false };
  }

  const permissions = await prisma.permission.findMany({
    where: {
      userId,
      organizationId,
    },
    select: {
      key: true,
      value: true,
    },
  });

  return permissions.reduce(
    (acc, permission) => {
      acc[permission.key] = permission.value;
      return acc;
    },
    {} as Record<string, boolean>,
  );
};
