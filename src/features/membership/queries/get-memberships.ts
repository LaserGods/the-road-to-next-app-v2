"use server";

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";

export const getMemberships = async (organizationId: string) => {
  const currentUser = await getAuthOrRedirect();

  const organizationMemberships = await prisma.membership.findMany({
    where: {
      organizationId,
    },
    include: {
      organization: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          username: true,
          email: true,
          emailVerified: true,
        },
      },
    },
  });

  return { organizationMemberships, currentUser };
};
