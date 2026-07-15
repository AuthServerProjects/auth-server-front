import type { Permission } from "../permissions/permissionTypes";

export type Role = {
  id: number;
  name: string;
  clientId: number | null;
  isEnabled: boolean;
  permissions: Permission[];
};

export type RoleRequest = Omit<Partial<Role>, "name"> & { name: string };

export type RoleFilter = {
  name?: string;
  isEnabled?: boolean;
  clientId?: number;
  client?: string;
};
