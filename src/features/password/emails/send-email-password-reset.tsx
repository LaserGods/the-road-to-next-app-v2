import EmailPasswordReset from "@/emails/password/email-password-reset";
import { sendEmail } from "@/lib/ses";

export const sendEmailPasswordReset = async (
  username: string,
  email: string,
  passwordResetLink: string,
) => {
  return await sendEmail({
    from: "no-reply@app.ticketbounty.com",
    to: email,
    subject: "Password Reset from TicketBounty",
    react: <EmailPasswordReset toName={username} url={passwordResetLink} />,
  });
};
