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
import { loadEffectivePermissions } from "@/features/permission/utils/load-effective-permissions";
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

  // Load permissions for current user and all members in parallel
  // This permission check is only for UI purposes
  // DB queries and server actions also enforce permission checks
  const [currentUserPermissionsMap, ...memberPermissionsMaps] =
    await Promise.all([
      loadEffectivePermissions(memberships.currentUser.user.id, organizationId),
      ...memberships.organizationMemberships.map((membership) =>
        loadEffectivePermissions(membership.userId, organizationId),
      ),
    ]);

  const currentUserPermissions = Object.fromEntries(currentUserPermissionsMap);
  const canUpdateMembership =
    currentUserPermissions["membership:update"] ?? false;
  const canDeleteMembership =
    currentUserPermissions["membership:delete"] ?? false;

  const membershipWithPermissions = memberships.organizationMemberships.map(
    (membership, index) => ({
      ...membership,
      permissions: Object.fromEntries(memberPermissionsMaps[index]),
    }),
  );

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
        {membershipWithPermissions.map((membership) => {
          const membershipMoreMenu = (
            <MembershipMoreMenu
              userId={membership.userId}
              organizationId={organizationId}
              membershipRole={membership.membershipRole}
              permissions={membership.permissions}
            />
          );

          const deleteButton = (
            <MembershipDeleteButton
              organizationId={organizationId}
              userId={membership.userId}
            />
          );

          const placeholder = (
            <Tooltip delayDuration={50}>
              <TooltipTrigger asChild>
                <div className="focus-visible:border-ring focus-visible:ring-ring/50 size-9 rounded-md bg-linear-[135deg,hsla(210,40%,96.1%,0.45),hsla(210,40%,96.1%,0.15)] outline-none focus-visible:ring-[3px]" />
              </TooltipTrigger>
              <TooltipContent
                variant={"outline"}
                typography={"mono"}
                arrowVariant={"outlineArrow"}
              >
                <span>Insufficient permissions</span>
              </TooltipContent>
            </Tooltip>
          );

          const buttons = (
            <>
              {canUpdateMembership ? membershipMoreMenu : placeholder}
              {canDeleteMembership ? deleteButton : placeholder}
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
                        arrowVariant={"outlineArrow"}
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
