import { notFound } from "next/navigation";
import { CardCompact } from "@/components/card-compact";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { CommentUpsertForm } from "@/features/comment/components/comment-upsert-form";
import { getComment } from "@/features/comment/queries/get-comment";

type CommentEditPageProps = {
  params: Promise<{
    commentId: string;
  }>;
};

const CommentEditPage = async ({ params }: CommentEditPageProps) => {
  const { user } = await getAuth();
  const { commentId } = await params;
  const comment = await getComment(commentId);

  const isCommentFound = !!comment;
  const isCommentOwner = isOwner(user, comment);

  if (!isCommentFound || !isCommentOwner) {
    return notFound();
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Edit Comment"
        description="Edit your comment"
        className="w-full max-w-420 animate-fade-from-top"
        content={
          <CommentUpsertForm ticketId={comment.ticketId} comment={comment} />
        }
      />
    </div>
  );
};

export default CommentEditPage;
