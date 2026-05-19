import type { Permission } from "./permissionTypes";

export const mockPermission: Permission[] = [
  {
    id: 1,
    permissionName: "role:create",
    description: "Create roles",
  },
  {
    id: 2,
    permissionName: "role:delete",
    description: "Delete roles",
  },
];
