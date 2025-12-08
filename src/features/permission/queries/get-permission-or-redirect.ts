import { redirect } from "next/navigation";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { getMembership } from "@/features/membership/queries/get-membership";
import { signInPath } from "@/paths";
import { getPermissions } from "./get-permissions";

type GetPermissionOrRedirectOptions = {
  organizationId: string;
  permissionKey: string | string[];
  /** If true, user must have ALL permissions. If false, user needs at least ONE. Default: true */
  requireAll?: boolean;
};

export const getPermissionOrRedirect = async ({
  organizationId,
  permissionKey,
  requireAll = true,
}: GetPermissionOrRedirectOptions) => {
  const auth = await getAuthOrRedirect();

  const membership = await getMembership({
    organizationId,
    userId: auth.user.id,
  });

  if (!membership) {
    redirect(signInPath());
  }

  const permissions = await getPermissions({
    organizationId,
    userId: auth.user.id,
  });

  const keys = Array.isArray(permissionKey) ? permissionKey : [permissionKey];

  const hasPermission = requireAll
    ? keys.every((key) => permissions[key] === true)
    : keys.some((key) => permissions[key] === true);

  if (!hasPermission) {
    redirect(signInPath());
  }

  return { ...auth, membership, permissions };
};
