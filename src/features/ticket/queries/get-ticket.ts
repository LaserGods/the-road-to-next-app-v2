import { prisma } from "@/lib/prisma";

export const getTicket = async (id: string) => {
  return await prisma.ticket.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          ticket: {
            select: {
              id: true,
            },
          },
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
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
};
