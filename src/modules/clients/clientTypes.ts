import type { Status } from "../../components/Badge/types";

export type Client = {
  id: number;
  clientId: string;
  permissions: string[];
  scopes: string[];
  status: Status;
  setting: string[];
};
