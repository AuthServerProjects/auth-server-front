import type { User } from "../generalUser/userTypes";
import type { BaseFilter } from "../../../utils/types";

// UserClientDto — nested `user` (UsersDto)
export type UserClient = {
  id: number;
  user: User;
  clientId: number;
  clientName: string;
  isEnabled: boolean;
  isAccountNonExpired: boolean;
  isAccountNonLocked: boolean;
  isCredentialsNonExpired: boolean;
  createdAt: string; // LocalDateTime → ISO string
};

// CreateUserDto — XOR: attach existing (userId) OR create new (newUser). Send exactly one.
export type CreateUser =
  | { userId: number; newUser?: never }
  | { userId?: never; newUser: Omit<User, "id"> };

// UserClientFilterDto
export interface UserClientFilter extends BaseFilter {
  username?: string;
  phoneNumber?: string;
  isAccountNonLocked?: boolean;
  isAccountNonExpired?: boolean;
  isCredentialsNonExpired?: boolean;
}

// POST /user-client/assignToClients  (SUPER_ADMIN, general page)
export type AssignUserToClients = {
  userId: number;
  clientIds: number[];
};
