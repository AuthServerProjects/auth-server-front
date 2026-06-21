export type Permission = {
  id: number;
  name: string;
  description: string;
};

export type PermissionGroup = {
  name: string;
  permissions: Permission[];
};
