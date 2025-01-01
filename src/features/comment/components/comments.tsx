"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { LucidePencil } from "lucide-react";
import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { commentEditPath } from "@/paths";
import { PaginatedData } from "@/types/pagination";
import { getComments } from "../queries/get-comments";
import { CommentWithMetadata } from "../types";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";
import { CommentUpsertForm } from "./comment-upsert-form";

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["comments", ticketId],
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    });

  const comments = data.pages.flatMap((page) => page.list);

  const handleMore = async () => fetchNextPage();

  const handleDeleteComment = () => refetch();

  const handleCreateComment = () => refetch();

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={
          <CommentUpsertForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
      />
      <div className="ml-8 flex flex-col gap-y-2">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key="0"
                      id={comment.id}
                      onDeleteComment={handleDeleteComment}
                    />,
                  ]
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
        {hasNextPage && (
          <Button
            variant={"ghost"}
            onClick={handleMore}
            disabled={isFetchingNextPage}
          >
            More
          </Button>
        )}
      </div>
    </>
  );
};

export { Comments };
