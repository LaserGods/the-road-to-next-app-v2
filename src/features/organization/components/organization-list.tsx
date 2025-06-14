import { format } from "date-fns";
import {
  LucideArrowLeftRight,
  LucideArrowUpRightFromSquare,
  LucidePen,
  LucideTrash,
} from "lucide-react";
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
import { getOrganizationsByUser } from "../queries/get-organizations-by-user";
import { OrganizationSwitchButton } from "./organization-switch-button";

const OrganizationList = async () => {
  const organizations = await getOrganizationsByUser();

  const hasActive = organizations.some((org) => org.membershipsByUser.isActive);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Joined At</TableHead>
          <TableHead className="text-center">Members</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations.map((org) => {
          const isActive = org.membershipsByUser.isActive;

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
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                  <LucideArrowUpRightFromSquare className="size-4" />
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
            <Tooltip delayDuration={500}>
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

          const deleteButton = (
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <Button variant={"destructive"} size={"icon"}>
                  <LucideTrash className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                variant={"destructive"}
                typography={"mono"}
                intent={"destructiveArrow"}
              >
                <p>Delete organization</p>
              </TooltipContent>
            </Tooltip>
          );

          const actionButtons = (
            <>
              {switchButton}
              {detailButton}
              {editButton}
              {deleteButton}
            </>
          );
          return (
            <TableRow key={org.id}>
              <TableCell className="font-mono">{org.id}</TableCell>
              <TableCell className="text-center font-mono">
                {org.name}
              </TableCell>
              <TableCell className="text-center font-mono">
                {format(org.membershipsByUser.joinedAt, "yyyy-MM-dd, HH:mm")}
              </TableCell>
              <TableCell className="text-center font-mono">
                {org._count.memberships}
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
