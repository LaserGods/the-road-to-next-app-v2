import { prisma } from "@/lib/prisma";

export const getComment = async (id: string) => {
  return await prisma.comment.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      ticket: {
        select: {
          id: true,
        },
      },
    },
  });
};
