"use client";

import { LucideLoaderCircle, LucideTrash } from "lucide-react";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { deleteOrganization } from "../actions/delete-organization";
type OrganizationDeleteButtonProps = {
  organizationId: string;
};

const OrganizationDeleteButton = ({
  organizationId,
}: OrganizationDeleteButtonProps) => {
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
  });

  return (
    <>
      {deleteButton}
      {deleteDialog}
    </>
  );
};

export { OrganizationDeleteButton };
