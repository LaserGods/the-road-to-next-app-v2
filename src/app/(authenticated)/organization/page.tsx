import { LucidePlus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { buttonVariants } from "@/components/ui/button";
import { OrganizationList } from "@/features/organization/components/organization-list";
import { cn } from "@/lib/utils";
import { organizationCreatePath } from "@/paths";

const OrganizationsPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Organizations"
        description="All your Organizations"
        actions={
          <Link
            href={organizationCreatePath()}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <LucidePlus className="size-4" />
            Create Organization
          </Link>
        }
      />

      <Suspense fallback={<Spinner />}>
        <OrganizationList />
      </Suspense>
    </div>
  );
};

export default OrganizationsPage;
