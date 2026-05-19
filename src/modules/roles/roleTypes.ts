import type { Status } from "../../components/Badge/types";

export type Role = {
  id: number;
  roleName: string;
  status: Status;
  permissions: [];
};
