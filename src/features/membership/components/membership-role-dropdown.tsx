"use client";

import { LucideMoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MembershipRole } from "@/lib/generated/prisma/enums";
import { updateMembershipRole } from "../actions/update-membership-role";

type MembershipRoleDropdownProps = {
  userId: string;
  organizationId: string;
  membershipRole: MembershipRole;
};

const MembershipRoleDropdown = ({
  userId,
  organizationId,
  membershipRole,
}: MembershipRoleDropdownProps) => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          {membershipRole}
          <LucideMoreHorizontal className="size-4" />
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { MembershipRoleDropdown };
