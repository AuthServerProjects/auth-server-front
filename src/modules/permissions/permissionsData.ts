import type { Permission } from "./permissionTypes";

export const mockPermission: Permission[] = [
  {
    id: 1,
    name: "role:create",
    description: "Create roles",
  },
  {
    id: 2,
    name: "role:delete",
    description: "Delete roles",
  },
];
