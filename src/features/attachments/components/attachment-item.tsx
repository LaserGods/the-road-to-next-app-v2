import { LucideFile } from "lucide-react";
import { Attachment } from "@/lib/generated/prisma/client";

type AttachmentItemProps = {
  attachment: Attachment;
  buttons: React.ReactNode[];
};

const AttachmentItem = ({ attachment, buttons }: AttachmentItemProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-x-2 truncate text-sm">
        <LucideFile className="size-4 shrink-0" />
        <span className="text-muted-foreground">{attachment.name}</span>
      </div>
      {buttons}
    </div>
  );
};

export { AttachmentItem };
