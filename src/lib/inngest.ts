import { EventSchemas, Inngest } from "inngest";
import { SignupEventArgs } from "@/features/auth/events/event-welcome-email";
import { PasswordResetEventArgs } from "@/features/password/events/event-password-reset";

type Events = {
  "app/password.password-reset": PasswordResetEventArgs;
  "app/signup.complete": SignupEventArgs;
};

export const inngest = new Inngest({
  id: "ticket-bounty",
  schemas: new EventSchemas().fromRecord<Events>(),
});
