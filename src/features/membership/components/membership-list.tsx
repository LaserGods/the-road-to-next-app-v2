import { format } from "date-fns";
import { LucideBan, LucideCheck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getMemberships } from "../queries/get-memberships";
import { MembershipDeleteButton } from "./membership-delete-button";
import { MembershipMoreMenu } from "./membership-more-menu";

type MembershipListProps = {
  organizationId: string;
};

const MembershipList = async ({ organizationId }: MembershipListProps) => {
  const memberships = await getMemberships(organizationId);

  if (!memberships.currentUser) {
    return null;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Username</TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Joined At</TableHead>
          <TableHead className="text-center">Email Verified</TableHead>
          <TableHead className="text-center">Role</TableHead>
          <TableHead className="text-right" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {memberships.organizationMemberships.map((membership) => {
          const membershipMoreMenu = (
            <MembershipMoreMenu
              userId={membership.userId}
              organizationId={organizationId}
              membershipRole={membership.membershipRole}
            />
          );

          const deleteButton = (
            <MembershipDeleteButton
              organizationId={organizationId}
              userId={membership.userId}
            />
          );
          const buttons = (
            <>
              {membershipMoreMenu}
              {deleteButton}
            </>
          );

          return (
            <TableRow key={membership.userId} className="font-mono">
              <TableCell className="text-left">
                {memberships.currentUser.user.id === membership.userId ? (
                  <>
                    <Tooltip>
                      <TooltipTrigger>
                        {membership.user.username}{" "}
                      </TooltipTrigger>
                      <TooltipContent
                        variant={"outline"}
                        intent={"outlineArrow"}
                      >
                        <span className="font-medium">That&apos;s you!</span>
                      </TooltipContent>
                    </Tooltip>
                    <span className="text-muted-foreground pl-1.5 font-light italic">
                      (you)
                    </span>
                  </>
                ) : (
                  membership.user.username
                )}
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
              <TableCell className="w-28 text-center">
                {membership.membershipRole}
              </TableCell>
              <TableCell className="flex items-center justify-end space-x-2">
                {buttons}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export { MembershipList };
