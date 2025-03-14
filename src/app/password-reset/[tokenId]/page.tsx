import { CardCompact } from "@/components/card-compact";
import { PasswordResetForm } from "@/features/password/components/password-reset-form";

type PasswordForgotPageProps = {
  params: Promise<{
    tokenId: string;
  }>;
};

const PasswordResetPage = async ({ params }: PasswordForgotPageProps) => {
  const { tokenId } = await params;

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="New Password"
        description="Enter a new password for your account."
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<PasswordResetForm tokenId={tokenId} />}
      />
    </div>
  );
};

export default PasswordResetPage;
