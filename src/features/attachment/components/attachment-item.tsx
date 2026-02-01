import { LucideFile } from "lucide-react";
import Link from "next/link";
import { Attachment } from "@/lib/generated/prisma/client";
import { attachmentDownloadPath } from "@/paths";

type AttachmentItemProps = {
  attachment: Attachment;
  buttons: React.ReactNode[];
};

const AttachmentItem = ({ attachment, buttons }: AttachmentItemProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <Link
        href={attachmentDownloadPath(attachment.id)}
        className="flex items-center gap-x-2 truncate text-sm"
      >
        <LucideFile className="size-4 shrink-0" />
        <span className="text-muted-foreground">{attachment.name}</span>
      </Link>
      {buttons}
    </div>
  );
};

export { AttachmentItem };
