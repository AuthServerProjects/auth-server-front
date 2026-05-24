export type Session = {
  id: number;
  userName: string;
  client: string;
  status: "Success" | "Failed";
  accessTokenIssuedAt: string;
  accessTokenExpiresAt: string;
  refreshTokenIssuedAt: string;
  refreshTokenExpiresAt: string;
};
