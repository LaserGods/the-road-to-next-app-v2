import { useQuery } from "@tanstack/react-query";
import { getPermissions } from "../queries/get-permissions";

type UsePermissionsProps = {
  userId: string | undefined;
  organizationId: string | undefined;
};

/**
 * A custom hook that fetches all permissions for a user in an organization.
 */
const usePermissions = ({ userId, organizationId }: UsePermissionsProps) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["permissions", userId, organizationId],
    queryFn: async () =>
      await getPermissions({
        userId,
        organizationId,
      }),
    enabled: !!userId && !!organizationId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return {
    permissions: data ?? {},
    hasPermission: (key: string) => data?.[key] ?? false,
    isLoading,
    isError,
    error,
  };
};

export { usePermissions };
