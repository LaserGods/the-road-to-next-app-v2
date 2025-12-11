"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { invitationsPath, membershipsPath, organizationsPath } from "@/paths";

type OrganizationBreadcrumbsProps = {
  organizationName: string;
};

const OrganizationBreadcrumbs = ({
  organizationName,
}: OrganizationBreadcrumbsProps) => {
  return (
    <Breadcrumbs
      breadcrumbs={[
        { title: "Organizations", href: organizationsPath() },
        { title: organizationName },
      ]}
    />
  );
};

const OrganizationTabs = () => {
  const params = useParams<{ organizationId: string }>();
  const pathName = usePathname();

  return (
    <Tabs value={pathName.split("/").at(-1)}>
      <TabsList>
        <TabsTrigger value="memberships" asChild>
          <Link href={membershipsPath(params.organizationId)}>Memberships</Link>
        </TabsTrigger>
        <TabsTrigger value="invitations" asChild>
          <Link href={invitationsPath(params.organizationId)}>Invitations</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export { OrganizationBreadcrumbs, OrganizationTabs };
