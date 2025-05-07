"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { setSessionCookie } from "@/features/auth/utils/session-cookie";
import { prisma } from "@/lib/prisma";
import { createSessionToken } from "@/lib/session";
import { ticketsPath } from "@/paths";
import { generateRandomToken, hashToken } from "@/utils/crypto";
import { hashPassword } from "../utils/hash-and-verify";

const passwordResetSchema = z
  .object({
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  });

export const passwordReset = async (
  tokenId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const { password } = passwordResetSchema.parse({
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const tokenHash = hashToken(tokenId);

    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (passwordResetToken) {
      await prisma.passwordResetToken.delete({
        where: { tokenHash },
      });
    }

    if (
      !passwordResetToken ||
      Date.now() > passwordResetToken.expiresAt.getTime()
    ) {
      return toActionState("ERROR", "Expired or invalid token", formData);
    }

    await prisma.session.deleteMany({
      where: {
        userId: passwordResetToken.userId,
      },
    });

    const passwordHash = await hashPassword(password);

    await prisma.user.update({
      where: { id: passwordResetToken.userId },
      data: { passwordHash },
    });

    await createUserSession(passwordResetToken.userId);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
  await setCookieByKey(
    "toast",
    "You successfully reset your password and signed in.",
  );
  redirect(ticketsPath());
};

const createUserSession = async (userId: string) => {
  const sessionToken = generateRandomToken();
  const session = await createSessionToken(sessionToken, userId);

  return await setSessionCookie(sessionToken, session.expiresAt);
};
