"use client";

import { LucideMessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions/create-comment";

type CommentCreateFormProps = {
  ticketId: string;
};

const CommentCreateForm = ({ ticketId }: CommentCreateFormProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE,
  );
  const router = useRouter();

  return (
    <>
      <Form action={action} actionState={actionState}>
        <Textarea name="content" placeholder="Add a comment..." />
        <FieldError actionState={actionState} name="content" />
        <div className="w-1/4">
          <Button size="sm" onClick={() => router.refresh()}>
            Comment
            <LucideMessageCircle className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Form>
    </>
  );
};

export { CommentCreateForm };
