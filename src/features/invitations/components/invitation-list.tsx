import { format } from "date-fns";
import { Placeholder } from "@/components/placeholder";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInvitations } from "../queries/get-invitations";
import { InvitationDeleteButton } from "./invitation-delete-button";

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
          <TableHead>Email</TableHead>
          <TableHead className="text-center">Invited At</TableHead>
          <TableHead className="text-center">Invited By</TableHead>
          <TableHead className="text-right" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {invitations.map((invitation) => {
          const deleteButton = (
            <InvitationDeleteButton
              email={invitation.email}
              organizationId={organizationId}
            />
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
