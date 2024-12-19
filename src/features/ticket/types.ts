import { Prisma } from "@prisma/client";

export type TicketWithMetadata = Prisma.TicketGetPayload<{
  include: {
    user: {
      select: { username: true };
    };
    _count: {
      select: {
        comments: true;
      };
    };
    comments: {
      select: {
        id: true;
        content: true;
        createdAt: true;
        updatedAt: true;
        ticket: {
          select: {
            id: true;
          };
        };
        user: {
          select: {
            username: true;
          };
        };
        _count: {
          select: {
            replies: true;
          };
        };
      };
    };
  };
}>;
