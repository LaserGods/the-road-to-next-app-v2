import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { PaginatedData } from "@/types/pagination";

export const usePaginated = <T>(
  qKey: string,
  entityId: string,
  queryFn: (
    entityId: string,
    pageParam: string | undefined,
  ) => Promise<PaginatedData<T>>,
  initialData?: PaginatedData<T>,
) => {
  const queryKey = [qKey, entityId];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PaginatedData<T>>({
      queryKey,
      queryFn: ({ pageParam }) =>
        queryFn(entityId, pageParam as string | undefined),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          initialData ?? {
            list: [] as T[],
            metadata: {
              count: 0,
              hasNextPage: false,
            },
          },
        ],
        pageParams: [undefined],
      },
    });

  const flattenedData = data?.pages.flatMap((page) => page.list) ?? [];

  const queryClient = useQueryClient();

  return {
    flattenedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    onDelete: () => queryClient.invalidateQueries({ queryKey }),
    onCreate: () => queryClient.invalidateQueries({ queryKey }),
  };
};
