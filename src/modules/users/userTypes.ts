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
