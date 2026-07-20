import type { BaseFilter } from "../../utils/types";

export type Session = {
  id: number;
  authorizationId: string;
  principalName: string;
  registeredClientId: string;
  accessTokenIssuedAt: string | null;
  accessTokenExpiresAt: string | null;
  refreshTokenIssuedAt: string | null;
  refreshTokenExpiresAt: string | null;
};

export interface SessionFilter extends BaseFilter {
  principalName?: string;
  registeredClientId?: string;
}
