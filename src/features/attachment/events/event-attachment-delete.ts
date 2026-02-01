import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/aws";
import { AttachmentEntity } from "@/lib/generated/prisma/enums";
import { inngest } from "@/lib/inngest";
import { generateS3Key } from "../utils/generate-s3-key";

export type AttachmentDeleteEventArgs = {
  data: {
    organizationId: string;
    entityId: string;
    entity: AttachmentEntity;
    fileName: string;
    attachmentId: string;
  };
};

export const attachmentDeleteEvent = inngest.createFunction(
  { id: "attachment-deleted" },
  { event: "app/attachment.deleted" },
  async ({ event }) => {
    const { organizationId, entityId, entity, fileName, attachmentId } =
      event.data;

    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: generateS3Key({
            organizationId,
            entityId,
            entity,
            fileName,
            attachmentId,
          }),
        }),
      );
    } catch (error) {
      console.log(error);
      return { event, body: false };
    }

    return { event, body: true };
  },
);
