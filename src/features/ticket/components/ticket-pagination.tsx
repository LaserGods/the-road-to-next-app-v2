"use client";

import { inferParserType, useQueryState, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";
import { Pagination } from "@/components/pagination";
import { PaginatedData } from "@/types/pagination";
import {
  myTicketsFilterParser,
  paginationOptions,
  paginationParser,
  searchParser,
} from "../search-params";
import { TicketWithMetadata } from "../types";

type TicketPaginationProps = {
  paginatedTicketMetadata: PaginatedData<TicketWithMetadata>["metadata"];
};

const TicketPagination = ({
  paginatedTicketMetadata,
}: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  const [search] = useQueryState("search", searchParser);
  const [myTicketsFilter] = useQueryState(
    "myTicketsFilter",
    myTicketsFilterParser,
  );

  const prevSearch = useRef<{
    search: inferParserType<typeof searchParser>;
    myTicketsFilter: inferParserType<typeof myTicketsFilterParser>;
  }>({ search, myTicketsFilter });

  useEffect(() => {
    if (
      search === prevSearch.current.search &&
      myTicketsFilter === prevSearch.current.myTicketsFilter
    )
      return;

    prevSearch.current = { search, myTicketsFilter };

    setPagination({ ...pagination, page: 0 });
  }, [pagination, search, myTicketsFilter, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  );
};

export { TicketPagination };
