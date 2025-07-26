import { Placeholder } from "@/components/placeholder";
import { getTickets } from "../queries/get-tickets";
import { ParsedSearchParams } from "../search-params";
import { TicketItem } from "./ticket-item";
import { TicketPagination } from "./ticket-pagination";
import { TicketSearchInput } from "./ticket-search-input";
import { TicketSortSelect } from "./ticket-sort-select";

type TicketListProps = {
  userId?: string;
  byOrganization?: boolean;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({
  userId,
  byOrganization = false,
  searchParams,
}: TicketListProps) => {
  const { list: tickets, metadata: ticketMetadata } = await getTickets(
    userId,
    byOrganization,
    searchParams,
  );

  return (
    <div className="animate-fade-from-top flex flex-1 flex-col items-center gap-y-4">
      <div className="flex w-full max-w-[420px] gap-x-2">
        <TicketSearchInput placeholder="Search tickets" />
        <TicketSortSelect
          options={[
            {
              sortKey: "createdAt",
              sortValue: "desc",
              label: "Newest",
            },
            {
              sortKey: "createdAt",
              sortValue: "asc",
              label: "Oldest",
            },
            {
              sortKey: "bounty",
              sortValue: "desc",
              label: "Bounty",
            },
            {
              sortKey: "title",
              sortValue: "asc",
              label: "Title",
            },
          ]}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}

      <div className="w-full max-w-[420px]">
        <TicketPagination paginatedTicketMetadata={ticketMetadata} />
      </div>
    </div>
  );
};

export { TicketList };
