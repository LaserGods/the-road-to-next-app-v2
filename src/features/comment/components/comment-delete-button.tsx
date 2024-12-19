"use client";

import { LucideTrash } from "lucide-react";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { deleteComment } from "../actions/delete-comment";

type CommentMoreMenuProps = {
  id: string;
};

const CommentDeleteButton = ({ id }: CommentMoreMenuProps) => {
  // const { user } = await getAuthOrRedirect();
  // const isCommentOwner = isOwner(user, comment);

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, id),
    trigger: (
      <Button variant="ghost" className="h-4 w-4 p-3 [&_svg]:size-4">
        <LucideTrash />
      </Button>
    ),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export { CommentDeleteButton };
