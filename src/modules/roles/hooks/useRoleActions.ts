import type { Role } from "../roleTypes";

export const useRoleActions = () => {
  const handleEdit = (role: Role) => console.log("edit", role);
  const handleRemove = (role: Role) => console.log("remove", role);

  return {
    handleEdit,
    handleRemove,
  };
};
