import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { getBaseUrl } from "@/utils/url";
import { sendEmailWelcome } from "../emails/send-email-welcome";

export type SignupEventArgs = {
  data: {
    userId: string;
  };
};

export const signupEvent = inngest.createFunction(
  { id: "signup-emails" },
  { event: "app/signup.complete" },
  async ({ event, step }) => {
    const { userId } = event.data;

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    const loginLink = getBaseUrl() + ticketsPath();

    const emailWelcomeDelay = 5 * 60 * 1000; // 5 minutes

    await step.sleep("wait-five-min-for-welcome-email", emailWelcomeDelay); // 5 minutes
    const result = await step.run("send-welcome-email", async () => {
      return await sendEmailWelcome(user.username, user.email, loginLink);
    });

    return { event, body: result };
  },
);
