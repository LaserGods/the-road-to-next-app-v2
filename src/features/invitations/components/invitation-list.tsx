import { format } from "date-fns";
import { LucideTrash } from "lucide-react";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInvitations } from "../queries/get-invitations";

type InvitationListProps = {
  organizationId: string;
};

const InvitationList = async ({ organizationId }: InvitationListProps) => {
  const invitations = await getInvitations(organizationId);

  if (!invitations.length) {
    return <Placeholder label="No invitations for this organization yet." />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Invited At</TableHead>
          <TableHead className="text-center">Invited By</TableHead>
          <TableHead className="text-right" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {invitations.map(async (invitation) => {
          const deleteButton = (
            <Button variant="destructive" size="icon">
              <LucideTrash className="size-4" />
            </Button>
          );

          const buttons = <>{deleteButton}</>;

          return (
            <TableRow key={invitation.email} className="font-mono">
              <TableCell className="text-left">{invitation.email}</TableCell>
              <TableCell className="text-center">
                {format(invitation.createdAt, "yyyy-MM-dd, HH:mm")}
              </TableCell>
              <TableCell className="text-center">
                {invitation.invitedByUser
                  ? `${invitation.invitedByUser.username} (${invitation.invitedByUser.email})`
                  : "Deleted User"}
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

export { InvitationList };
