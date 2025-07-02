import { format } from "date-fns";
import { LucideBan, LucideCheck } from "lucide-react";
// import { Breadcrumbs } from "@/components/breadcrumbs";
// import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { organizationsPath } from "@/paths";
import { getMemberships } from "../queries/get-memberships";

type MembershipListProps = {
  organizationId: string;
};

const MembershipList = async ({ organizationId }: MembershipListProps) => {
  const memberships = await getMemberships(organizationId);

  return (
    // <div className="flex flex-1 flex-col gap-y-8">
    //   <Breadcrumbs
    //     breadcrumbs={[
    //       {
    //         title: "Organizations",
    //         href: organizationsPath(),
    //       },
    //       {
    //         title: `${memberships[0]?.organization.name} Members`,
    //         href: `/organization/${organizationId}/memberships`,
    //       },
    //     ]}
    //   />

    //   <Separator />

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Username</TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Joined At</TableHead>
          <TableHead className="text-center">Email Verified</TableHead>
          <TableHead className="text-right" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {memberships.map((membership) => {
          const buttons = <></>; // TODO

          return (
            <TableRow key={membership.userId}>
              <TableCell className="text-left">
                {membership.user.username}
              </TableCell>
              <TableCell className="text-center">
                {membership.user.email}
              </TableCell>
              <TableCell className="text-center">
                {format(membership.joinedAt, "yyyy-MM-dd, HH:mm")}
              </TableCell>
              <TableCell className="flex justify-center">
                {membership.user.emailVerified ? (
                  <LucideCheck />
                ) : (
                  <LucideBan />
                )}
              </TableCell>
              <TableCell className="text-right">{buttons}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
    // </div>
  );
};

export { MembershipList };
