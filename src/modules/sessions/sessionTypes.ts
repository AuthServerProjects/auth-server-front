import type { Status } from "../../components/Badge/types";

export type Session = {
  id: number;
  userName: string;
  client: string;
  status: Status;
  accessTokenIssuedAt: string;
  accessTokenExpiresAt: string;
  refreshTokenIssuedAt: string;
  refreshTokenExpiresAt: string;
};
