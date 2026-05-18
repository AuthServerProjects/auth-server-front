import type { Client } from "./clientTypes";

export const mockClients: Client[] = [
  {
    id: 1,
    clientId: "BNPL",
    permissions: ["AUTHORIZATION CODE ", "REFRESH TOKEN"],
    scopes: ["profile", "email"],
    status: "active",
    setting: [],
  },
  {
    id: 2,
    clientId: "AdminPanel",
    permissions: ["AUTHORIZATION CODE"],
    scopes: ["openid"],
    status: "inactive",
    setting: [],
  },
];
