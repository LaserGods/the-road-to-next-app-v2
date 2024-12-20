import { LucidePencil } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { cn } from "@/lib/utils";
import { commentEditPath } from "@/paths";
import { CommentWithMetadata } from "../types";
import { CommentDeleteButton } from "./comment-delete-button";

type CommentItemProps = {
  comment: CommentWithMetadata;
  isDetail?: boolean;
};

const CommentItem = async ({ comment, isDetail }: CommentItemProps) => {
  const { user } = await getAuthOrRedirect();
  const isCommentOwner = isOwner(user, comment);

  const timeSince = () => {
    const CommentUpsertUnixDate = comment.createdAt.getTime() / 1000;
    const commentUpdateUnixDate = comment.updatedAt.getTime() / 1000;

    const compareCreateUpdateDate = () => {
      if (CommentUpsertUnixDate > commentUpdateUnixDate) {
        return CommentUpsertUnixDate;
      } else {
        return commentUpdateUnixDate;
      }
    };

    const nowUnixDate = new Date().getTime() / 1000;

    const seconds = Math.floor((nowUnixDate - compareCreateUpdateDate()) / 1);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}min`;
    } else {
      return "just now";
    }
  };

  const editButton = isCommentOwner ? (
    <Link
      prefetch
      href={commentEditPath(comment.ticketId, comment.id)}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "h-4 w-4 p-3 [&_svg]:size-4",
      )}
    >
      <LucidePencil />
    </Link>
  ) : null;

  const deleteButton =
    isCommentOwner && isDetail ? <CommentDeleteButton id={comment.id} /> : null;

  return (
    <>
      <div className="flex w-full flex-col gap-y-1 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-1.5">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {comment.user ? comment.user.username[0].toUpperCase() : "?"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">
              {comment.user ? comment.user.username : "user deleted"}
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            {editButton}
            {deleteButton}
            <span className="text-sm text-muted-foreground">{timeSince()}</span>
          </div>
        </div>
        <p className="whitespace-pre-line text-pretty pt-1 text-sm">
          {comment.content}
        </p>
      </div>
    </>
  );
};

export { CommentItem };
