import { CardCompact } from "@/components/card-compact";
import { OrganizationCreateFormForm } from "@/features/organization/components/organization-create-form";

const OnboardingPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Create Organization"
        description="To get started, create an organization."
        className="animate-fade-from-top w-full max-w-[420px]"
        content={<OrganizationCreateFormForm />}
      />
    </div>
  );
};

export default OnboardingPage;
