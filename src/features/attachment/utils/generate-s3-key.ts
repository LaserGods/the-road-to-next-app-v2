import { AttachmentEntity } from "@/lib/generated/prisma/enums";

type GenerateKeyArgs = {
  organizationId: string;
  entityId: string;
  entity: AttachmentEntity;
  fileName: string;
  attachmentId: string;
};

export const generateS3Key = ({
  organizationId,
  entityId,
  entity,
  fileName,
  attachmentId,
}: GenerateKeyArgs) => {
  return `${organizationId}/${entity}/${entityId}/${fileName}-${attachmentId}`;
};
