import { prisma } from "@/lib/prisma";

export const getComments = async (ticketId: string) => {
  return await prisma.comment.findMany({
    where: {
      ticketId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      _count: {
        select: {
          replies: true,
        },
      },
    },
  });
};
