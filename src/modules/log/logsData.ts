import type { Log } from "./logTypes";

export const mockLog: Log[] = [
  {
    id: 1,
    time: "2023-10-01 10:00:00",
    action: "Login",
    user: "admin",
    IpAddress: "192.168.1.1",
    status: "Success",
    details: "User logged in successfully",
  },
  {
    id: 2,
    time: "2023-10-01 11:00:00",
    action: "Logout",
    user: "admin",
    IpAddress: "192.168.1.1",
    status: "Unsuccess",
    details: "User logged out successfully",
  },
];
