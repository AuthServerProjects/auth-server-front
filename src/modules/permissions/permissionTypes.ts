import type { BaseFilter } from "../../utils/types";

export type Permission = {
  id: number;
  name: string;
  description: string;
  clientId: number | null;
  isEnabled: boolean;
};

export type PermissionRequest = Omit<Partial<Permission>, "name"> & {
  name: string;
};

export interface PermissionFilter extends BaseFilter {
  name?: string;
  description?: string;
}

export type PermissionGroup = {
  name: string;
  permissions: Permission[];
};
