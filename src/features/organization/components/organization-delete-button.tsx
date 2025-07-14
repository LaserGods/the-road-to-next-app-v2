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
import { deleteOrganization } from "../actions/delete-organization";

type OrganizationDeleteButtonProps = {
  organizationId: string;
};

const OrganizationDeleteButton = ({
  organizationId,
}: OrganizationDeleteButtonProps) => {
  const router = useRouter();
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteOrganization.bind(null, organizationId),
    trigger: (isPending) => (
      <Button variant={"destructive"} size={"icon"}>
        {isPending ? (
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

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>{deleteButton}</TooltipTrigger>
        <TooltipContent
          variant={"destructive"}
          typography={"mono"}
          intent={"destructiveArrow"}
        >
          <span className="font-medium">Delete organization</span>
        </TooltipContent>
      </Tooltip>
      {deleteDialog}
    </>
  );
};

export { OrganizationDeleteButton };
