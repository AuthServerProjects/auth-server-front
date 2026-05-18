import type { Client } from "../clientTypes";

export const useClientActions = () => {
  const handleEdit = (client: Client) => console.log("edit", client);
  const handleResetSecret = (client: Client) =>
    console.log("reset secret", client);

  return {
    handleEdit,
    handleResetSecret,
  };
};
