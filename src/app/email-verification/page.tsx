import { CardCompact } from "@/components/card-compact";
import { EmailVerificationForm } from "@/features/auth/components/email-verification-form";
import { EmailVerificationResendForm } from "@/features/auth/components/email-verification-resend-form";

const EmailVerificationPage = async () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Verify Email"
        description="Please check your email for a verification code."
        className="animate-fade-from-top w-full max-w-[420px]"
        content={
          <div className="flex flex-col gap-y-2">
            <EmailVerificationForm />
            <EmailVerificationResendForm />
          </div>
        }
        centerContent
      />
    </div>
  );
};

export default EmailVerificationPage;
