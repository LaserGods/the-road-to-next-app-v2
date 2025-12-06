import { CommentGetPayload } from "@/lib/generated/prisma/models/Comment";

export type CommentWithMetadata = CommentGetPayload<{
  include: {
    user: {
      select: { username: true };
    };
  };
}> & { isOwner: boolean };
