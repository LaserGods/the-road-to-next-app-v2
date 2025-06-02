import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { sendEmailVerification } from "../emails/send-email-verification";
import { generateEmailVerificationCode } from "../utils/generate-email-verification-code";

// Email verification and welcome email functions are triggered by the same event
// They share the same AuthSignUpEventArgs type defined in the inngest client

export const emailVerificationEvent = inngest.createFunction(
  { id: "email-verification" },
  { event: "app/auth.sign-up" },
  async ({ event }) => {
    const { userId } = event.data;

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });
    const verificationCode = await generateEmailVerificationCode(
      user.id,
      user.email,
    );

    const result = await sendEmailVerification(
      user.username,
      user.email,
      verificationCode,
    );

    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }

    return { event, body: result };
  },
);
