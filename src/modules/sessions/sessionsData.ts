import type { Session } from "./sessionTypes";

export const mockSession: Session[] = [
  {
    id: 1,
    userName: "Rosa.sh.7",
    client: "BNPL",
    status: "active",
    accessTokenIssuedAt: "2025-12-01T10:00:00Z",
    accessTokenExpiresAt: "2024-06-01T11:00:00Z",
    refreshTokenIssuedAt: "2024-06-01T10:00:00Z",
    refreshTokenExpiresAt: "2024-06-01T11:00:00Z",
  },
  {
    id: 2,
    userName: "Ramin.k.92",
    client: "MyBpm",
    status: "inactive",
    accessTokenIssuedAt: "2024-06-01T10:00:00Z",
    accessTokenExpiresAt: "2024-06-01T11:00:00Z",
    refreshTokenIssuedAt: "2024-06-01T10:00:00Z",
    refreshTokenExpiresAt: "2024-06-01T11:00:00Z",
  },
];
