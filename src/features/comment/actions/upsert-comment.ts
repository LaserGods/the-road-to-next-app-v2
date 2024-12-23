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
import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/paths";

const upsertCommentSchema = z.object({
  content: z
    .string()
    .min(1)
    .max(1024, { message: "Must be between 1 and 1024 characters" }),
});

export const upsertComment = async (
  ticketId: string,
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  try {
    if (id) {
      const comment = await prisma.comment.findUnique({
        where: { id },
      });

      if (!comment || !isOwner(user, comment)) {
        return toActionState("ERROR", "Not authorized.");
      }
    }

    const data = upsertCommentSchema.parse({
      content: formData.get("content"),
    });

    const dbData = {
      ...data,
      userId: user?.id,
      ticketId: ticketId,
    };

    await prisma.comment.upsert({
      where: { id: id || "" },
      update: dbData,
      create: dbData,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketPath(ticketId));

  if (id) {
    await setCookieByKey("toast", "Comment updated");
    redirect(ticketPath(ticketId));
  }

  return toActionState("SUCCESS", "Comment created");
};
