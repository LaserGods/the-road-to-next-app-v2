import { LucideFile } from "lucide-react";
import { Attachment } from "@/lib/generated/prisma/client";

type AttachmentItemProps = {
  attachment: Attachment;
  // buttons: React.ReactNode[];
};

const AttachmentItem = ({ attachment }: AttachmentItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <LucideFile className="size-4" />
        <span className="text-muted-foreground text-sm">{attachment.name}</span>
      </div>
    </div>
  );
};

export { AttachmentItem };
