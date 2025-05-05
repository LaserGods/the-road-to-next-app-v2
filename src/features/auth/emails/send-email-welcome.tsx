import EmailWelcome from "@/emails/auth/email-welcome";
import { resend } from "@/lib/resend";

export const sendEmailWelcome = async (
  username: string,
  email: string,
  loginLink: string,
) => {
  return await resend.emails.send({
    from: "no-reply@app.ticketbounty.com",
    to: email,
    subject: "Welcome to TicketBounty",
    react: <EmailWelcome toName={username} loginUrl={loginLink} />,
  });
};
