import type { User } from "../types";

export const useUserActions = () => {
  const handleEdit = (user: User) => console.log("edit", user);
  const handleAssignClient = (user: User) => console.log("client", user);
  const handleManageRoles = (user: User) => console.log("roles", user);
  const handleResetPassword = (user: User) => console.log("reset pw", user);
  const handleToggleStatus = (user: User) => console.log("toggle status", user);

  return {
    handleEdit,
    handleAssignClient,
    handleManageRoles,
    handleResetPassword,
    handleToggleStatus,
  };
};
