import { Attachment } from "@/lib/generated/prisma/client";
import { AttachmentItem } from "./attachment-item";

type AttachmentListProps = {
  attachments: Attachment[];
  // Using a render prop to pass in the buttons
  buttons: (id: string) => React.ReactNode[];
};

const AttachmentList = ({ attachments, buttons }: AttachmentListProps) => {
  return (
    <div className="mx-2 mb-4 flex flex-col gap-y-2">
      {attachments.map((attachment) => (
        <AttachmentItem
          key={attachment.id}
          attachment={attachment}
          buttons={buttons(attachment.id)}
        />
      ))}
    </div>
  );
};

export { AttachmentList };
