import { PERMISSION_LABELS } from "./constants";

export type Permission = Record<string, boolean>;

export type PermissionKey = keyof typeof PERMISSION_LABELS;
