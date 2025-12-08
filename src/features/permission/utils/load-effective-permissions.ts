import { cache } from "react";
import { getPermissions } from "../queries/get-permissions";

export type EffectivePermissions = Map<string, boolean>;

export const loadEffectivePermissions = cache(
  async (
    userId: string,
    organizationId: string,
  ): Promise<EffectivePermissions> => {
    const permissionsData = await getPermissions({ userId, organizationId });
    return new Map<string, boolean>(Object.entries(permissionsData));
  },
);
