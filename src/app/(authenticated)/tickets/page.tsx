import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { getAuth } from "@/features/auth/queries/get-auth";
import { getActiveOrganization } from "@/features/organization/queries/get-active-organization";
import { TicketFilterSwitch } from "@/features/ticket/components/ticket-filter-switch";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { searchParamsCache } from "@/features/ticket/search-params";

type TicketsPageProps = {
  searchParams: Promise<SearchParams>;
};

const TicketsPage = async ({ searchParams }: TicketsPageProps) => {
  const { user } = await getAuth();
  const activeOrganization = await getActiveOrganization();
  const organizationName = activeOrganization?.name;

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="My Tickets"
        description="All your tickets at one place"
        actions={
          activeOrganization && organizationName ? (
            <TicketFilterSwitch organizationName={organizationName} />
          ) : null
        }
      />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created"
        className="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList
          userId={user?.id}
          searchParams={searchParamsCache.parse(await searchParams)}
        />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
