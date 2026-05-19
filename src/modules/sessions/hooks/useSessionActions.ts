import type { Session } from "../sessionTypes";

export const useSessionActions = () => {
  const handleCancel = (session: Session) => console.log("cancel", session);
  const handleCancelAll = (session: Session) =>
    console.log("cancel all", session);

  return {
    handleCancel,
    handleCancelAll,
  };
};
