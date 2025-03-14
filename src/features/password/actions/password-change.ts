"use server";

import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { generatePasswordResetLink } from "../utils/generate-password-reset-link";
import { verifyPasswordHash } from "../utils/hash-and-verify";
import { sendEmailPasswordReset } from "../emails/send-email-password-reset";
import { prisma } from "@/lib/prisma";

const passwordChangeSchema = z.object({
  password: z.string().min(6).max(191),
});

export const passwordChange = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const auth = await getAuthOrRedirect();

  try {
    const { password } = passwordChangeSchema.parse({
      password: formData.get("password"),
    });

    const user = await prisma.user.findUnique({
      where: { email: auth.user.email },
    });

    if (!user) {
      return toActionState("ERROR", "Invalid request", formData);
    }

    const validPassword = await verifyPasswordHash(user.passwordHash, password);

    if (!validPassword) {
      return toActionState("ERROR", "Invalid password", formData);
    }

    const passwordResetLink = await generatePasswordResetLink(user.id);

    await sendEmailPasswordReset(user.username, user.email, passwordResetLink);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
  return toActionState("SUCCESS", "Check your email for a reset link.");
};
