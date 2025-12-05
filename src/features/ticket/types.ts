import { TicketGetPayload } from "@/lib/generated/prisma/models";

export type TicketWithMetadata = TicketGetPayload<{
  include: {
    user: {
      select: { username: true };
    };
  };
}> & { isOwner: boolean; permissions: { [key: string]: boolean } };
