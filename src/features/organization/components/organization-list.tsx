import { format } from "date-fns";
import {
  LucideArrowLeftRight,
  LucideArrowUpRightFromSquare,
  LucidePen,
  LucideTrash,
} from "lucide-react";
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

const OrganizationList = async () => {
  const organizations = await getOrganizationsByUser();

  const switchButton = (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <LucideArrowLeftRight className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent
        variant={"outline"}
        typography={"mono"}
        intent={"outlineArrow"}
      >
        <p>Switch organization</p>
      </TooltipContent>
    </Tooltip>
  );

  const detailButton = (
    <Tooltip>
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
    <Tooltip>
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
    <Tooltip>
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
        {organizations.map((org) => (
          <TableRow key={org.id}>
            <TableCell className="font-mono">{org.id}</TableCell>
            <TableCell className="text-center font-medium">
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
        ))}
      </TableBody>
    </Table>
  );
};

export { OrganizationList };
