import EmailVerification from "@/emails/auth/email-verification";
import { sendEmail } from "@/lib/ses";

export const sendEmailVerification = async (
  username: string,
  email: string,
  code: string,
) => {
  return await sendEmail({
    from: "no-reply@app.ticketbounty.com",
    to: email,
    subject: "Email Verification from TicketBounty",
    react: <EmailVerification toName={username} code={code} />,
  });
};
