import { useEffect, useState } from "react";
import { getPermission } from "../queries/get-permission";

type UsePermissionProps = {
  userId: string;
  organizationId: string;
  key: string;
};

/**
 * A custom hook that fetches permissions dynamically by key.
 */
const usePermission = ({ userId, organizationId, key }: UsePermissionProps) => {
  const [permission, setPermission] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchPermission = async () => {
      // Fetch permissions from the server
      const { permission } = await getPermission({
        userId,
        organizationId,
        key,
      });
      setPermission(permission.value ? { [key]: true } : { [key]: false });
    };

    fetchPermission();
  }, [userId, organizationId, key]);

  return permission;
};

export { usePermission };
