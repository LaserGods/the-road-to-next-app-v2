import { EventSchemas, Inngest } from "inngest";
import { AttachmentDeleteEventArgs } from "@/features/attachments/events/event-attachment-delete";
import { InvitationCreatedEventArgs } from "@/features/invitations/events/event-invitation-created";
import { PasswordResetEventArgs } from "@/features/password/events/event-password-reset";

type AuthSignUpEventArgs = {
  data: {
    userId: string;
  };
};

type Events = {
  "app/password.password-reset": PasswordResetEventArgs;
  "app/auth.sign-up": AuthSignUpEventArgs;
  "app/invitation.created": InvitationCreatedEventArgs;
  "app/attachment.deleted": AttachmentDeleteEventArgs;
};

export const inngest = new Inngest({
  id: "ticket-bounty",
  schemas: new EventSchemas().fromRecord<Events>(),
});
