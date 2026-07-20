import type { Session } from "../sessionTypes";
import { sessionService } from "../sessionService";

export const useSessionActions = (onDone?: () => void) => {
  const handleCancel = async (session: Session) => {
    try {
      await sessionService.revoke(session.authorizationId);
      onDone?.();
    } catch (err) {
      console.error("revoke session failed", err);
    }
  };

  const handleCancelAll = async (session: Session) => {
    try {
      await sessionService.revokeByUsername(session.principalName);
      onDone?.();
    } catch (err) {
      console.error("revoke all sessions failed", err);
    }
  };

  return {
    handleCancel,
    handleCancelAll,
  };
};
