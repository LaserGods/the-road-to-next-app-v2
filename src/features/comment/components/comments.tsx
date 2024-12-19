import { getComments } from "../queries/get-comments";
import { CommentItem } from "./comment-item";

type CommentsProps = {
  ticketId: string;
  isDetail?: boolean;
};

const Comments = async ({ ticketId, isDetail }: CommentsProps) => {
  const comments = await getComments(ticketId);

  return (
    <>
      {comments.map((comment) =>
        isDetail ? (
          <CommentItem key={comment.id} comment={comment} isDetail />
        ) : (
          <CommentItem key={comment.id} comment={comment} />
        ),
      )}
    </>
  );
};

export { Comments };
