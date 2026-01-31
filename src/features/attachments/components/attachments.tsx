import { CardCompact } from "@/components/card-compact";
import { AttachmentEntity } from "@/lib/generated/prisma/enums";
import { getAttachments } from "../queries/get-attachments";
import { AttachmentCreateForm } from "./attachment-create-form";
import { AttachmentList } from "./attachment-list";

type AttachmentsProps = {
  entityId: string;
  entity: AttachmentEntity;
  isOwner: boolean;
};

const Attachments = async ({ entityId, entity, isOwner }: AttachmentsProps) => {
  const attachments = await getAttachments(entityId, entity);
  return (
    <CardCompact
      title="Attachments"
      description="Attach images or PDFs"
      content={
        <>
          <AttachmentList attachments={attachments} />
          {isOwner && (
            <AttachmentCreateForm entityId={entityId} entity={entity} />
          )}
        </>
      }
    />
  );
};

export { Attachments };
