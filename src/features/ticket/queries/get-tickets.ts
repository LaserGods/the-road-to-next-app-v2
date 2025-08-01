import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getActiveOrganization } from "@/features/organization/queries/get-active-organization";
import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params";

export const getTickets = async (
  userId: string | undefined,
  byOrganization: boolean,
  searchParams: ParsedSearchParams,
) => {
  const { user } = await getAuth();
  const activeOrganization = await getActiveOrganization();
  const myTicketsFilter = searchParams.myTicketsFilter;

  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
    ...(byOrganization && activeOrganization
      ? {
          organizationId: activeOrganization.id,
        }
      : {}),
    ...(myTicketsFilter && activeOrganization
      ? {
          organizationId: activeOrganization.id,
        }
      : {}),
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  // we are using a transaction to ensure an error if one of the
  // database queries fail
  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
      orderBy: {
        [searchParams.sortKey]: searchParams.sortValue,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    }),
    prisma.ticket.count({
      // the where clause ensures that the count is only for the tickets that
      // match the search params
      where,
    }),
  ]);

  return {
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: isOwner(user, ticket),
    })),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
