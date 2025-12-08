import { CRITICAL_PERMISSIONS, PERMISSION_LABELS } from "./constants";

export type Permission = Record<string, boolean>;

export type PermissionKey = keyof typeof PERMISSION_LABELS;

export type CriticalPermission = (typeof CRITICAL_PERMISSIONS)[number];
