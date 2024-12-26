"use client";

import { LucidePencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CardCompact } from "@/components/card-compact";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { commentEditPath } from "@/paths";
import { getComments } from "../queries/get-comments";
import { CommentWithMetadata } from "../types";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";
import { CommentUpsertForm } from "./comment-upsert-form";

type CommentsProps = {
  ticketId: string;
  paginatedComments: {
    list: CommentWithMetadata[];
    metadata: { count: number; hasNextPage: boolean };
  };
};

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const [comments, setComments] = useState(paginatedComments.list);

  const handleMore = async () => {
    const morePaginatedComments = await getComments(ticketId);
    const moreComments = morePaginatedComments.list;

    setComments([...comments, ...moreComments]);
  };

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentUpsertForm ticketId={ticketId} />}
      />
      <div className="ml-8 flex flex-col gap-y-2">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [<CommentDeleteButton key="0" id={comment.id} />]
                : []),
              ...(comment.isOwner
                ? [
                    <Link
                      key="1"
                      href={commentEditPath(ticketId, comment.id)}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "icon" }),
                      )}
                    >
                      <LucidePencil />
                    </Link>,
                  ]
                : []),
            ]}
          />
        ))}
      </div>

      <div className="ml-8 flex flex-col justify-center">
        <Button variant={"ghost"} onClick={handleMore}>
          More
        </Button>
      </div>
    </>
  );
};

export { Comments };
