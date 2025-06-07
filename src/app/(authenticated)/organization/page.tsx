import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { OrganizationList } from "@/features/organization/components/organization-list";

const OrganizationsPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="Organizations" description="All your Organizations" />

      <Suspense fallback={<Spinner />}>
        <OrganizationList />
      </Suspense>
    </div>
  );
};

export default OrganizationsPage;
