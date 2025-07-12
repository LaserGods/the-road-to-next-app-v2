"use client";

import { LucideLoaderCircle, LucideLogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
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
      {deleteButton}
      {deleteDialog}
    </>
  );
};

export { MembershipDeleteButton };
