import { getComments } from "../queries/get-comments";
import { CommentItem } from "./comment-item";

type CommentsProps = {
  ticketId: string;
};

const Comments = async ({ ticketId }: CommentsProps) => {
  const comments = await getComments(ticketId);

  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export { Comments };
