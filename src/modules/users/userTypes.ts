import type { Status } from "../../components/Badge/types";

export type User = {
  id: number;
  userName: string;
  phoneNumber: string;
  status: Status;
  roles: string[];
};
