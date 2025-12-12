"use server";

import { revalidatePath } from "next/cache";
import z from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/paths";

const createAttachmentsSchema = z.object({
  files: z.custom<FileList>().transform((files) => Array.from(files)),
});

export const createAttachments = async (
  ticketId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });

  if (!ticket) {
    return toActionState("ERROR", "Ticket not found.");
  }

  if (!isOwner(user, ticket)) {
    return toActionState("ERROR", "You do not own this ticket.");
  }

  try {
    const { files } = createAttachmentsSchema.parse({
      files: formData.getAll("files"),
    });

    for (const file of files) {
      const buffer = await Buffer.from(await file.arrayBuffer());

      // TODO: Upload to S3 or other storage service
      // TODO: create a reference in the database
    }
  } catch (error) {
    console.log(error);
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketPath(ticketId));

  return toActionState("SUCCESS", "Attachments uploaded successfully.");
};
