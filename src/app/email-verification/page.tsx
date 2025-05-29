import { CardCompact } from "@/components/card-compact";
import { EmailVerificationForm } from "@/features/auth/components/email-verification-form";

const EmailVerificationPage = async () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Verify Email"
        description="Please check your email for a verification link."
        className="animate-fade-from-top w-full max-w-[420px]"
        content={<EmailVerificationForm />}
      />
    </div>
  );
};

export default EmailVerificationPage;
