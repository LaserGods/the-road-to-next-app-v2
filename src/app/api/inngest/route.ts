import { serve } from "inngest/next";
import { signupEvent } from "@/features/auth/events/event-welcome-email";
import { passwordResetEvent } from "@/features/password/events/event-password-reset";
import { inngest } from "@/lib/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [passwordResetEvent, signupEvent],
});
