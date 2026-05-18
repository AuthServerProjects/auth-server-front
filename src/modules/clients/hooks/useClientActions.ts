import type { Client } from "../types";

export const useClientActions = () => {
  const handleEdit = (client: Client) => console.log("edit", client);
  const handleResetSecret = (client: Client) =>
    console.log("reset secret", client);

  return {
    handleEdit,
    handleResetSecret,
  };
};
