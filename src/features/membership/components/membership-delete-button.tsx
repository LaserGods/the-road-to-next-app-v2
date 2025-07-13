"use client";

import { LucideLoaderCircle, LucideLogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteMembership } from "../actions/delete-membership";

type MembershipDeleteButtonProps = {
  organizationId: string;
  userId: string;
};

const MembershipDeleteButton = ({
  organizationId,
  userId,
}: MembershipDeleteButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isOrganizationPath = pathname === "/organization";

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteMembership.bind(null, { organizationId, userId }),
    trigger: (isPending) => (
      <Button variant={"destructive"} size={"icon"}>
        {isPending ? (
          <LucideLoaderCircle className="size-4 animate-spin" />
        ) : (
          <LucideLogOut className="size-4" />
        )}
      </Button>
    ),
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>{deleteButton}</TooltipTrigger>
        <TooltipContent variant={"destructive"} intent={"destructiveArrow"}>
          {isOrganizationPath ? (
            <span className="font-medium">Leave Organization</span>
          ) : (
            <span className="font-medium">Delete Member</span>
          )}
        </TooltipContent>
      </Tooltip>
      {deleteDialog}
    </>
  );
};

export { MembershipDeleteButton };
