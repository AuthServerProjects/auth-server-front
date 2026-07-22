import type { User } from "./generalUser/userTypes";
import type { UserClient } from "./userClient/userClientTypes";

// View-model the shared table/popup render. `id` is the correct id for the page's actions:
//  - general:     id = global user id
//  - per-client:  id = user_client (membership) id, userId = global user id
export type UserRow = {
  id: number;
  userId?: number;
  username: string;
  phoneNumber: string;
  isEnabled: boolean;
  roles?: string[];
};

export const mapUserToRow = (u: User): UserRow => ({
  id: u.id,
  username: u.username,
  phoneNumber: u.phoneNumber,
  isEnabled: u.isEnabled,
});

export const mapUserClientToRow = (uc: UserClient): UserRow => ({
  id: uc.id,
  userId: uc.user.id,
  username: uc.user.username,
  phoneNumber: uc.user.phoneNumber,
  isEnabled: uc.isEnabled,
});
