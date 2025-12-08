"use client";

import { useId, useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { togglePermission } from "../actions/toggle-permission";
import { PERMISSION_LABELS } from "../constants";
import { PermissionKey } from "../types";

type PermissionCheckboxProps = {
  userId: string;
  organizationId: string;
  permissionKey: PermissionKey;
  permissionValue: boolean;
};

const PermissionCheckbox = ({
  userId,
  organizationId,
  permissionKey,
  permissionValue,
}: PermissionCheckboxProps) => {
  const id = useId();
  const [isPending, startTransition] = useTransition();
  const [optimisticValue, setOptimisticValue] = useOptimistic(permissionValue);

  const handleCheckedChange = (checked: boolean) => {
    startTransition(async () => {
      setOptimisticValue(checked);

      const permissionPromise = togglePermission({
        userId,
        organizationId,
        key: permissionKey,
      });

      toast.promise(permissionPromise, {
        loading: "Updating permission...",
      });

      const result = await permissionPromise;

      if (result.status === "ERROR") {
        toast.error(result.message);
      } else {
        toast.success("Permission updated successfully");
      }
    });
  };

  const label = PERMISSION_LABELS[permissionKey] ?? permissionKey;

  return (
    <Field orientation="horizontal">
      <Checkbox
        id={`permission-${id}-${permissionKey}`}
        checked={optimisticValue}
        onCheckedChange={handleCheckedChange}
      />
      <FieldLabel
        htmlFor={`permission-${id}-${permissionKey}`}
        className={`${isPending ? "bg-foreground/60 animate-pulse bg-clip-text text-transparent" : "font-normal"}`}
      >
        {label}
      </FieldLabel>
    </Field>
  );
};

type PermissionCheckboxGroupProps = {
  userId: string;
  organizationId: string;
  permissions: Record<string, boolean>;
  /** Optional filter to only show permissions matching a prefix (e.g., "ticket") */
  filterPrefix?: string;
};

const PermissionCheckboxGroup = ({
  userId,
  organizationId,
  permissions,
  filterPrefix,
}: PermissionCheckboxGroupProps) => {
  const filteredPermissions = Object.entries(permissions).filter(([key]) =>
    filterPrefix ? key.startsWith(`${filterPrefix}:`) : true,
  );

  if (filteredPermissions.length === 0) {
    return null;
  }

  return (
    <FieldGroup className="gap-3">
      {filteredPermissions.map(([key, value]) => (
        <PermissionCheckbox
          key={key}
          userId={userId}
          organizationId={organizationId}
          permissionKey={key as PermissionKey}
          permissionValue={value}
        />
      ))}
    </FieldGroup>
  );
};

export { PermissionCheckbox, PermissionCheckboxGroup };
