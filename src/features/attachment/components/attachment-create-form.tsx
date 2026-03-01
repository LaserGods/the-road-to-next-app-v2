"use client";

import { useActionState, useRef, useState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AttachmentEntity } from "@/lib/generated/prisma/enums";
import { createAttachments } from "../actions/create-attachments";
import { ACCEPTED } from "../constants";
import { AttachmentPreview } from "./attachment-preview";

type AttachmentCreateFormProps = {
  entityId: string;
  entity: AttachmentEntity;
};

const AttachmentCreateForm = ({
  entityId,
  entity,
}: AttachmentCreateFormProps) => {
  const [actionState, action] = useActionState(
    createAttachments.bind(null, { entityId, entity }),
    EMPTY_ACTION_STATE,
  );

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files ? Array.from(files) : []);
  };

  const handleRemove = (index: number) => {
    const nextFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(nextFiles);

    const dataTransfer = new DataTransfer();
    nextFiles.forEach((file) => dataTransfer.items.add(file));

    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const handleSuccess = () => {
    setSelectedFiles([]);
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Field>
        <FieldLabel htmlFor="files">Upload Files</FieldLabel>
        <Input
          type="file"
          name="files"
          id="files"
          multiple
          accept={ACCEPTED.join(",")}
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <FieldError name="files" actionState={actionState} />
        <AttachmentPreview files={selectedFiles} onRemove={handleRemove} />
        <SubmitButton label="Upload" />
      </Field>
    </Form>
  );
};

export { AttachmentCreateForm };
