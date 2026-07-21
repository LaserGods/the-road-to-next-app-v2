import EmailWelcome from "@/emails/auth/email-welcome";
import { sendEmail } from "@/lib/ses";

export const sendEmailWelcome = async (
  username: string,
  email: string,
  loginLink: string,
) => {
  return await sendEmail({
    from: "no-reply@app.ticketbounty.com",
    to: email,
    subject: "Welcome to TicketBounty",
    react: <EmailWelcome toName={username} loginUrl={loginLink} />,
  });
};
