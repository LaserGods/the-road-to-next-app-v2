import { usePaginated } from "@/hooks/use-paginated";
import { PaginatedData } from "@/types/pagination";
import { getComments } from "../../queries/get-comments";
import { CommentWithMetadata } from "../../types";

export const usePaginatedComments = (
  ticketId: string,
  paginatedComments: PaginatedData<CommentWithMetadata>,
) => {
  const result = usePaginated(
    "comments",
    ticketId,
    getComments,
    paginatedComments,
  );

  return {
    comments: result.flattenedData,
    fetchNextPage: result.fetchNextPage,
    hasNextPage: result.hasNextPage,
    isFetchingNextPage: result.isFetchingNextPage,
    onDeleteComment: result.onDelete,
    onCreateComment: result.onCreate,
  };
};
