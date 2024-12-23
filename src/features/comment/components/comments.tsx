import { LucidePencil } from "lucide-react";
import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import { buttonVariants } from "@/components/ui/button";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { cn } from "@/lib/utils";
import { commentEditPath } from "@/paths";
import { getComments } from "../queries/get-comments";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";
import { CommentUpsertForm } from "./comment-upsert-form";

type CommentsProps = {
  ticketId: string;
};

const Comments = async ({ ticketId }: CommentsProps) => {
  const comments = await getComments(ticketId);
  const { user } = await getAuth();

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentUpsertForm ticketId={ticketId} />}
      />
      <div className="ml-8 flex flex-col gap-y-2">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(isOwner(user, comment)
                ? [<CommentDeleteButton key="0" id={comment.id} />]
                : []),
              ...(isOwner(user, comment)
                ? [
                    <Link
                      key="1"
                      href={commentEditPath(ticketId, comment.id)}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "icon" }),
                      )}
                    >
                      <LucidePencil />
                    </Link>,
                  ]
                : []),
            ]}
          />
        ))}
      </div>
    </>
  );
};

export { Comments };
