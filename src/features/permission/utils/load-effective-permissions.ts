import { MembershipRole } from "@prisma/client";
import { cache } from "react";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { ADMIN_ROLE_PERMISSIONS, MEMBER_ROLE_PERMISSIONS } from "../constants";
import { getPermissions } from "../queries/get-permissions";

export type EffectivePermissions = Map<string, boolean>;

const ROLE_DEFAULTS: Record<MembershipRole, Record<string, boolean>> = {
  ADMIN: ADMIN_ROLE_PERMISSIONS, // Admins have all permissions (handled separately)
  MEMBER: MEMBER_ROLE_PERMISSIONS,
};

export const loadEffectivePermissions = cache(
  async (
    userId: string,
    organizationId: string,
  ): Promise<EffectivePermissions> => {
    const { activeOrganization } = await getAuthOrRedirect();

    const permissionsData = await getPermissions({ userId, organizationId });
    const permissionsMap = new Map<string, boolean>(
      Object.entries(permissionsData),
    );

    if (!activeOrganization) return permissionsMap;

    // Load role defaults
    const defaults =
      ROLE_DEFAULTS[activeOrganization.membershipByUser.membershipRole] ?? {};
    Object.entries(defaults).forEach(([key, value]) => {
      permissionsMap.set(key, value);
    });

    // Load membership-specific overrides
    const rows = await prisma.permission.findMany({
      where: { organizationId, userId },
      select: { key: true, value: true },
    });
    rows.forEach((row) => {
      permissionsMap.set(row.key, row.value);
    });

    return permissionsMap;
  },
);
