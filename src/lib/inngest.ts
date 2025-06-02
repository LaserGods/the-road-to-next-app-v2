import { EventSchemas, Inngest } from "inngest";
import { PasswordResetEventArgs } from "@/features/password/events/event-password-reset";

type AuthSignUpEventArgs = {
  data: {
    userId: string;
  };
};

type Events = {
  "app/password.password-reset": PasswordResetEventArgs;
  "app/auth.sign-up": AuthSignUpEventArgs;
};

export const inngest = new Inngest({
  id: "ticket-bounty",
  schemas: new EventSchemas().fromRecord<Events>(),
});
