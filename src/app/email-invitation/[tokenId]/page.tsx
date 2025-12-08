import { CardCompact } from "@/components/card-compact";
import { InvitationAcceptForm } from "@/features/invitations/components/invitation-accept-form";

type EmailInvitationPageProps = {
  params: Promise<{
    tokenId: string;
  }>;
};

const EmailInvitationPage = async ({ params }: EmailInvitationPageProps) => {
  const { tokenId } = await params;

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Invitation to Organization"
        description="You have been invited to join the organization"
        className="animate-fade-from-top w-full max-w-[420px]"
        content={<InvitationAcceptForm tokenId={tokenId} />}
      />
    </div>
  );
};

export default EmailInvitationPage;
