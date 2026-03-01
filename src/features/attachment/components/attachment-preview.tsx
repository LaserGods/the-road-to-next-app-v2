"use client";

import { LucideFileText, LucideX } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { IMAGE_TYPES } from "../constants";

type AttachmentPreviewProps = {
  files: File[];
  onRemove: (index: number) => void;
};

type PreviewItem =
  | { type: "image"; name: string; url: string }
  | { type: "non-image"; name: string };

const isImageFile = (file: File): boolean => {
  return IMAGE_TYPES.includes(file.type);
};

const AttachmentPreview = ({ files, onRemove }: AttachmentPreviewProps) => {
  const previews = useMemo<PreviewItem[]>(() => {
    return files.map((file) => {
      if (isImageFile(file)) {
        return {
          type: "image",
          name: file.name,
          url: URL.createObjectURL(file),
        };
      }

      return { type: "non-image", name: file.name };
    });
  }, [files]);

  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        if (preview.type === "image") {
          URL.revokeObjectURL(preview.url);
        }
      });
    };
  }, [previews]);

  const handleRemove = (index: number) => {
    onRemove(index);
  };

  if (files.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-3">
      {previews.map((preview, index) => (
        <li
          key={`${preview.name}-${index}`}
          className="relative flex size-40 items-center justify-center rounded-md border"
        >
          {preview.type === "image" ? (
            <div className="relative size-full overflow-hidden rounded-md">
              <Image
                src={preview.url}
                alt={preview.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="text-muted-foreground flex size-full flex-col items-center justify-center gap-y-1.5 overflow-hidden rounded-md px-1">
              <LucideFileText className="size-8" />
              <span className="line-clamp-3 text-center font-mono text-xs text-balance">
                Preview not available
              </span>
            </div>
          )}
          <Button
            aria-label="Remove"
            variant="default"
            size="icon-xs"
            className="absolute -top-2 -right-2 z-10"
            onClick={() => handleRemove(index)}
          >
            <LucideX className="size-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </li>
      ))}
    </ul>
  );
};

export { AttachmentPreview };
