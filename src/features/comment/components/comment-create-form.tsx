"use client";

import { Form } from "@/components/form/form";
import { createComment } from "../actions/create-comment";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/form/submit-button";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { LucideMessageCircle } from "lucide-react";

type CommentCreateFormProps = {
  ticketId: string;
};

const CommentCreateForm = ({ ticketId }: CommentCreateFormProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Textarea name="content" placeholder="Add a comment..." />

      {/* <div className="w-1/4"></div> */}
      <div className="w-1/4">
        <SubmitButton label="Comment" icon={<LucideMessageCircle />} />
      </div>
    </Form>
  );
};

export { CommentCreateForm };
