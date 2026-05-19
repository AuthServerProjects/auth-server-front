import type { Permission } from "../permissionTypes";

export const usePermissionActions = () => {
  const handleEdit = (permission: Permission) =>
    console.log("edit", permission);
  const handleRemove = (permission: Permission) =>
    console.log("remove", permission);

  return {
    handleEdit,
    handleRemove,
  };
};
