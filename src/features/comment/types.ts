import { Prisma } from "@prisma/client";

export type CommentWithMetadata = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: { username: true };
    };
    ticket: {
      select: {
        id: true;
      };
    };
    _count: {
      select: {
        replies: true;
      };
    };
  };
}>;
