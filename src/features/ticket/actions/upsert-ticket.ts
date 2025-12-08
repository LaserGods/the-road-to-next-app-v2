"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getPermission } from "@/features/permission/queries/get-permission";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
  title: z
    .string()
    .min(1, { error: "Title is required" })
    .max(191, { error: "Title is too long" }),
  content: z
    .string()
    .min(1, { error: "Content is required" })
    .max(1024, { error: "Content is too long" }),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
  bounty: z.coerce
    .number({ error: "Bounty must be a positive number" })
    .positive({ message: "Bounty must be positive" }),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user, activeOrganization } = await getAuthOrRedirect();

  try {
    if (id) {
      const ticket = await prisma.ticket.findUnique({
        where: {
          id,
        },
      });

      if (!ticket || !isOwner(user, ticket)) {
        return toActionState("ERROR", "Not authorized.");
      }

      const updatePermission = await getPermission({
        organizationId: ticket.organizationId,
        userId: user.id,
        key: "ticket:update",
      });

      if (!updatePermission) {
        return toActionState("ERROR", "Not authorized.");
      }
    }

    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
    });

    const dbData = {
      ...data,
      userId: user.id,
      bounty: toCent(data.bounty),
    };

    await prisma.ticket.upsert({
      where: { id: id || "" },
      update: dbData,
      create: { ...dbData, organizationId: activeOrganization!.id },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());

  if (id) {
    await setCookieByKey("toast", "Ticket updated");
    redirect(ticketPath(id));
  }

  return toActionState("SUCCESS", "Ticket created");
};
