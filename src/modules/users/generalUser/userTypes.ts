import type { BaseFilter } from "../../../utils/types";

// UsersDto (global user). password is WRITE_ONLY on backend → optional, only sent in forms.
export type User = {
  id: number;
  username: string;
  phoneNumber: string;
  isEnabled: boolean;
  password?: string;
};

// save/update body = UsersDto
export type UserRequest = Omit<Partial<User>, "username"> & {
  username: string;
};

// UserFilterDto
export interface UserFilter extends BaseFilter {
  username?: string;
  phoneNumber?: string;
}
