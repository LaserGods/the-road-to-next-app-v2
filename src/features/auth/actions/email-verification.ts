"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { createSessionToken } from "@/lib/session";
import { ticketsPath } from "@/paths";
import { generateRandomToken } from "@/utils/crypto";
import { getAuthOrRedirect } from "../queries/get-auth-or-redirect";
import { setSessionCookie } from "../utils/session-cookie";
import { validateEmailVerificationCode } from "../utils/validate-email-verification-code";

const emailVerificationSchema = z.object({
  code: z.string().length(8),
});

export const emailVerification = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect({
    checkEmailVerified: false,
    checkOrganization: false,
    checkActiveOrganization: false,
  });

  try {
    const { code } = emailVerificationSchema.parse(
      Object.fromEntries(formData),
    );

    const validCode = await validateEmailVerificationCode(
      user.id,
      user.email,
      code,
    );

    if (!validCode) {
      return toActionState("ERROR", "Invalid or expired verification code.");
    }

    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true },
    });

    const sessionToken = generateRandomToken();
    const session = await createSessionToken(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  await setCookieByKey("toast", "Email verified successfully!");
  return redirect(ticketsPath());
};
