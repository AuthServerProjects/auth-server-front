import type { BaseFilter } from "../../../utils/types";

// UserRoleDto — projection: uses roleName (not name)
export type UserRole = {
  id: number;
  userClientId: number;
  userId: number;
  username: string;
  roleId: number;
  roleName: string;
  isEnabled: boolean;
};

// UserRoleFilterDto
export interface UserRoleFilter extends BaseFilter {
  username?: string;
  roleName?: string;
  roleId?: number;
  userClientId?: number;
}
