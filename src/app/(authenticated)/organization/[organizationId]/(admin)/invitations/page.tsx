import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { InvitationCreateButton } from "@/features/invitations/components/invitation-create-button";
import { InvitationList } from "@/features/invitations/components/invitation-list";
import { getOrganizationName } from "@/features/organization/queries/get-organization-name";
import { OrganizationBreadcrumbs, OrganizationTabs } from "../_navigation/tabs";

type InvitationsPageProps = {
  params: Promise<{
    organizationId: string;
  }>;
};

const InvitationsPage = async ({ params }: InvitationsPageProps) => {
  const { organizationId } = await params;
  const organization = await getOrganizationName(organizationId);
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Invitations"
        description="Manage invitations in your organization"
        breadcrumbs={
          <OrganizationBreadcrumbs organizationName={organization.name} />
        }
        tabs={<OrganizationTabs />}
        actions={<InvitationCreateButton organizationId={organizationId} />}
      />

      <Suspense fallback={<Spinner />}>
        <InvitationList organizationId={organizationId} />
      </Suspense>
    </div>
  );
};

export default InvitationsPage;
