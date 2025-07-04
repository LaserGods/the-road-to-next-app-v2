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
          <TableHead className="text-right" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {memberships.organizationMemberships.map((membership) => {
          const buttons = <></>; // TODO

          return (
            <TableRow key={membership.userId}>
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
              <TableCell className="text-right">{buttons}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export { MembershipList };
