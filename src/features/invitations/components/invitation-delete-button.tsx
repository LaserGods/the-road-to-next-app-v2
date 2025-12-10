"use client";

import { LucideLoaderCircle, LucideTrash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { usePermissions } from "@/features/permission/hooks/use-permissions";
import { deleteInvitation } from "../actions/delete-invitation";

type InvitationDeleteButtonProps = {
  email: string;
  organizationId: string;
};

const InvitationDeleteButton = ({
  email,
  organizationId,
}: InvitationDeleteButtonProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const { hasPermission, isLoading } = usePermissions({
    userId: user?.id,
    organizationId,
  });

  const canDeleteInvitation = hasPermission("invitation:delete");

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteInvitation.bind(null, { email, organizationId }),
    trigger: (isPending) => (
      <Button variant="destructive" size="icon" disabled={!canDeleteInvitation}>
        {isPending || isLoading ? (
          <LucideLoaderCircle className="size-4 animate-spin" />
        ) : (
          <LucideTrash className="size-4" />
        )}
      </Button>
    ),
    onSuccess: () => {
      router.refresh();
    },
  });

  if (!canDeleteInvitation) {
    return (
      <Tooltip>
        <TooltipTrigger>
          <div className="bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60pointer-events-none inline-flex size-9 shrink-0 items-center justify-center gap-2 rounded-md border text-sm font-medium whitespace-nowrap text-white opacity-50 shadow-xs transition-all outline-none focus-visible:ring-[3px] [&_svg]:shrink-0">
            <LucideTrash className="size-4" />
          </div>
        </TooltipTrigger>
        <TooltipContent
          variant="outline"
          typography="mono"
          arrowVariant="outlineArrow"
        >
          <span>Insufficient permissions</span>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>{deleteButton}</TooltipTrigger>
        <TooltipContent
          variant="destructive"
          typography="mono"
          arrowVariant="destructiveArrow"
        >
          <span className="font-medium">Delete invitation</span>
        </TooltipContent>
      </Tooltip>
      {deleteDialog}
    </>
  );
};

export { InvitationDeleteButton };
