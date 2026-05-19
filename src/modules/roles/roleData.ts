import type { Role } from "./roleTypes";

export const mockRole: Role[] = [
  {
    id: 1,
    roleName: "SUPER_ADMIN",
    status: "active",
    permissions: [],
  },
  {
    id: 2,
    roleName: "MANAGER",
    status: "inactive",
    permissions: [],
  },
];