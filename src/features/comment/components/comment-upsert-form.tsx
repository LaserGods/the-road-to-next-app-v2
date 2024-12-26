"use client";

import { Comment } from "@prisma/client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";
import { upsertComment } from "../actions/upsert-comment";
import { CommentWithMetadata } from "../types";

type CommentUpsertFormProps = {
  ticketId: string;
  comment?: Comment;
  onCreateComment?: (comment: CommentWithMetadata | undefined) => void;
};

const CommentUpsertForm = ({
  ticketId,
  comment,
  onCreateComment,
}: CommentUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertComment.bind(null, ticketId, comment?.id),
    EMPTY_ACTION_STATE,
  );

  const handleSuccess = (
    actionState: ActionState<CommentWithMetadata | undefined>,
  ) => {
    onCreateComment?.(actionState.data);
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Textarea
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? comment?.content
        }
        placeholder="What's on your mind ..."
      />
      <FieldError actionState={actionState} name="content" />

      <SubmitButton label={comment ? "Edit" : "Comment"} />
    </Form>
  );
};

export { CommentUpsertForm };
