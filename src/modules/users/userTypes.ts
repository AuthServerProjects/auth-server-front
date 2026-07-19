import type { BaseFilter } from "../../utils/types";

export type User = {
  id: number;
  userName: string;
  phoneNumber: string;
  status: boolean;
  notLocked: boolean;
  notExpired: boolean;
  credentialsNotExpired: boolean;
  roles: string[];
};

export interface UserFilter extends BaseFilter {
  username?: string;
  phoneNumber?: string;
}
