import { format } from "date-fns";
import {
  LucideArrowLeftRight,
  LucideArrowUpRightFromSquare,
  LucidePen,
} from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "@/components/form/submit-button";
import { Button } from "@/components/ui/button";
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
import { MembershipDeleteButton } from "@/features/membership/components/membership-delete-button";
import { membershipsPath } from "@/paths";
import { getOrganizationsByUser } from "../queries/get-organizations-by-user";
import { OrganizationDeleteButton } from "./organization-delete-button";
import { OrganizationSwitchButton } from "./organization-switch-button";

type OrganizationListProps = {
  limitedAccess?: boolean;
};

const OrganizationList = async ({ limitedAccess }: OrganizationListProps) => {
  const organizations = await getOrganizationsByUser();

  const hasActive = organizations.some((org) => org.membershipByUser.isActive);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Joined At</TableHead>
          <TableHead className="text-center">Members</TableHead>
          <TableHead className="text-center">My Role</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations.map((org) => {
          const isActive = org.membershipByUser.isActive;
          const isAdmin = org.membershipByUser.membershipRole === "ADMIN";

          const switchButton = (
            <OrganizationSwitchButton
              organizationId={org.id}
              trigger={
                <SubmitButton
                  icon={<LucideArrowLeftRight className="size-4" />}
                  label={
                    !hasActive ? "Activate" : isActive ? "Active" : "Switch"
                  }
                  variant={
                    !hasActive ? "secondary" : isActive ? "default" : "outline"
                  }
                />
              }
            />
          );

          const detailButton = (
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button variant={"outline"} size={"icon"} asChild>
                  <Link href={membershipsPath(org.id)}>
                    <LucideArrowUpRightFromSquare className="size-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent
                variant={"outline"}
                typography={"mono"}
                intent={"outlineArrow"}
              >
                <p>Organization details</p>
              </TooltipContent>
            </Tooltip>
          );

          const editButton = (
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                  <LucidePen className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                variant={"outline"}
                typography={"mono"}
                intent={"outlineArrow"}
              >
                <p>Edit organization</p>
              </TooltipContent>
            </Tooltip>
          );

          const leaveButton = (
            <MembershipDeleteButton
              organizationId={org.id}
              userId={org.membershipByUser.userId}
            />
          );

          const deleteButton = (
            <OrganizationDeleteButton organizationId={org.id} />
          );

          const placeholder = (
            <Button size={"icon"} disabled className="disabled:opacity-0" />
          );

          const actionButtons = (
            <>
              {switchButton}
              {limitedAccess ? null : isAdmin ? detailButton : placeholder}
              {limitedAccess ? null : isAdmin ? editButton : placeholder}
              {limitedAccess ? null : leaveButton}
              {limitedAccess ? null : isAdmin ? deleteButton : placeholder}
            </>
          );
          return (
            <TableRow key={org.id} className="font-mono">
              <TableCell>{org.id}</TableCell>
              <TableCell className="text-center">{org.name}</TableCell>
              <TableCell className="text-center">
                {format(org.membershipByUser.joinedAt, "yyyy-MM-dd, HH:mm")}
              </TableCell>
              <TableCell className="text-center">
                {org._count.memberships}
              </TableCell>
              <TableCell className="text-center">
                {org.membershipByUser.membershipRole}
              </TableCell>
              <TableCell className="flex items-center justify-end gap-x-2">
                {actionButtons}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export { OrganizationList };
