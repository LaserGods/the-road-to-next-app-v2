import { useQuery } from "@tanstack/react-query";
import { getPermission } from "../queries/get-permission";

type UsePermissionProps = {
  userId: string | undefined;
  organizationId: string | undefined;
  key: string;
};

/**
 * A custom hook that fetches permissions dynamically by key.
 */
const usePermission = ({ userId, organizationId, key }: UsePermissionProps) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["permission", userId, organizationId, key],
    queryFn: async () =>
      await getPermission({
        userId: userId!,
        organizationId: organizationId!,
        key,
      }),
    enabled: !!userId && !!organizationId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return {
    hasPermission: data ?? false,
    isLoading,
    isError,
    error,
  };
};

export { usePermission };
