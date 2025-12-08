"use client";

import { LucideUserCog } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PermissionCheckboxGroup } from "@/features/permission/components/permission-checkbox";
import { MembershipRole } from "@/lib/generated/prisma/enums";
import { updateMembershipRole } from "../actions/update-membership-role";

type MembershipMoreMenuProps = {
  userId: string;
  organizationId: string;
  membershipRole: MembershipRole;
  permissions: Record<string, boolean>;
};

const MembershipMoreMenu = ({
  userId,
  organizationId,
  membershipRole,
  permissions,
}: MembershipMoreMenuProps) => {
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false);
  const handleUpdateMembershipRole = async (value: string) => {
    const promise = updateMembershipRole({
      userId,
      organizationId,
      membershipRole: value as MembershipRole,
    });

    toast.promise(promise, {
      loading: "Updating role...",
    });

    const result = await promise;

    if (result.status === "ERROR") {
      toast.error(result.message);
    } else {
      toast.success("Membership role updated successfully");
    }
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            <LucideUserCog className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Roles</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={membershipRole}
            onValueChange={handleUpdateMembershipRole}
          >
            <DropdownMenuRadioItem value="ADMIN">Admin</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="MEMBER">Member</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setShowPermissionsDialog(true)}>
            Customize Permissions...
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={showPermissionsDialog}
        onOpenChange={setShowPermissionsDialog}
      >
        <DialogContent className="max-h-[80vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Permissions</DialogTitle>
            <DialogDescription>
              Customize the permissions for this user.
            </DialogDescription>
          </DialogHeader>
          <PermissionCheckboxGroup
            userId={userId}
            organizationId={organizationId}
            permissions={permissions}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export { MembershipMoreMenu };
