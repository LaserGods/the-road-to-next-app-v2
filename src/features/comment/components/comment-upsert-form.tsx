"use client";

import { Comment } from "@prisma/client";
import { LucideMessageCircle } from "lucide-react";
import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";
import { upsertComment } from "../actions/upsert-comment";

type CommentUpsertFormProps = {
  ticketId: string;
  comment?: Comment;
};

const CommentUpsertForm = ({ ticketId, comment }: CommentUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertComment.bind(null, ticketId, comment?.id),
    EMPTY_ACTION_STATE,
  );

  return (
    <>
      <Form action={action} actionState={actionState}>
        <Textarea
          id="content"
          name="content"
          defaultValue={
            (actionState.payload?.get("content") as string) ?? comment?.content
          }
        />
        <FieldError actionState={actionState} name="content" />
        <div className="w-1/4">
          <SubmitButton
            label={comment ? "Edit" : "Comment"}
            icon={<LucideMessageCircle />}
          />
        </div>
      </Form>
    </>
  );
};

export { CommentUpsertForm };