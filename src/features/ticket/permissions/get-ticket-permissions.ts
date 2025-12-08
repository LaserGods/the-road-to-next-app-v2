import { getPermissions } from "@/features/permission/queries/get-permissions";

type GetTicketPermissions = {
  organizationId: string | undefined;
  userId: string | undefined;
};

export const getTicketPermissions = async ({
  organizationId,
  userId,
}: GetTicketPermissions): Promise<Record<string, boolean>> => {
  if (!organizationId || !userId) {
    return {};
  }

  const permissions = await getPermissions({
    organizationId,
    userId,
  });

  // Filter to only ticket:* keys
  return Object.fromEntries(
    Object.entries(permissions).filter(([key]) => key.startsWith("ticket:")),
  );
};
