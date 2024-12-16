"use server";

import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";

const createCommentSchema = z.object({
  content: z
    .string()
    .min(1)
    .max(1024, { message: "Must be between 1 and 1024 characters" }),
});

export const createComment = async (
  ticketId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  try {
    const data = createCommentSchema.parse({
      content: formData.get("content"),
    });

    const dbData = {
      ...data,
      userId: user?.id,
      ticketId: ticketId,
    };

    await prisma.comment.create({
      data: dbData,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "Comment posted to ticket");
};
