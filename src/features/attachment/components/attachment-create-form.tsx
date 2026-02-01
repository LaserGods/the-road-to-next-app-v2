"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AttachmentEntity } from "@/lib/generated/prisma/enums";
import { createAttachments } from "../actions/create-attachments";
import { ACCEPTED } from "../constants";

type AttachmentCreateFormProps = {
  entityId: string;
  entity: AttachmentEntity;
};

const AttachmentCreateForm = ({ entityId, entity }: AttachmentCreateFormProps) => {
  const [actionState, action] = useActionState(
    createAttachments.bind(null, { entityId, entity }),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Field>
        <FieldLabel htmlFor="files">Upload Files</FieldLabel>
        <Input
          type="file"
          name="files"
          id="files"
          multiple
          accept={ACCEPTED.join(",")}
        />
        <FieldError name="files" actionState={actionState} />
        <SubmitButton label="Upload" />
      </Field>
    </Form>
  );
};

export { AttachmentCreateForm };
