import type { Result } from "../../components/Badge/types";

export type Log = {
  id: number;
  time: string;
  action: string;
  user: string;
  IpAddress: string;
  status: Result;
  details: string;
};
