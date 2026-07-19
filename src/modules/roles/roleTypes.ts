import type { BaseFilter } from "../../utils/types";
import type { Permission } from "../permissions/permissionTypes";

export type Role = {
  id: number;
  name: string;
  clientId: number | null;
  isEnabled: boolean;
  permissions: Permission[];
};

export type RoleRequest = Omit<Partial<Role>, "name"> & { name: string };

export interface RoleFilter extends BaseFilter {
  name?: string;
}
