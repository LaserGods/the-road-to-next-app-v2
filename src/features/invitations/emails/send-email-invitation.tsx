import EmailInvitation from "@/emails/invitation/email-invitation";
import { sendEmail } from "@/lib/ses";

export const sendEmailInvitation = async (
  username: string,
  organizationName: string,
  email: string,
  emailInvitationLink: string,
) => {
  return await sendEmail({
    from: "no-reply@app.ticketbounty.com",
    to: email,
    subject: `Invitation to ${organizationName} on TicketBounty`,
    react: (
      <EmailInvitation
        fromUser={username}
        fromOrganization={organizationName}
        url={emailInvitationLink}
      />
    ),
  });
};
